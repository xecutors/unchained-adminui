import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  CreateUserResponse,
  UserListResponse,
  UserOperations,
} from '../mock/user';
import hasOperationName from '../utils/hasOperationName';

describe('User', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, UserOperations.GetUserList)) {
        req.reply(UserListResponse);
      }
    });
  });

  it('Show Navigate to [USER] page successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, UserOperations.GetUserList)) {
        req.reply(UserListResponse);
      }
    });
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    // cy.get('tr').should('have.length', 6);
  });

  it('Show Navigate to [NEW USER] form page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get('a[href="/users/new"]').click();
    cy.url().should('contain', '/users/new');
  });

  it('Show [ADD USER]  successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, UserOperations.CreateUser)) {
        const { body } = req;
        expect(body.variables).to.deep.eq({
          user: {
            email: 'test@example.com',
            displayName: 'test example',
            gender: 'male',
            password: '',
            birthday: '',
            phoneMobile: '',
            firstName: '',
            lastName: '',
            company: '',
            addressLine: '',
            addressLine2: '',
            region: '',
            postalCode: '',
            city: '',
            countryCode: '',
          },
        });

        req.reply(CreateUserResponse);
      }
    });
    cy.visit('/');
    cy.get('a[href="/users"]')
      .contains(localizations.en.users)
      .click({ force: true });

    cy.url().should('contain', '/users');
    cy.get('a[href="/users/new"]').click();
    cy.url().should('contain', '/users/new');
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('password');
    cy.get('input#displayName').type('test@example.com');
    cy.get('select#gender').select('Male');
    cy.get('input[name="birthday"]').type('09/07/1986');
    cy.get('input#phoneMobile').type('+251123456789');
    cy.get('button').contains(localizations.en.cancel);
    cy.get('input[type="submit"]').contains(localizations.en.save);

    cy.get('input#firstName').type('test');
    cy.get('input#lastName').type('example');
    cy.get('input#company').type('bionic');
    cy.get('input#addressLine').type('bola');
    cy.get('input#addressLine2').type('bola');
    cy.get('input[name="birthday"]').type('09/07/1986');
    cy.get('input#phoneMobile').type('+251123456789');
    cy.get('button').contains(localizations.en.cancel);
    cy.get('input[type="submit"]').contains(localizations.en.save).click();
  });
});
