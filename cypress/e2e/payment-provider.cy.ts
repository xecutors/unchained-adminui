import localizations from '../../i18n';

import {
  CreatePaymentProviderResponse,
  PaymentProviderOperations,
  PaymentProvidersInterfaceResponse,
  PaymentProvidersListResponse,
  PaymentProvidersTypeResponse,
  RemovePaymentProviderResponse,
  SinglePaymentProviderResponse,
  UpdatePaymentProviderResponse,
} from '../mock/payment-provider';

import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  GetGenericProviders: 'GetGenericProviders',
  CreateProvider: 'CreateProvider',
  UpdateProvider: 'UpdatePaymentProvider',
  RemoveProvider: 'RemovePaymentProvider',
};
describe('Payment Provider', () => {
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
      if (hasOperationName(req, PaymentProviderOperations.CreateProvider)) {
        aliasMutation(req, ALIASES.CreateProvider);
        req.reply(CreatePaymentProviderResponse);
      }
      if (hasOperationName(req, PaymentProviderOperations.UpdateProvider)) {
        aliasMutation(req, ALIASES.UpdateProvider);
        req.reply(UpdatePaymentProviderResponse);
      }
      if (hasOperationName(req, PaymentProviderOperations.RemoveProvider)) {
        aliasMutation(req, ALIASES.RemoveProvider);
        req.reply(RemovePaymentProviderResponse);
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

  it('Show [ERROR] when required fields are not provided in new payment provider', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get('a[href="/payment-provider/new"]').click();
    cy.url().should('contain', '/payment-provider/new');
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

  it('Show [INITIALIZE PAYMENT PROVIDER] successfully', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get(`a[href="/payment-provider/${paymentProvider._id}"]`).click();
    cy.url().should('contain', `/payment-provider/${paymentProvider._id}`);

    cy.get('textarea#configuration').should(
      'have.value',
      JSON.stringify(paymentProvider.configuration || {}, null, 2),
    );
  });

  it('Show [UPDATE DELIVERY PROVIDER] successfully', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get(`a[href="/payment-provider/${paymentProvider._id}"]`).click();
    cy.url().should('contain', `/payment-provider/${paymentProvider._id}`);
    cy.get('textarea#configuration')
      .clear()
      .type(JSON.stringify(paymentProvider.configuration, null, 2))
      .blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.UpdateProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          paymentProvider: {
            configuration: paymentProvider.configuration,
          },
          paymentProviderId: paymentProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          UpdatePaymentProviderResponse,
        );
      },
    );

    cy.url().should('contain', '/payment-provider');
  });

  it('Show [ERROR] when pattern of configuration fields are not correct in update provider', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get(`a[href="/payment-provider/${paymentProvider._id}"]`).click();
    cy.url().should('contain', `/payment-provider/${paymentProvider._id}`);

    cy.get('textarea#configuration').type('l').blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .should('be.disabled');
  });

  it('Show [DELETE PAYMENT PROVIDER] successfully', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get(`a[href="/payment-provider/${paymentProvider._id}"]`).click();
    cy.url().should('contain', `/payment-provider/${paymentProvider._id}`);
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_payment_provider).click();

    cy.wait(fullAliasMutationName(ALIASES.RemoveProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          paymentProviderId: paymentProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          RemovePaymentProviderResponse,
        );
      },
    );

    cy.url().should('contain', '/payment-provider');
  });

  it('Show [DELETE PAYMENT PROVIDER FROM LIST] successfully', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.url().should('contain', '/payment-provider');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_payment_provider).click();

    cy.wait(fullAliasMutationName(ALIASES.RemoveProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          paymentProviderId: paymentProvider._id,
        });
        expect(currentSubject.response.body).to.deep.eq(
          RemovePaymentProviderResponse,
        );
      },
    );

    cy.url().should('contain', '/payment-provider');
  });
});
