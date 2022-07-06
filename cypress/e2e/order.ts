import localization from '../../i18n/index';
import hasOperationName from '../utils/hasOperationName';
import {
  AuthenticationOperations,
  InvalidCredentialErrorResponse,
} from '../mock/authorization';

describe('Order', () => {
  it('Show Navigate to order page successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, AuthenticationOperations.LoginWithPassword)) {
        req.reply(InvalidCredentialErrorResponse);
      }
    });
    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localization.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');
  });
});
