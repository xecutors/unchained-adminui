import localizations from '../../i18n';

import {
  CreateDeliveryProviderResponse,
  DeliveryProviderListResponse,
  DeliveryProviderOperations,
  DeliveryProviderPickUpInterfaces,
  DeliveryProvidersTypeResponse,
  RemoveDeliveryProviderResponse,
  SingleDeliveryProviderResponse,
  UpdateDeliveryProviderResponse,
} from '../mock/delivery-provider';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  GetProvidersList: 'DeliveryProviders',
  GetSingleProvider: 'DeliveryProvider',
  GetPickUpDeliveryProviders: 'GetPickUpDeliveryProviders',
  GetProvidersType: 'DeliveryProvidersType',
  GetInterfaces: 'DeliveryInterfaces',
  CreateProvider: 'CreateProvider',
  RemoveProvider: 'RemoveDeliveryProvider',
  UpdateProvider: 'UpdateDeliveryProvider',
};
describe('Delivery Provider', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      const { body } = req;
      if (hasOperationName(req, DeliveryProviderOperations.GetProvidersList)) {
        const { variables } = body;
        if (variables?.type === 'PICKUP') {
          aliasQuery(req, ALIASES.GetPickUpDeliveryProviders);
        } else {
          aliasQuery(req, ALIASES.GetProvidersList);
        }
        req.reply(DeliveryProviderListResponse);
      }
      if (hasOperationName(req, DeliveryProviderOperations.GetSingleProvider)) {
        aliasQuery(req, ALIASES.GetSingleProvider);
        req.reply(SingleDeliveryProviderResponse);
      }
      if (hasOperationName(req, DeliveryProviderOperations.GetProvidersType)) {
        aliasQuery(req, ALIASES.GetProvidersType);
        req.reply(DeliveryProvidersTypeResponse);
      }
      if (hasOperationName(req, DeliveryProviderOperations.GetInterfaces)) {
        aliasQuery(req, ALIASES.GetInterfaces);
        req.reply(DeliveryProviderPickUpInterfaces);
      }
      if (hasOperationName(req, DeliveryProviderOperations.CreateProvider)) {
        aliasMutation(req, ALIASES.CreateProvider);
        req.reply(CreateDeliveryProviderResponse);
      }
      if (hasOperationName(req, DeliveryProviderOperations.UpdateProvider)) {
        aliasMutation(req, ALIASES.UpdateProvider);
        req.reply(UpdateDeliveryProviderResponse);
      }
      if (hasOperationName(req, DeliveryProviderOperations.RemoveProvider)) {
        aliasMutation(req, ALIASES.RemoveProvider);
        req.reply(RemoveDeliveryProviderResponse);
      }
    });

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.wait(fullAliasName(ALIASES.GetProvidersList)).then((currentSubject) => {
      expect(currentSubject.response.body).to.deep.eq(
        DeliveryProviderListResponse,
      );
    });

    cy.wait(fullAliasName(ALIASES.GetProvidersType)).then((currentSubject) => {
      expect(currentSubject.response.body).to.deep.eq(
        DeliveryProvidersTypeResponse,
      );
    });

    cy.get('h2').should(
      'contain.text',
      localizations.en.delivery_providers_header,
    );
  });

  it('Show Navigate to [DELIVERY PROVIDERS] page successfully', () => {
    cy.location('pathname').should('contain', '/delivery-provider');

    cy.get('tr').should('have.length', 4);
  });

  it('Should [FILTER] list based on selected value', () => {
    const { options } = DeliveryProvidersTypeResponse.data.deliveryProviderType;
    const [firstOption] = options;

    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get('tr').should('have.length', 4);
    cy.get('select#select-type').contains(localizations.en.filter_by_type);
    cy.get('select#select-type').select(firstOption.value);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/delivery-provider');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        type: firstOption.value,
      });
    });

    cy.wait(fullAliasName(ALIASES.GetPickUpDeliveryProviders)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          type: firstOption.value,
        });
        expect(response.body).to.deep.eq(DeliveryProviderListResponse);
      },
    );

    cy.location('pathname').should('contain', '/delivery-provider');
  });

  it('Show Navigate to [NEW DELIVERY PROVIDER] form page successfully', () => {
    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get('a[href="/delivery-provider/new"]').click();

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        providerType: 'SHIPPING',
      });
      expect(currentSubject.response.body).to.deep.eq(
        DeliveryProviderPickUpInterfaces,
      );
    });

    cy.location('pathname').should('contain', '/delivery-provider/new');
    cy.get('h2').should('contain.text', localizations.en.new_delivery_provider);
  });

  it('Show [ADD NEW DELIVERY PROVIDER]  successfully', () => {
    const [firstPickUpInterface] =
      DeliveryProviderPickUpInterfaces.data.deliveryInterfaces;
    const { options } = DeliveryProvidersTypeResponse.data.deliveryProviderType;
    const [firstType] = options;

    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get('a[href="/delivery-provider/new"]').click();
    cy.location('pathname').should('contain', '/delivery-provider/new');

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        providerType: 'SHIPPING',
      });
      expect(currentSubject.response.body).to.deep.eq(
        DeliveryProviderPickUpInterfaces,
      );
    });

    cy.get('h2').should('contain.text', localizations.en.new_delivery_provider);
    cy.get('select#type').select(firstType.value);

    if (firstType.value !== 'SHIPPING') {
      cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          providerType: firstType.value,
        });
        expect(currentSubject.response.body).to.deep.eq(
          DeliveryProviderPickUpInterfaces,
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
          deliveryProvider: {
            adapterKey: firstPickUpInterface._id,
            type: firstType.value,
          },
        });
        expect(currentSubject.response.body).to.deep.eq(
          CreateDeliveryProviderResponse,
        );
      },
    );

    cy.location('pathname').should(
      'contain',
      `/delivery-provider/${CreateDeliveryProviderResponse.data.createDeliveryProvider._id}`,
    );
  });

  it('Show [ERROR] when required fields are not provided in new delivery provider', () => {
    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get('a[href="/delivery-provider/new"]').click();
    cy.location('pathname').should('contain', '/delivery-provider/new');

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      expect(currentSubject.request.body.variables).to.deep.eq({
        providerType: 'SHIPPING',
      });
      expect(currentSubject.response.body).to.deep.eq(
        DeliveryProviderPickUpInterfaces,
      );
    });

    cy.get('h2').should('contain.text', localizations.en.new_delivery_provider);
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

    cy.location('pathname').should('contain', '/delivery-provider/new');
  });

  it('Show [INITIALIZE DELIVERY PROVIDER] successfully', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get(`a[href="/delivery-provider/${deliveryProvider._id}"]`).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        deliveryProviderId: deliveryProvider._id,
      });
      expect(response.body).to.deep.eq(SingleDeliveryProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/delivery-provider/${deliveryProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_delivery_configuration,
    );

    cy.get('textarea#configuration').should(
      'have.value',
      JSON.stringify(deliveryProvider.configuration || {}, null, 2),
    );
  });

  it('Show [UPDATE DELIVERY PROVIDER] successfully', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get(`a[href="/delivery-provider/${deliveryProvider._id}"]`).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        deliveryProviderId: deliveryProvider._id,
      });
      expect(response.body).to.deep.eq(SingleDeliveryProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/delivery-provider/${deliveryProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_delivery_configuration,
    );

    cy.get('textarea#configuration')
      .clear()
      .type(JSON.stringify(deliveryProvider.configuration, null, 2))
      .blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.UpdateProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          deliveryProvider: {
            configuration: deliveryProvider.configuration,
          },
          deliveryProviderId: deliveryProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          UpdateDeliveryProviderResponse,
        );
      },
    );

    cy.location('pathname').should('contain', '/delivery-provider');
  });

  it('Show [ERROR] when pattern of configuration fields are not correct in update delivery provider', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get(`a[href="/delivery-provider/${deliveryProvider._id}"]`).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        deliveryProviderId: deliveryProvider._id,
      });
      expect(response.body).to.deep.eq(SingleDeliveryProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/delivery-provider/${deliveryProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_delivery_configuration,
    );

    cy.get('textarea#configuration').type('l').blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .should('be.disabled');
  });

  it('Show [DELETE DELIVERY PROVIDER] successfully', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get(`a[href="/delivery-provider/${deliveryProvider._id}"]`).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        deliveryProviderId: deliveryProvider._id,
      });
      expect(response.body).to.deep.eq(SingleDeliveryProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/delivery-provider/${deliveryProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_delivery_configuration,
    );

    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button')
      .contains(localizations.en.delete_delivery_provider)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.RemoveProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          deliveryProviderId: deliveryProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          RemoveDeliveryProviderResponse,
        );
      },
    );

    cy.location('pathname').should('contain', '/delivery-provider');
  });

  it('Show [DELETE DELIVERY PROVIDER FROM LIST] successfully', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.location('pathname').should('contain', '/delivery-provider');
    cy.get('button#delete_button').first().click();
    cy.get('button')
      .contains(localizations.en.delete_delivery_providers)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.RemoveProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          deliveryProviderId: deliveryProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          RemoveDeliveryProviderResponse,
        );
      },
    );

    cy.location('pathname').should('contain', '/delivery-provider');
  });
});
