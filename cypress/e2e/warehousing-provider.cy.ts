import localizations from '../../i18n';

import {
  CreateWarehousingProviderResponse,
  RemoveWarehousingProviderResponse,
  SingleWarehousingProviderResponse,
  UpdateWarehousingProviderResponse,
  WarehousingProviderInterfacesResponse,
  WarehousingProviderOperations,
  WarehousingProvidersListResponse,
  WarehousingProvidersTypeResponse,
} from '../mock/warehousing-provider';

import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  GetProvidersList: 'WarehousingProviders',
  GetSingleProvider: 'WarehousingProvider',
  GetPickUpWarehousingProviders: 'GetPickUpWarehousingProviders',
  GetProvidersType: 'WarehousingProvidersType',
  GetInterfaces: 'WarehousingInterfaces',
  CreateProvider: 'CreateProvider',
  UpdateProvider: 'UpdateWarehousingProvider',
  RemoveProvider: 'RemoveWarehousingProvider',
};
describe('Warehousing Provider', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      const { body } = req;
      if (
        hasOperationName(req, WarehousingProviderOperations.GetProvidersList)
      ) {
        const { variables } = body;
        if (variables?.type === 'PHYSICAL') {
          aliasQuery(req, ALIASES.GetPickUpWarehousingProviders);
        } else {
          aliasQuery(req, ALIASES.GetProvidersList);
        }
        req.reply(WarehousingProvidersListResponse);
      }
      if (
        hasOperationName(req, WarehousingProviderOperations.GetSingleProvider)
      ) {
        aliasQuery(req, ALIASES.GetSingleProvider);
        req.reply(SingleWarehousingProviderResponse);
      }
      if (
        hasOperationName(req, WarehousingProviderOperations.GetProvidersType)
      ) {
        aliasQuery(req, ALIASES.GetProvidersType);
        req.reply(WarehousingProvidersTypeResponse);
      }
      if (hasOperationName(req, WarehousingProviderOperations.GetInterfaces)) {
        aliasQuery(req, ALIASES.GetInterfaces);
        req.reply(WarehousingProviderInterfacesResponse);
      }
      if (hasOperationName(req, WarehousingProviderOperations.CreateProvider)) {
        aliasMutation(req, ALIASES.CreateProvider);
        req.reply(CreateWarehousingProviderResponse);
      }
      if (hasOperationName(req, WarehousingProviderOperations.UpdateProvider)) {
        aliasMutation(req, ALIASES.UpdateProvider);
        req.reply(UpdateWarehousingProviderResponse);
      }
      if (hasOperationName(req, WarehousingProviderOperations.RemoveProvider)) {
        aliasMutation(req, ALIASES.RemoveProvider);
        req.reply(RemoveWarehousingProviderResponse);
      }
    });

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.wait(fullAliasName(ALIASES.GetProvidersList)).then((currentSubject) => {
      expect(currentSubject.response.body).to.deep.eq(
        WarehousingProvidersListResponse,
      );
    });

    cy.wait(fullAliasName(ALIASES.GetProvidersType)).then((currentSubject) => {
      expect(currentSubject.response.body).to.deep.eq(
        WarehousingProvidersTypeResponse,
      );
    });

    cy.get('h2').should(
      'contain.text',
      localizations.en.warehousing_providers_header,
    );
  });

  it('Show Navigate to [WAREHOUSING PROVIDERS] page successfully', () => {
    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get('tr').should('have.length', 4);
  });

  it('Should [FILTER] list based on selected value', () => {
    const { options } =
      WarehousingProvidersTypeResponse.data.warehousingProviderType;
    const [firstOption] = options;

    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get('tr').should('have.length', 4);
    cy.get('select#select-type').contains(localizations.en.filter_by_type);
    cy.get('select#select-type').select(firstOption.value);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/warehousing-provider');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        type: firstOption.value,
      });
    });

    cy.wait(fullAliasName(ALIASES.GetPickUpWarehousingProviders))
      .its('request.body.variables.type')
      .should('eq', firstOption.value);

    cy.location('pathname').should('contain', '/warehousing-provider');
  });

  it('Show Navigate to [NEW WAREHOUSING PROVIDER] form page successfully', () => {
    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get('a[href="/warehousing-provider/new"]').click();

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        providerType: 'PHYSICAL',
      });
      expect(currentSubject.response.body).to.deep.eq(
        WarehousingProviderInterfacesResponse,
      );
    });

    cy.location('pathname').should('contain', '/warehousing-provider/new');
    cy.get('h2').should(
      'contain.text',
      localizations.en.new_warehousing_provider_header,
    );
  });

  it('Show [ADD NEW WAREHOUSING PROVIDER]  successfully', () => {
    const [firstPickUpInterface] =
      WarehousingProviderInterfacesResponse.data.warehousingInterfaces;
    const { options } =
      WarehousingProvidersTypeResponse.data.warehousingProviderType;
    const [firstType] = options;

    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get('a[href="/warehousing-provider/new"]').click();

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        providerType: 'PHYSICAL',
      });
      expect(currentSubject.response.body).to.deep.eq(
        WarehousingProviderInterfacesResponse,
      );
    });

    cy.location('pathname').should('contain', '/warehousing-provider/new');
    cy.get('h2').should(
      'contain.text',
      localizations.en.new_warehousing_provider_header,
    );
    cy.get('select#type').select(firstType.value);

    if (firstType.value !== 'PHYSICAL') {
      cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          providerType: firstType.value,
        });
        expect(currentSubject.response.body).to.deep.eq(
          WarehousingProviderInterfacesResponse,
        );
      });
    }

    cy.get('select#adapterKey').select(firstPickUpInterface.value);
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_provider)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.CreateProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          warehousingProvider: {
            adapterKey: firstPickUpInterface._id,
            type: firstType.value,
          },
        });
        expect(currentSubject.response.body).to.deep.eq(
          CreateWarehousingProviderResponse,
        );
      },
    );

    cy.location('pathname').should(
      'contain',
      `/warehousing-provider/${CreateWarehousingProviderResponse.data.createWarehousingProvider._id}`,
    );
  });

  it('Show [ERROR] when required fields are not provided in new warehousing provider', () => {
    const { options } =
      WarehousingProvidersTypeResponse.data.warehousingProviderType;
    const [firstType] = options;

    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get('a[href="/warehousing-provider/new"]').click();

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        providerType: firstType.value,
      });
      expect(currentSubject.response.body).to.deep.eq(
        WarehousingProviderInterfacesResponse,
      );
    });

    cy.location('pathname').should('contain', '/warehousing-provider/new');
    cy.get('h2').should(
      'contain.text',
      localizations.en.new_warehousing_provider_header,
    );
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_provider)
      .click();

    cy.get('label[for="type"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.type,
      ),
    );

    cy.get('label[for="adapterKey"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.adapter,
      ),
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.create_provider)
      .should('be.disabled');

    cy.location('pathname').should('contain', '/warehousing-provider/new');
  });

  it('Show [INITIALIZE WAREHOUSING PROVIDER] successfully', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get(
      `a[href="/warehousing-provider/${warehousingProvider._id}"]`,
    ).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        warehousingProviderId: warehousingProvider._id,
      });
      expect(response.body).to.deep.eq(SingleWarehousingProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/warehousing-provider/${warehousingProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_warehousing_provider_header,
    );

    cy.get('textarea#configuration').should(
      'have.value',
      JSON.stringify(warehousingProvider.configuration || {}, null, 2),
    );
  });

  it('Show [UPDATE DELIVERY PROVIDER] successfully', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get(
      `a[href="/warehousing-provider/${warehousingProvider._id}"]`,
    ).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        warehousingProviderId: warehousingProvider._id,
      });
      expect(response.body).to.deep.eq(SingleWarehousingProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/warehousing-provider/${warehousingProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_warehousing_provider_header,
    );

    cy.get('textarea#configuration')
      .clear()
      .type(JSON.stringify(warehousingProvider.configuration || {}, null, 2))
      .blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.UpdateProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          warehousingProvider: {
            configuration: warehousingProvider.configuration,
          },
          warehousingProviderId: warehousingProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          UpdateWarehousingProviderResponse,
        );
      },
    );

    cy.location('pathname').should('contain', '/warehousing-provider');
  });

  it('Show [ERROR] when pattern of configuration fields are not correct in update warehousing provider', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get(
      `a[href="/warehousing-provider/${warehousingProvider._id}"]`,
    ).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        warehousingProviderId: warehousingProvider._id,
      });
      expect(response.body).to.deep.eq(SingleWarehousingProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/warehousing-provider/${warehousingProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_warehousing_provider_header,
    );

    cy.get('textarea#configuration').type('l').blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .should('be.disabled');
  });

  it('Show [DELETE WAREHOUSING PROVIDER] successfully', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get(
      `a[href="/warehousing-provider/${warehousingProvider._id}"]`,
    ).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        warehousingProviderId: warehousingProvider._id,
      });
      expect(response.body).to.deep.eq(SingleWarehousingProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/warehousing-provider/${warehousingProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_warehousing_provider_header,
    );

    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button')
      .contains(localizations.en.delete_warehousing_provider)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.RemoveProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          warehousingProviderId: warehousingProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          RemoveWarehousingProviderResponse,
        );
      },
    );

    cy.location('pathname').should('contain', '/warehousing-provider');
  });

  it('Show [DELETE WAREHOUSING PROVIDER FROM LIST] successfully', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.location('pathname').should('contain', '/warehousing-provider');
    cy.get('button#delete_button').first().click();
    cy.get('button')
      .contains(localizations.en.delete_warehousing_provider)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.RemoveProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          warehousingProviderId: warehousingProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          RemoveWarehousingProviderResponse,
        );
      },
    );

    cy.location('pathname').should('contain', '/warehousing-provider');
  });
});
