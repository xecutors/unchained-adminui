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
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  GetPickUpWarehousingProviders: 'GetPickUpWarehousingProviders',
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
        }
        req.reply(WarehousingProvidersListResponse);
      }
      if (
        hasOperationName(req, WarehousingProviderOperations.GetSingleProvider)
      ) {
        req.reply(SingleWarehousingProviderResponse);
      }
      if (
        hasOperationName(req, WarehousingProviderOperations.GetProvidersType)
      ) {
        req.reply(WarehousingProvidersTypeResponse);
      }
      if (hasOperationName(req, WarehousingProviderOperations.GetInterfaces)) {
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
  });

  it('Show Navigate to [WAREHOUSING PROVIDERS] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('tr').should('have.length', 4);
  });

  it('Should [FILTER] list based on selected value', () => {
    const { options } =
      WarehousingProvidersTypeResponse.data.warehousingProviderType;
    const [firstOption] = options;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('tr').should('have.length', 4);
    cy.get('select#select-type').contains(localizations.en.filter_by_type);
    cy.get('select#select-type').select(firstOption.value);
    cy.url().should(
      'contain',
      `/warehousing-provider?type=${firstOption.value}`,
    );

    cy.wait(fullAliasName(ALIASES.GetPickUpWarehousingProviders))
      .its('request.body.variables.type')
      .should('eq', firstOption.value);
  });

  it('Show Navigate to [NEW WAREHOUSING PROVIDER] form page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('a[href="/warehousing-provider/new"]').click();
    cy.url().should('contain', '/warehousing-provider/new');
  });

  it('Show [ADD NEW WAREHOUSING PROVIDER]  successfully', () => {
    const [firstPickUpInterface] =
      WarehousingProviderInterfacesResponse.data.warehousingInterfaces;
    const { options } =
      WarehousingProvidersTypeResponse.data.warehousingProviderType;
    const [firstType] = options;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('a[href="/warehousing-provider/new"]').click();
    cy.url().should('contain', '/warehousing-provider/new');
    cy.get('select#type').select(firstType.value);
    cy.get('select#adapterKey').select(firstPickUpInterface.value);
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_provider)
      .click();

    cy.url().should(
      'contain',
      `/warehousing-provider/${CreateWarehousingProviderResponse.data.createWarehousingProvider._id}`,
    );

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
  });

  it('Show [ERROR] when required fields are not provided in new warehousing provider', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('a[href="/warehousing-provider/new"]').click();
    cy.url().should('contain', '/warehousing-provider/new');
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
  });

  it('Show [INITIALIZE WAREHOUSING PROVIDER] successfully', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get(
      `a[href="/warehousing-provider/${warehousingProvider._id}"]`,
    ).click();
    cy.url().should(
      'contain',
      `/warehousing-provider/${warehousingProvider._id}`,
    );

    cy.get('textarea#configuration').should(
      'have.value',
      JSON.stringify(warehousingProvider.configuration || {}, null, 2),
    );
  });

  it('Show [UPDATE DELIVERY PROVIDER] successfully', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get(
      `a[href="/warehousing-provider/${warehousingProvider._id}"]`,
    ).click();
    cy.url().should(
      'contain',
      `/warehousing-provider/${warehousingProvider._id}`,
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

    cy.url().should('contain', '/warehousing-provider');
  });

  it('Show [ERROR] when pattern of configuration fields are not correct in update warehousing provider', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get(
      `a[href="/warehousing-provider/${warehousingProvider._id}"]`,
    ).click();
    cy.url().should(
      'contain',
      `/warehousing-provider/${warehousingProvider._id}`,
    );

    cy.get('textarea#configuration').type('l').blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .should('be.disabled');
  });

  it('Show [DELETE WAREHOUSING PROVIDER] successfully', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get(
      `a[href="/warehousing-provider/${warehousingProvider._id}"]`,
    ).click();
    cy.url().should(
      'contain',
      `/warehousing-provider/${warehousingProvider._id}`,
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

    cy.url().should('contain', '/warehousing-provider');
  });

  it('Show [DELETE WAREHOUSING PROVIDER FROM LIST] successfully', () => {
    const { warehousingProvider } = SingleWarehousingProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
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

    cy.url().should('contain', '/warehousing-provider');
  });
});
