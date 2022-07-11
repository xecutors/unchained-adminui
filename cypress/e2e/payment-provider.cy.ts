import localizations from '../../i18n';

import {
  CreatePaymentProviderResponse,
  PaymentProviderOperations,
  PaymentProvidersInterfaceResponse,
  PaymentProvidersListResponse,
  PaymentProvidersTypeResponse,
  SinglePaymentProviderResponse,
} from '../mock/payment-provider';

import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

const ALIASES = {
  GetGenericProviders: 'GetGenericProviders',
  CreateProvider: 'CreateProvider',
};
describe('Countries', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      const { body } = req;
      if (hasOperationName(req, PaymentProviderOperations.GetProvidersList)) {
        const { variables } = body;
        if (variables?.type === 'GENERIC') {
          aliasQuery(req, ALIASES.GetGenericProviders);
        }
        req.reply(PaymentProvidersListResponse);
      }
      if (hasOperationName(req, PaymentProviderOperations.GetSingleProvider)) {
        req.reply(SinglePaymentProviderResponse);
      }
      if (hasOperationName(req, PaymentProviderOperations.GetProvidersType)) {
        req.reply(PaymentProvidersTypeResponse);
      }
      if (hasOperationName(req, PaymentProviderOperations.GetInterfaces)) {
        req.reply(PaymentProvidersInterfaceResponse);
      }
    });
  });
  it('Show Navigate to [PAYMENT PROVIDERS] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get('tr').should('have.length', 2);
  });

  it('Should [FILTER] list based on selected value', () => {
    const { options } = PaymentProvidersTypeResponse.data.paymentProviderType;
    const [, , genericOption] = options;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get('tr').should('have.length', 2);
    cy.get('select#select-type').contains(localizations.en.filter_by_type);
    cy.get('select#select-type').select(genericOption.value);
    cy.url().should('contain', `/payment-provider?type=${genericOption.value}`);

    cy.wait(fullAliasName(ALIASES.GetGenericProviders))
      .its('request.body.variables.type')
      .should('eq', genericOption.value);
  });

  it('Show Navigate to [NEW DELIVERY PROVIDER] form page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get('a[href="/payment-provider/new"]').click();
    cy.url().should('contain', '/payment-provider/new');
  });

  it('Show [ADD NEW DELIVERY PROVIDER]  successfully', () => {
    const [firstPickUpInterface] =
      PaymentProvidersInterfaceResponse.data.paymentInterfaces;
    const { options } = PaymentProvidersTypeResponse.data.paymentProviderType;
    const [, , genericType] = options;
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, PaymentProviderOperations.CreateProvider)) {
        aliasMutation(req, ALIASES.CreateProvider);
        req.reply(CreatePaymentProviderResponse);
      }
    });
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get('a[href="/payment-provider/new"]').click();
    cy.url().should('contain', '/payment-provider/new');
    cy.get('select#type').select(genericType.value);
    cy.get('select#adapterKey').select(firstPickUpInterface.value);
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_provider)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.CreateProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          paymentProvider: {
            adapterKey: firstPickUpInterface._id,
            type: genericType.value,
          },
        });
        expect(currentSubject.response.body).to.deep.eq(
          CreatePaymentProviderResponse,
        );
      },
    );

    cy.url().should(
      'contain',
      `/payment-provider/${CreatePaymentProviderResponse.data.createPaymentProvider._id}`,
    );
  });
});
