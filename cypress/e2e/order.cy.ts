import localizations from '../../i18n/index';
import localization from '../../i18n/index';
import { DeliveryProvidersTypeResponse } from '../mock/delivery-provider';
import {
  ConfirmOrderResponse,
  OrderDeliveryStatusResponse,
  OrderListResponse,
  OrderOperations,
  OrderPaymentStatusResponse,
  OrderStatusResponse,
  PaymentProvidersTypeResponse,
  SingleOrderResponse,
} from '../mock/order';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

const ALIASES = {
  ConfirmOrder: 'ConfirmOrder',
};

describe('Order', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, OrderOperations.Orders)) {
        const { body } = req;
        if (body.variables?.includeCarts || body.variables?.queryString) {
          aliasQuery(req, OrderOperations.Orders);
        }
        req.reply(OrderListResponse);
      }
      if (hasOperationName(req, OrderOperations.OrderStatus)) {
        req.reply(OrderStatusResponse);
      }
      if (hasOperationName(req, OrderOperations.OrderPaymentStatus)) {
        req.reply(OrderPaymentStatusResponse);
      }
      if (hasOperationName(req, OrderOperations.PaymentProvidersType)) {
        req.reply(PaymentProvidersTypeResponse);
      }
      if (hasOperationName(req, OrderOperations.OrderDeliveryStatus)) {
        req.reply(OrderDeliveryStatusResponse);
      }
      if (hasOperationName(req, OrderOperations.DeliveryProvidersType)) {
        req.reply(DeliveryProvidersTypeResponse);
      }
      if (hasOperationName(req, OrderOperations.GetSingleOrder)) {
        req.reply(SingleOrderResponse);
      }
      if (hasOperationName(req, OrderOperations.ConfirmOrder)) {
        aliasMutation(req, ALIASES.ConfirmOrder);
        req.reply(ConfirmOrderResponse);
      }
    });
  });

  it('Show Navigate to [ORDERS] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localization.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get('tr').should('have.length', 10);
  });

  it('Toggling status toggle should update route', () => {
    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localization.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');
    cy.get('button[role="switch"]').click();

    cy.wait(fullAliasName(OrderOperations.Orders))
      .then((currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(OrderListResponse);
      })
      .its('request.body.variables.includeCarts')
      .should('be.true');

    cy.url().should('contain', '/orders?includeCarts=true');
    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/orders?includeCarts=false');
  });

  it('should update data and route when [SEARCHING] accordingly', () => {
    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localization.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');
    cy.get('input#search').type('s');

    cy.wait(fullAliasName(OrderOperations.Orders))
      .then((currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(OrderListResponse);
      })
      .its('request.body.variables.queryString')
      .should('eq', 's');

    cy.url().should('contain', '/orders?queryString=s');
    cy.get('input[type="search"]').type('a');

    cy.wait(fullAliasName(OrderOperations.Orders))
      .then((currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(OrderListResponse);
      })
      .its('request.body.variables.queryString')
      .should('eq', 'sa');

    cy.url().should('contain', '/orders?queryString=sa');
  });

  it('Show Navigate to [ORDER DETAIL] page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localization.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);
  });

  it('Show [CONFIRM ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localization.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);

    if (order.status === 'PENDING') {
      cy.get('button#confirm_order')
        .contains(localizations.en.confirm_order)
        .click({ force: true });

      cy.get('button#alert_modal')
        .contains(localizations.en.confirm_order_alert_button)
        .click({
          force: true,
        });

      cy.wait(fullAliasMutationName(ALIASES.ConfirmOrder)).then(
        (currentSubject) => {
          expect(currentSubject.response.body).to.deep.eq(ConfirmOrderResponse);
        },
      );
    }
  });
});
