import localizations from '../../i18n';
import {
  CreateLanguageResponse,
  LanguageOperations,
  LanguagesResponse,
  SingleLanguageResponse,
  UpdateLanguageResponse,
} from '../mock/language';
import hasOperationName from '../utils/hasOperationName';

describe('Languages', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, LanguageOperations.GetSingleLanguage)) {
        req.reply(SingleLanguageResponse);
      }
    });
  });
  it('Show Navigate to [LANGUAGES] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('tr').should('have.length', 4);
  });

  it('Toggling active status should update route accordingly', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
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
            isoCode: 'es',
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
    cy.get('input#isoCode').type('es');
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_language)
      .click();
  });

  it('Show [INITIALIZE LANGUAGE] successfully', () => {
    const { language } = SingleLanguageResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.get(`a[href="/language/${language._id}"]`).click();
    cy.url().should('contain', `/language/${language._id}`);
    cy.get('input#isoCode').should('have.value', language.isoCode);
    cy.get('input[type="checkbox"]#isActive');
  });

  it('Show [UPDATE LANGUAGE] successfully', () => {
    const { language } = SingleLanguageResponse.data;

    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.UpdateLanguage)) {
        const { body } = req;
        expect(body.variables).to.deep.eq({
          language: {
            isoCode: language.isoCode,
            isActive: false,
          },
          languageId: language._id,
        });

        req.reply(UpdateLanguageResponse);
      }
    });

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.get(`a[href="/language/${language._id}"]`).click();
    cy.url().should('contain', `/language/${language._id}`);
    cy.get('input[type="checkbox"]#isActive').uncheck();
    cy.get('input[type="submit"]')
      .contains(localizations.en.update_language)
      .click();
  });

  it('Show [DELETE COUNTRY] successfully', () => {
    const { language } = SingleLanguageResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.get(`a[href="/language/${language._id}"]`).click();
    cy.url().should('contain', `/language/${language._id}`);
    cy.get('input[type="checkbox"]#isActive');
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_language).click();
    cy.url().should('contain', '/language');
  });

  it('Show [DELETE COUNTRY FROM LIST] successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_language).click();
    cy.url().should('contain', '/language');
  });
});
