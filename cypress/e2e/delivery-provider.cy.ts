import localizations from '../../i18n';

import {
  CreateDeliveryProviderResponse,
  DeliveryProviderListResponse,
  DeliveryProviderOperations,
  DeliveryProviderPickUpInterfaces,
  DeliveryProvidersTypeResponse,
  SingleDeliveryProviderResponse,
} from '../mock/delivery-provider';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

const ALIASES = {
  GetPickUpDeliveryProviders: 'GetPickUpDeliveryProviders',
  CreateProvider: 'CreateProvider',
};
describe('Countries', () => {
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
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, DeliveryProviderOperations.CreateProvider)) {
        aliasMutation(req, ALIASES.CreateProvider);
        req.reply(CreateDeliveryProviderResponse);
      }
    });
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
});
