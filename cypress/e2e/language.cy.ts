import localizations from '../../i18n';
import {
  CreateLanguageResponse,
  LanguageOperations,
  LanguagesResponse,
  RemoveLanguageResponse,
  SingleLanguageResponse,
  UpdateLanguageResponse,
} from '../mock/language';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

const ALIASES = {
  CreateLanguage: 'CreateLanguage',
  UpdateLanguage: 'UpdateLanguage',
  RemoveLanguage: 'RemoveLanguage',
};

describe('Languages', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        const { body } = req;
        if (body.variables?.includeInactive || body.variables?.queryString) {
          aliasQuery(req, LanguageOperations.GetLanguagesList);
        }

        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, LanguageOperations.GetSingleLanguage)) {
        req.reply(SingleLanguageResponse);
      }
      if (hasOperationName(req, LanguageOperations.CreateLanguage)) {
        aliasMutation(req, ALIASES.CreateLanguage);
        req.reply(CreateLanguageResponse);
      }
      if (hasOperationName(req, LanguageOperations.UpdateLanguage)) {
        aliasMutation(req, ALIASES.UpdateLanguage);
        req.reply(UpdateLanguageResponse);
      }
      if (hasOperationName(req, LanguageOperations.RemoveLanguage)) {
        aliasMutation(req, ALIASES.RemoveLanguage);
        req.reply(RemoveLanguageResponse);
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
    cy.wait(fullAliasName(LanguageOperations.GetLanguagesList))
      .its('request.body.variables.includeInactive')
      .should('be.true');
    cy.url().should('contain', '/language?includeInactive=true');
    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/language?includeInactive=false');
  });

  it('Should update data and route accordingly when [SEARCHING]', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(LanguageOperations.GetLanguagesList))
      .its('request.body.variables.queryString')
      .should('eq', 's');
    cy.url().should('contain', '/language?queryString=s');
    cy.get('input[type="search"]').type('a');
    cy.wait(5000);
    cy.wait(fullAliasName(LanguageOperations.GetLanguagesList))
      .its('request.body.variables.queryString')
      .should('eq', 'sa');
    cy.url().should('contain', '/language?queryString=sa');
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

    cy.wait(fullAliasMutationName(ALIASES.CreateLanguage)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          language: {
            isoCode: 'de',
          },
        });
        expect(currentSubject.response.body).to.deep.eq(SingleLanguageResponse);
      },
    );
  });

  it('Show [ERROR] when required fields are not provided in add language', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('a[href="/language/new"]').click();
    cy.url().should('contain', '/language/new');
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_language)
      .click();

    cy.get('label[for="isoCode"]').should(
      'contain.text',
      localizations.en.error_language_code,
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.add_language)
      .should('be.disabled');
  });

  it('Show [INITIALIZE LANGUAGE] successfully', () => {
    const { language } = SingleLanguageResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get(`a[href="/language/${language._id}"]`).click();
    cy.url().should('contain', `/language/${language._id}`);
    cy.get('input#isoCode').should('have.value', language.isoCode);
    cy.get('input[type="checkbox"]#isActive');
  });

  it('Show [UPDATE LANGUAGE] successfully', () => {
    const { language } = SingleLanguageResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get(`a[href="/language/${language._id}"]`).click();
    cy.url().should('contain', `/language/${language._id}`);
    cy.get('input[type="checkbox"]#isActive').uncheck();
    cy.get('input[type="submit"]')
      .contains(localizations.en.update_language)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.UpdateLanguage)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          language: {
            isoCode: language.isoCode,
            isActive: false,
          },
          languageId: language._id,
        });
        expect(currentSubject.response.body).to.deep.eq(UpdateLanguageResponse);
      },
    );
  });

  it('Show [DELETE COUNTRY] successfully', () => {
    const { language } = SingleLanguageResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get(`a[href="/language/${language._id}"]`).click();
    cy.url().should('contain', `/language/${language._id}`);
    cy.get('input[type="checkbox"]#isActive');
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_language).click();
    cy.url().should('contain', '/language');

    cy.wait(fullAliasMutationName(ALIASES.RemoveLanguage)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          languageId: language._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveLanguageResponse);
      },
    );
  });

  it('Show [DELETE COUNTRY FROM LIST] successfully', () => {
    const { language } = SingleLanguageResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.url().should('contain', '/language');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_language).click();
    cy.url().should('contain', '/language');

    cy.wait(fullAliasMutationName(ALIASES.RemoveLanguage)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          languageId: language._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveLanguageResponse);
      },
    );
  });
});
