import localizations from '../../i18n/index';
import { DeliveryProvidersTypeResponse } from '../mock/delivery-provider';
import {
  ConfirmOrderResponse,
  DeliverOrderResponse,
  OrderDeliveryStatusResponse,
  OrderListResponse,
  OrderOperations,
  OrderPaymentStatusResponse,
  OrderStatusResponse,
  PaymentProvidersTypeResponse,
  PayOrderResponse,
  RejectOrderResponse,
  SingleOrderResponse,
} from '../mock/order';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

const ALIASES = {
  ConfirmOrder: 'ConfirmOrder',
  RejectOrder: 'RejectOrder',
  DeliverOrder: 'DeliverOrder',
  PayOrder: 'PayOrder',
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
      if (hasOperationName(req, OrderOperations.RejectOrder)) {
        aliasMutation(req, ALIASES.RejectOrder);
        req.reply(RejectOrderResponse);
      }
      if (hasOperationName(req, OrderOperations.DeliverOrder)) {
        aliasMutation(req, ALIASES.DeliverOrder);
        req.reply(DeliverOrderResponse);
      }
      if (hasOperationName(req, OrderOperations.PayOrder)) {
        aliasMutation(req, ALIASES.PayOrder);
        req.reply(PayOrderResponse);
      }
    });
  });

  it('Show Navigate to [ORDERS] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get('tr').should('have.length', 10);
  });

  it('Toggling status toggle should update route', () => {
    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
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
      .contains(localizations.en.orders)
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
      .contains(localizations.en.orders)
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
      .contains(localizations.en.orders)
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
          expect(currentSubject.request.body.variables).to.deep.eq({
            orderId: order._id,
          });
          expect(currentSubject.response.body).to.deep.eq(ConfirmOrderResponse);
        },
      );
    }
  });

  it('Show cancel [CONFIRM ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);

    if (order.status === 'PENDING') {
      cy.get('button#confirm_order')
        .contains(localizations.en.confirm_order)
        .click({ force: true });

      cy.get('button#modal_close').click({
        force: true,
      });
    }
  });

  it('Show [REJECT ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);

    if (order.status === 'PENDING') {
      cy.get('button#reject_order')
        .contains(localizations.en.reject_order)
        .click({ force: true });

      cy.get('button#danger_continue')
        .contains(localizations.en.continue)
        .click({
          force: true,
        });

      cy.wait(fullAliasMutationName(ALIASES.RejectOrder)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            orderId: order._id,
          });
          expect(currentSubject.response.body).to.deep.eq(RejectOrderResponse);
        },
      );
    }
  });

  it('Show cancel [REJECT ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);

    if (order.status === 'PENDING') {
      cy.get('button#reject_order')
        .contains(localizations.en.reject_order)
        .click({ force: true });

      cy.get('button#danger_cancel').contains(localizations.en.cancel).click({
        force: true,
      });
    }
  });

  it('Show [DELIVER ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);

    if (order.delivery.status === 'OPEN') {
      cy.get('button#deliver')
        .contains(localizations.en.mark_as_delivered)
        .click({ force: true });

      cy.get('button#alert_modal').contains(localizations.en.delivered).click({
        force: true,
      });

      cy.wait(fullAliasMutationName(ALIASES.DeliverOrder)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            orderId: order._id,
          });
          expect(currentSubject.response.body).to.deep.eq(DeliverOrderResponse);
        },
      );
    }
  });

  it('Show cancel [DELIVERY ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);

    if (order.delivery.status === 'OPEN') {
      cy.get('button#deliver')
        .contains(localizations.en.mark_as_delivered)
        .click({ force: true });

      cy.get('button#modal_close').click({
        force: true,
      });
    }
  });

  it('Show [PAY ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);

    if (order.payment.status === 'OPEN') {
      cy.get('button#pay')
        .contains(localizations.en.mark_as_paid)
        .click({ force: true });

      cy.get('button#alert_modal').contains(localizations.en.pay).click({
        force: true,
      });

      cy.wait(fullAliasMutationName(ALIASES.PayOrder)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            orderId: order._id,
          });
          expect(currentSubject.response.body).to.deep.eq(PayOrderResponse);
        },
      );
    }
  });

  it('Show cancel [PAY ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();
    cy.url().should('contain', `/orders/${order._id}`);

    if (order.payment.status === 'OPEN') {
      cy.get('button#pay')
        .contains(localizations.en.mark_as_paid)
        .click({ force: true });

      cy.get('button#modal_close').click({
        force: true,
      });
    }
  });
});
