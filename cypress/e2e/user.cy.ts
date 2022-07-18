import localizations from '../../i18n';
import { DeliveryProvidersTypeResponse } from '../mock/delivery-provider';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import { PaymentProvidersTypeResponse } from '../mock/payment-provider';
import {
  GetSingleOrderResponse,
  OrderDeliveryStatusResponse,
  OrderPaymentStatusResponse,
  OrderStatusResponse,
  SingleOrderResponse,
  SingleUserResponse,
  SystemRolesResponse,
  UserEnrollmentsListResponse,
  UserListResponse,
  UserOperations,
  UserOrderListResponse,
  UserQuotationsListResponse,
} from '../mock/user';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

describe('User', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, UserOperations.GetUserList)) {
        const { body } = req;
        if (body.variables?.includeGuests || body.variables?.queryString) {
          aliasQuery(req, UserOperations.GetUserList);
        }
        req.reply(UserListResponse);
      }
      if (hasOperationName(req, UserOperations.GetSingle)) {
        req.reply(SingleUserResponse);
      }
      if (hasOperationName(req, UserOperations.SystemRoles)) {
        req.reply(SystemRolesResponse);
      }
      if (hasOperationName(req, UserOperations.UserOrder)) {
        const { body } = req;
        if (body.variables?.queryString) {
          aliasQuery(req, UserOperations.UserOrder);
        }
        req.reply(UserOrderListResponse);
      }
      if (hasOperationName(req, UserOperations.UserQuotations)) {
        aliasQuery(req, UserOperations.UserQuotations);
        req.reply(UserQuotationsListResponse);
      }
      if (hasOperationName(req, UserOperations.UserEnrollments)) {
        req.reply(UserEnrollmentsListResponse);
      }
      if (hasOperationName(req, UserOperations.OrderStatus)) {
        req.reply(OrderStatusResponse);
      }
      if (hasOperationName(req, UserOperations.OrderPaymentStatus)) {
        req.reply(OrderPaymentStatusResponse);
      }
      if (hasOperationName(req, UserOperations.PaymentProvidersType)) {
        req.reply(PaymentProvidersTypeResponse);
      }
      if (hasOperationName(req, UserOperations.OrderDeliveryStatus)) {
        req.reply(OrderDeliveryStatusResponse);
      }
      if (hasOperationName(req, UserOperations.DeliveryProvidersType)) {
        req.reply(DeliveryProvidersTypeResponse);
      }
      if (hasOperationName(req, UserOperations.GetSingleOrder)) {
        req.reply(GetSingleOrderResponse);
      }
    });
  });

  context('Order Tab', () => {
    it('Show Navigate to [USER ORDER] page successfully', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1280, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);

      cy.get(`a`).contains(localizations.en.orders).click();
      cy.url().should('contain', `/users/${user._id}?tab=orders`);
      cy.get('tr').should('have.length', 2);
    });

    it('Show Navigate to [USER ORDER ON MOBILE] page successfully', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(400, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.get('button#close_sidebar').click();
      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);
      cy.get(`select#selected-tab`).select(localizations.en.orders);
      cy.url().should('contain', `/users/${user._id}?tab=orders`);
      cy.get('tr').should('have.length', 2);
    });

    it('Show Navigate to [ORDER] page successfully', () => {
      const { user } = SingleUserResponse.data;
      const { order } = SingleOrderResponse.data;

      cy.visit('/');
      cy.viewport(1280, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);

      cy.get(`a`).contains(localizations.en.orders).click();
      cy.url().should('contain', `/users/${user._id}?tab=orders`);
      cy.wait(100);

      cy.get(`a[href="/orders/${order._id}"]`).click();
      cy.url().should('contain', `/orders/${order._id}`);
    });

    it('should update data and route when [SEARCHING] accordingly', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1280, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);

      cy.get(`a`).contains(localizations.en.orders).click();
      cy.url().should('contain', `/users/${user._id}?tab=orders`);

      cy.get('input[type="search"]').focus().type('s');
      cy.wait(fullAliasName(UserOperations.UserOrder))
        .then((currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(
            UserOrderListResponse,
          );
        })
        .its('request.body.variables.queryString')
        .should('eq', 's');

      cy.url().should('contain', `/users/${user._id}?tab=orders&queryString=s`);
      cy.get('input[type="search"]').focus().type('a');
      cy.wait(fullAliasName(UserOperations.UserOrder))
        .then((currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(
            UserOrderListResponse,
          );
        })
        .its('request.body.variables.queryString')
        .should('eq', 'sa');

      cy.url().should(
        'contain',
        `/users/${user._id}?tab=orders&queryString=sa`,
      );
    });
  });

  context('Quotations Tab', () => {
    xit('Show Navigate to [USER QUOTATIONS] page successfully', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1280, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);

      cy.get('a').contains(localizations.en.quotations).click();
      cy.url().should('contain', `/users/${user._id}?tab=quotations`);
      cy.wait(fullAliasName(UserOperations.UserQuotations)).then(
        (currentSelection) => {
          expect(currentSelection.response.body).to.deep.eq(
            UserQuotationsListResponse,
          );
        },
      );
      cy.get('tr').should('have.length', 2);
      cy.pause();
    });

    xit('Show Navigate to [USER QUOTATIONS ON MOBILE] page successfully', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1000, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);
      cy.get(`select#selected-tab`).select(localizations.en.quotations);
      cy.url().should('contain', `/users/${user._id}?tab=quotations`);
      cy.get('tr').should('have.length', 4);
    });

    xit('should update data and route when [SEARCHING] accordingly', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1280, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);

      cy.get(`a`).contains(localizations.en.quotations).click();
      cy.url().should('contain', `/users/${user._id}?tab=quotations`);

      cy.get('input[type="search"]').type('s');
      cy.wait(fullAliasName(UserOperations.UserQuotations))
        .then((currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(
            UserQuotationsListResponse,
          );
        })
        .its('request.body.variables.queryString')
        .should('eq', 's');

      cy.url().should(
        'contain',
        `/users/${user._id}?tab=quotations&queryString=s`,
      );
      cy.get('input[type="search"]').type('a');

      cy.wait(fullAliasName(UserOperations.UserQuotations))
        .then((currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(
            UserQuotationsListResponse,
          );
        })
        .its('request.body.variables.queryString')
        .should('eq', 'sa');

      cy.url().should(
        'contain',
        `/users/${user._id}?tab=quotations&queryString=sa`,
      );
    });

    xit('Show Navigate to [QUOTATIONS] page successfully', () => {
      const { user } = SingleUserResponse.data;
      // const quotation = UserQuotationsListResponse.data.user.quotations[0];

      cy.visit('/');
      cy.viewport(1280, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);

      cy.get(`a`).contains(localizations.en.quotations).click();
      cy.url().should('contain', `/users/${user._id}?tab=quotations`);
      // cy.get(`a[href="/quotations/${quotation._id}"]`).click();

      // cy.url().should('contain', `/quotations/${quotations._id}`);
    });
  });

  context('Enrollments Tab', () => {
    xit('Show Navigate to [USER ENROLLMENTS] page successfully', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1280, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);

      cy.get(`a`).contains(localizations.en.enrollments).click();
      cy.url().should('contain', `/users/${user._id}?tab=enrollments`);
      cy.get('tr').should('have.length', 4);
    });

    xit('Show Navigate to [USER ENROLLMENTS ON MOBILE] page successfully', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1000, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);
      cy.get(`select#selected-tab`).select(localizations.en.enrollments);
      cy.url().should('contain', `/users/${user._id}?tab=enrollments`);
    });
  });

  context('Payment Credentials Tab', () => {
    it('Show Navigate to [USER PAYMENT CREDENTIALS] page successfully', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1280, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);

      cy.get(`a`).contains(localizations.en.payment_credentials).click();
      cy.url().should('contain', `/users/${user._id}?tab=payment_credentials`);
      cy.get('li.py-4').should('have.length', 3);
    });

    it('Show Navigate to [USER PAYMENT CREDENTIALS ON MOBILE] page successfully', () => {
      const { user } = SingleUserResponse.data;

      cy.visit('/');
      cy.viewport(1000, 800);
      cy.get('a[href="/users"]')
        .contains(localizations.en.users)
        .click({ force: true });

      cy.url().should('contain', '/users');
      cy.get(`a[href="/users/${user._id}"]`).click();
      cy.url().should('contain', `/users/${user._id}`);
      cy.get(`select#selected-tab`).select(
        localizations.en.payment_credentials,
      );
      cy.url().should('contain', `/users/${user._id}?tab=payment_credentials`);
      cy.get('li.py-4').should('have.length', 3);
    });
  });
});
