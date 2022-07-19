import localizations from '../../i18n';
import {
  AuthenticationOperations,
  InvalidCredentialErrorResponse,
  LogInSuccessResponse,
} from '../mock/authorization';
import { CurrentUserResponse, UserOperations } from '../mock/user';
import { aliasMutation } from '../utils/aliasMutation';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Login', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, AuthenticationOperations.LoginWithPassword)) {
        aliasMutation(req, AuthenticationOperations.LoginWithPassword);
        if (req.body.variables.plainPassword !== 'correct')
          req.reply(InvalidCredentialErrorResponse);
        else
          req.reply(LogInSuccessResponse, {
            'set-cookie':
              'token=48e3a6e9080ffdfdd42955c4ab9e9498cbb6fe91d80; Path=/; Expires=Sun, 15 Jan 2030 17:14:57 GMT; HttpOnly; SameSite=None',
          });
      }

      if (hasOperationName(req, UserOperations.CurrentUser)) {
        if (req.headers?.cookie && req.headers?.cookie.includes('token')) {
          req.reply(CurrentUserResponse);
        } else req.reply({ data: { me: null } });
      }
    });
    cy.visit('/');
  });

  it('Should redirect to login page if user is not logged in', () => {
    cy.location('pathname').should('eq', '/log-in');
  });

  it('Should [LOGIN] successfully', () => {
    cy.location('pathname').should('eq', '/log-in');
    cy.get('input[name="email"]').type('admin@unchained.local');
    cy.get('input[name="password"]').type('correct');
    cy.get('button[type="submit"]').contains(localizations.en.log_in).click();
    cy.location('pathname').should('eq', '/');
  });

  it('Should [FAIL LOGIN] when invalid credentials are passed', () => {
    cy.location('pathname').should('eq', '/log-in');
    cy.get('input[name="email"]').type('admin@unchained.local');
    cy.get('input[name="password"]').type('wrong-password');
    cy.get('button[type="submit"]').contains(localizations.en.log_in).click();
    cy.location('pathname').should('eq', '/log-in');
    cy.get('li span').contains(localizations.en.invalid_credential_error);
  });

  it('Should [ERROR] when [REQUIRED] fields are missing', () => {
    cy.location('pathname').should('eq', '/log-in');

    cy.get('button[type="submit"]').contains(localizations.en.log_in).click();
    cy.get('label[for="email"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_email,
        localizations.en.email,
      ),
    );
    cy.get('label[for="password"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.password,
      ),
    );
    cy.location('pathname').should('eq', '/log-in');
  });
});
