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
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';

describe('Order', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, OrderOperations.GetOrderList)) {
        aliasQuery(req, OrderOperations.GetOrderList);
        req.reply(OrderListResponse);
      }
      if (hasOperationName(req, OrderOperations.GetSingleOrder)) {
        aliasQuery(req, OrderOperations.GetSingleOrder);
        req.reply(SingleOrderResponse);
      }
      if (hasOperationName(req, OrderOperations.OrderStatus)) {
        aliasQuery(req, OrderOperations.OrderStatus);
        req.reply(OrderStatusResponse);
      }
      if (hasOperationName(req, OrderOperations.OrderPaymentStatus)) {
        aliasQuery(req, OrderOperations.OrderPaymentStatus);
        req.reply(OrderPaymentStatusResponse);
      }
      if (hasOperationName(req, OrderOperations.PaymentProvidersType)) {
        aliasQuery(req, OrderOperations.PaymentProvidersType);
        req.reply(PaymentProvidersTypeResponse);
      }
      if (hasOperationName(req, OrderOperations.OrderDeliveryStatus)) {
        aliasQuery(req, OrderOperations.OrderDeliveryStatus);
        req.reply(OrderDeliveryStatusResponse);
      }
      if (hasOperationName(req, OrderOperations.DeliveryProvidersType)) {
        aliasQuery(req, OrderOperations.DeliveryProvidersType);
        req.reply(DeliveryProvidersTypeResponse);
      }
      if (hasOperationName(req, OrderOperations.ConfirmOrder)) {
        aliasMutation(req, OrderOperations.ConfirmOrder);
        req.reply(ConfirmOrderResponse);
      }
      if (hasOperationName(req, OrderOperations.RejectOrder)) {
        aliasMutation(req, OrderOperations.RejectOrder);
        req.reply(RejectOrderResponse);
      }
      if (hasOperationName(req, OrderOperations.DeliverOrder)) {
        aliasMutation(req, OrderOperations.DeliverOrder);
        req.reply(DeliverOrderResponse);
      }
      if (hasOperationName(req, OrderOperations.PayOrder)) {
        aliasMutation(req, OrderOperations.PayOrder);
        req.reply(PayOrderResponse);
      }
    });

    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });

    cy.wait(fullAliasName(OrderOperations.GetOrderList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          includeCarts: false,
          queryString: '',
          sort: [],
        });
        expect(response.body).to.deep.eq(OrderListResponse);
      },
    );

    cy.get('h2').should('contain.text', localizations.en.orders_list_header);
  });

  it('Show Navigate to [ORDERS] page successfully', () => {
    cy.location('pathname').should('eq', '/orders');
    cy.get('tr').should('have.length', 10);
  });

  it('Toggling status toggle should update route', () => {
    cy.location('pathname').should('eq', '/orders');
    cy.get('button[role="switch"]').click();

    cy.wait(fullAliasName(OrderOperations.GetOrderList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          includeCarts: true,
          queryString: '',
          sort: [],
        });
        expect(response.body).to.deep.eq(OrderListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/orders');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeCarts: 'true',
      });
    });
    cy.get('button[role="switch"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/orders');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeCarts: 'false',
      });
    });
  });

  it('should update data and route when [SEARCHING] accordingly', () => {
    cy.location('pathname').should('eq', '/orders');
    cy.get('input#search').type('s');

    cy.wait(fullAliasName(OrderOperations.GetOrderList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          includeCarts: false,
          queryString: 's',
          sort: [],
        });
        expect(response.body).to.deep.eq(OrderListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/orders');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        queryString: 's',
      });
    });
    cy.get('input[type="search"]').type('a');

    cy.wait(fullAliasName(OrderOperations.GetOrderList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          includeCarts: false,
          queryString: 'sa',
          sort: [],
        });
        expect(response.body).to.deep.eq(OrderListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/orders');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        queryString: 'sa',
      });
    });
  });

  it('Should [FILTER] by multiple fields [STATUS & QUERY STRING]', () => {
    cy.location('pathname').should('eq', '/orders');

    cy.get('button[role="switch"]').click();
    cy.wait(fullAliasName(OrderOperations.GetOrderList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          includeCarts: true,
          queryString: '',
          sort: [],
        });
        expect(response.body).to.deep.eq(OrderListResponse);
      },
    );

    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(OrderOperations.GetOrderList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          includeCarts: true,
          queryString: 's',
          sort: [],
        });
        expect(response.body).to.deep.eq(OrderListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/orders');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeCarts: 'true',
        queryString: 's',
      });
    });
  });

  it('Show Navigate to [ORDER DETAIL] page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.location('pathname').should('eq', '/orders');
    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.wait(fullAliasName(OrderOperations.DeliveryProvidersType)).then(
      (currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(
          DeliveryProvidersTypeResponse,
        );
      },
    );

    cy.wait(fullAliasName(OrderOperations.OrderDeliveryStatus)).then(
      (currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(
          OrderDeliveryStatusResponse,
        );
      },
    );

    cy.wait(fullAliasName(OrderOperations.PaymentProvidersType)).then(
      (currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(
          PaymentProvidersTypeResponse,
        );
      },
    );

    cy.wait(fullAliasName(OrderOperations.OrderStatus)).then(
      (currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(OrderStatusResponse);
      },
    );

    cy.wait(fullAliasName(OrderOperations.OrderPaymentStatus)).then(
      (currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(
          OrderPaymentStatusResponse,
        );
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);
  });

  it('Show [ORDER NUMBER] in detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.location('pathname').should('eq', '/orders');
    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order?.status === 'OPEN') {
      cy.get('span#order_number_badge').should(
        'contain',
        localizations.en.cart,
      );
    } else {
      cy.get('span#order_number_badge').should('contain', order.orderNumber);
    }
  });

  it('Show [CONFIRM ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.location('pathname').should('eq', '/orders');
    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order.status === 'PENDING') {
      cy.get('button#confirm_order')
        .contains(localizations.en.confirm_order)
        .click({ force: true });

      cy.get('button#alert_modal')
        .contains(localizations.en.confirm_order_alert_button)
        .click({
          force: true,
        });

      cy.wait(fullAliasMutationName(OrderOperations.ConfirmOrder)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            orderId: order._id,
          });
          expect(currentSubject.response.body).to.deep.eq(ConfirmOrderResponse);
        },
      );
    }

    cy.location('pathname').should('eq', `/orders/${order._id}`);
  });

  it('Show cancel [CONFIRM ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.location('pathname').should('eq', '/orders');
    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order.status === 'PENDING') {
      cy.get('button#confirm_order')
        .contains(localizations.en.confirm_order)
        .click({ force: true });

      cy.get('button#modal_close').click({
        force: true,
      });
    }

    cy.location('pathname').should('eq', `/orders/${order._id}`);
  });

  it('Show [REJECT ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.location('pathname').should('eq', '/orders');
    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order.status === 'PENDING') {
      cy.get('button#reject_order')
        .contains(localizations.en.reject_order)
        .click({ force: true });

      cy.get('button#danger_continue')
        .contains(localizations.en.continue)
        .click({
          force: true,
        });

      cy.wait(fullAliasMutationName(OrderOperations.RejectOrder)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            orderId: order._id,
          });
          expect(currentSubject.response.body).to.deep.eq(RejectOrderResponse);
        },
      );
    }

    cy.location('pathname').should('eq', `/orders/${order._id}`);
  });

  it('Show cancel [REJECT ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.location('pathname').should('eq', '/orders');
    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order.status === 'PENDING') {
      cy.get('button#reject_order')
        .contains(localizations.en.reject_order)
        .click({ force: true });

      cy.get('button#danger_cancel').contains(localizations.en.cancel).click({
        force: true,
      });
    }

    cy.location('pathname').should('eq', `/orders/${order._id}`);
  });

  it('Show [DELIVER ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.location('pathname').should('eq', '/orders');
    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order.delivery.status === 'OPEN') {
      cy.get('button#deliver')
        .contains(localizations.en.mark_as_delivered)
        .click({ force: true });

      cy.get('button#alert_modal').contains(localizations.en.delivered).click({
        force: true,
      });

      cy.wait(fullAliasMutationName(OrderOperations.DeliverOrder)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            orderId: order._id,
          });
          expect(currentSubject.response.body).to.deep.eq(DeliverOrderResponse);
        },
      );
    }

    cy.location('pathname').should('eq', `/orders/${order._id}`);
  });

  it('Show cancel [DELIVERY ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.location('pathname').should('eq', '/orders');
    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order.delivery.status === 'OPEN') {
      cy.get('button#deliver')
        .contains(localizations.en.mark_as_delivered)
        .click({ force: true });

      cy.get('button#modal_close').click({
        force: true,
      });
    }

    cy.location('pathname').should('eq', `/orders/${order._id}`);
  });

  it('Show [PAY ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.location('pathname').should('eq', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order.payment.status === 'OPEN') {
      cy.get('button#pay')
        .contains(localizations.en.mark_as_paid)
        .click({ force: true });

      cy.get('button#alert_modal').contains(localizations.en.pay).click({
        force: true,
      });

      cy.wait(fullAliasMutationName(OrderOperations.PayOrder)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            orderId: order._id,
          });
          expect(currentSubject.response.body).to.deep.eq(PayOrderResponse);
        },
      );
    }

    cy.location('pathname').should('eq', `/orders/${order._id}`);
  });

  it('Show cancel [PAY ORDER ] on order detail page successfully', () => {
    const { order } = SingleOrderResponse.data;

    cy.visit('/');
    cy.viewport(1280, 800);
    cy.get('a[href="/orders"]')
      .contains(localizations.en.orders)
      .click({ force: true });
    cy.location('pathname').should('eq', '/orders');

    cy.get(`a[href="/orders/${order._id}"]`).click();

    cy.wait(fullAliasName(OrderOperations.GetSingleOrder)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          orderId: order._id,
        });
        expect(response.body).to.deep.eq(SingleOrderResponse);
      },
    );

    cy.location('pathname').should('eq', `/orders/${order._id}`);
    cy.get('h2').should('contain.text', localizations.en.order_detail);

    if (order.payment.status === 'OPEN') {
      cy.get('button#pay')
        .contains(localizations.en.mark_as_paid)
        .click({ force: true });

      cy.get('button#modal_close').click({
        force: true,
      });
    }

    cy.location('pathname').should('eq', `/orders/${order._id}`);
  });
});
