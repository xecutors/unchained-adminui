import localizations from '../../i18n';
import {
  CreateLanguageResponse,
  LanguageOperations,
  LanguagesResponse,
} from '../mock/language';
import hasOperationName from '../utils/hasOperationName';

describe('Languages', () => {
  it('Show Navigate to [LANGUAGES] page successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
    });

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('tr').should('have.length', 4);

    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/language?includeInactive=true');
  });

  it('Show Navigate to [NEW LANGUAGE] form page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('a[href="/language/new"]').click();
    cy.url().should('contain', '/language/new');
  });

  it('Show [ADD LANGUAGE]  successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.CreateLanguage)) {
        const { body } = req;
        expect(body.variables).to.deep.eq({
          language: {
            isoCode: 'de',
          },
        });

        req.reply(CreateLanguageResponse);
      }
    });
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('a[href="/language/new"]').click();
    cy.url().should('contain', '/language/new');
    cy.get('input#isoCode').type('de');
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_language)
      .click();
  });
});
