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
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  GetPickUpDeliveryProviders: 'GetPickUpDeliveryProviders',
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
        }
        req.reply(DeliveryProviderListResponse);
      }
      if (hasOperationName(req, DeliveryProviderOperations.GetSingleProvider)) {
        req.reply(SingleDeliveryProviderResponse);
      }
      if (hasOperationName(req, DeliveryProviderOperations.GetProvidersType)) {
        req.reply(DeliveryProvidersTypeResponse);
      }
      if (hasOperationName(req, DeliveryProviderOperations.GetInterfaces)) {
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
  });

  it('Show Navigate to [DELIVERY PROVIDERS] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get('tr').should('have.length', 4);
  });

  it('Should [FILTER] list based on selected value', () => {
    const { options } = DeliveryProvidersTypeResponse.data.deliveryProviderType;
    const [firstOption] = options;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get('tr').should('have.length', 4);
    cy.get('select#select-type').contains(localizations.en.filter_by_type);
    cy.get('select#select-type').select(firstOption.value);
    cy.url().should('contain', `/delivery-provider?type=${firstOption.value}`);

    cy.wait(fullAliasName(ALIASES.GetPickUpDeliveryProviders))
      .its('request.body.variables.type')
      .should('eq', firstOption.value);
  });

  it('Show Navigate to [NEW DELIVERY PROVIDER] form page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get('a[href="/delivery-provider/new"]').click();
    cy.url().should('contain', '/delivery-provider/new');
  });

  it('Show [ADD NEW DELIVERY PROVIDER]  successfully', () => {
    const [firstPickUpInterface] =
      DeliveryProviderPickUpInterfaces.data.deliveryInterfaces;
    const { options } = DeliveryProvidersTypeResponse.data.deliveryProviderType;
    const [firstType] = options;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get('a[href="/delivery-provider/new"]').click();
    cy.url().should('contain', '/delivery-provider/new');
    cy.get('select#type').select(firstType.value);
    cy.get('select#adapterKey').select(firstPickUpInterface.value);
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_provider)
      .click();

    cy.url().should(
      'contain',
      `/delivery-provider/${CreateDeliveryProviderResponse.data.createDeliveryProvider._id}`,
    );

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
  });

  it('Show [ERROR] when required fields are not provided in new delivery provider', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get('a[href="/delivery-provider/new"]').click();
    cy.url().should('contain', '/delivery-provider/new');
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

  it('Show [INITIALIZE DELIVERY PROVIDER] successfully', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get(`a[href="/delivery-provider/${deliveryProvider._id}"]`).click();
    cy.url().should('contain', `/delivery-provider/${deliveryProvider._id}`);

    cy.get('textarea#configuration').should(
      'have.value',
      JSON.stringify(deliveryProvider.configuration || {}, null, 2),
    );
  });

  it('Show [UPDATE DELIVERY PROVIDER] successfully', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get(`a[href="/delivery-provider/${deliveryProvider._id}"]`).click();
    cy.url().should('contain', `/delivery-provider/${deliveryProvider._id}`);

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

    cy.url().should('contain', '/delivery-provider');
  });

  it('Show [ERROR] when pattern of configuration fields are not correct in update delivery provider', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get(`a[href="/delivery-provider/${deliveryProvider._id}"]`).click();
    cy.url().should('contain', `/delivery-provider/${deliveryProvider._id}`);

    cy.get('textarea#configuration').type('l').blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .should('be.disabled');
  });

  it('Show [DELETE DELIVERY PROVIDER] successfully', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get(`a[href="/delivery-provider/${deliveryProvider._id}"]`).click();
    cy.url().should('contain', `/delivery-provider/${deliveryProvider._id}`);
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

    cy.url().should('contain', '/delivery-provider');
  });

  it('Show [DELETE DELIVERY PROVIDER FROM LIST] successfully', () => {
    const { deliveryProvider } = SingleDeliveryProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/delivery-provider"]')
      .contains(localizations.en.delivery_providers)
      .click({ force: true });

    cy.url().should('contain', '/delivery-provider');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
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

    cy.url().should('contain', '/delivery-provider');
  });
});
