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
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  GetProvidersList: 'PaymentProviders',
  GetSingleProvider: 'PaymentProvider',
  GetGenericProviders: 'GetGenericProviders',
  GetProvidersType: 'PaymentProvidersType',
  GetInterfaces: 'PaymentInterfaces',
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
        } else {
          aliasQuery(req, ALIASES.GetProvidersList);
        }
        req.reply(PaymentProvidersListResponse);
      }
      if (hasOperationName(req, PaymentProviderOperations.GetSingleProvider)) {
        aliasQuery(req, ALIASES.GetSingleProvider);
        req.reply(SinglePaymentProviderResponse);
      }
      if (hasOperationName(req, PaymentProviderOperations.GetProvidersType)) {
        aliasQuery(req, ALIASES.GetProvidersType);
        req.reply(PaymentProvidersTypeResponse);
      }
      if (hasOperationName(req, PaymentProviderOperations.GetInterfaces)) {
        aliasQuery(req, ALIASES.GetInterfaces);
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

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/payment-provider"]')
      .contains(localizations.en.payment_providers)
      .click({ force: true });

    cy.wait(fullAliasName(ALIASES.GetProvidersList)).then((currentSubject) => {
      expect(currentSubject.response.body).to.deep.eq(
        PaymentProvidersListResponse,
      );
    });

    cy.wait(fullAliasName(ALIASES.GetProvidersType)).then((currentSubject) => {
      expect(currentSubject.response.body).to.deep.eq(
        PaymentProvidersTypeResponse,
      );
    });

    cy.get('h2').should(
      'contain.text',
      localizations.en.payment_providers_header,
    );
  });

  it('Show Navigate to [PAYMENT PROVIDERS] page successfully', () => {
    cy.location('pathname').should('contain', '/payment-provider');
    cy.get('tr').should('have.length', 2);
  });

  it('Should [FILTER] list based on selected value', () => {
    const { options } = PaymentProvidersTypeResponse.data.paymentProviderType;
    const [, , genericOption] = options;

    cy.location('pathname').should('contain', '/payment-provider');
    cy.get('tr').should('have.length', 2);
    cy.get('select#select-type').contains(localizations.en.filter_by_type);
    cy.get('select#select-type').select(genericOption.value);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/payment-provider');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        type: genericOption.value,
      });
    });

    cy.wait(fullAliasName(ALIASES.GetGenericProviders)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          type: genericOption.value,
        });
        expect(response.body).to.deep.eq(PaymentProvidersListResponse);
      },
    );

    cy.location('pathname').should('contain', '/payment-provider');
  });

  it('Show Navigate to [NEW DELIVERY PROVIDER] form page successfully', () => {
    cy.location('pathname').should('contain', '/payment-provider');
    cy.get('a[href="/payment-provider/new"]').click();
    cy.location('pathname').should('contain', '/payment-provider/new');

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        providerType: 'INVOICE',
      });
      expect(response.body).to.deep.eq(PaymentProvidersInterfaceResponse);
    });

    cy.get('h2').should(
      'contain.text',
      localizations.en.new_payment_provider_header,
    );
  });

  it('Show [ADD NEW DELIVERY PROVIDER] successfully', () => {
    const [firstPickUpInterface] =
      PaymentProvidersInterfaceResponse.data.paymentInterfaces;
    const { options } = PaymentProvidersTypeResponse.data.paymentProviderType;
    const [, , genericType] = options;

    cy.location('pathname').should('contain', '/payment-provider');
    cy.get('a[href="/payment-provider/new"]').click();
    cy.location('pathname').should('contain', '/payment-provider/new');

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        providerType: 'INVOICE',
      });
      expect(response.body).to.deep.eq(PaymentProvidersInterfaceResponse);
    });

    cy.get('h2').should(
      'contain.text',
      localizations.en.new_payment_provider_header,
    );
    cy.get('select#type').select(genericType.value);

    if (genericType.value !== 'INVOICE') {
      cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          providerType: genericType.value,
        });
        expect(response.body).to.deep.eq(PaymentProvidersInterfaceResponse);
      });
    }

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

    cy.location('pathname').should(
      'contain',
      `/payment-provider/${CreatePaymentProviderResponse.data.createPaymentProvider._id}`,
    );
  });

  it('Show [ERROR] when required fields are not provided in new payment provider', () => {
    cy.location('pathname').should('contain', '/payment-provider');
    cy.get('a[href="/payment-provider/new"]').click();
    cy.location('pathname').should('contain', '/payment-provider/new');

    cy.wait(fullAliasName(ALIASES.GetInterfaces)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        providerType: 'INVOICE',
      });
      expect(response.body).to.deep.eq(PaymentProvidersInterfaceResponse);
    });

    cy.get('h2').should(
      'contain.text',
      localizations.en.new_payment_provider_header,
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

    cy.location('pathname').should('contain', '/payment-provider/new');
  });

  it('Show [INITIALIZE PAYMENT PROVIDER] successfully', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.location('pathname').should('contain', '/payment-provider');
    cy.get(`a[href="/payment-provider/${paymentProvider._id}"]`).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        paymentProviderId: paymentProvider._id,
      });
      expect(response.body).to.deep.eq(SinglePaymentProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/payment-provider/${paymentProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_payment_provider_header,
    );

    cy.get('textarea#configuration').should(
      'have.value',
      JSON.stringify(paymentProvider.configuration || {}, null, 2),
    );
  });

  it('Show [UPDATE DELIVERY PROVIDER] successfully', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.location('pathname').should('contain', '/payment-provider');
    cy.get(`a[href="/payment-provider/${paymentProvider._id}"]`).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        paymentProviderId: paymentProvider._id,
      });
      expect(response.body).to.deep.eq(SinglePaymentProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/payment-provider/${paymentProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_payment_provider_header,
    );

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

    cy.location('pathname').should('contain', '/payment-provider');
  });

  it('Show [ERROR] when pattern of configuration fields are not correct in update provider', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.location('pathname').should('contain', '/payment-provider');
    cy.get(`a[href="/payment-provider/${paymentProvider._id}"]`).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        paymentProviderId: paymentProvider._id,
      });
      expect(response.body).to.deep.eq(SinglePaymentProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/payment-provider/${paymentProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_payment_provider_header,
    );

    cy.get('textarea#configuration').type('l').blur();

    cy.get('input[type="submit"]')
      .contains(localizations.en.update_configuration)
      .should('be.disabled');
  });

  it('Show [DELETE PAYMENT PROVIDER] successfully', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.location('pathname').should('contain', '/payment-provider');
    cy.get(`a[href="/payment-provider/${paymentProvider._id}"]`).click();

    cy.wait(fullAliasName(ALIASES.GetSingleProvider)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        paymentProviderId: paymentProvider._id,
      });
      expect(response.body).to.deep.eq(SinglePaymentProviderResponse);
    });

    cy.location('pathname').should(
      'contain',
      `/payment-provider/${paymentProvider._id}`,
    );
    cy.get('h2').should(
      'contain.text',
      localizations.en.update_payment_provider_header,
    );

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

    cy.location('pathname').should('contain', '/payment-provider');
  });

  it('Show [DELETE PAYMENT PROVIDER FROM LIST] successfully', () => {
    const { paymentProvider } = SinglePaymentProviderResponse.data;

    cy.location('pathname').should('contain', '/payment-provider');
    cy.get('button#delete_button').first().click();
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

    cy.location('pathname').should('contain', '/payment-provider');
  });
});
