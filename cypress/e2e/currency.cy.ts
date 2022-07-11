import localizations from '../../i18n';
import {
  CurrencyOperations,
  SingleCurrencyResponse,
  UpdateCurrencyResponse,
} from '../mock/currency';
import {
  CreateLanguageResponse,
  LanguageOperations,
  LanguagesResponse,
} from '../mock/language';
import hasOperationName from '../utils/hasOperationName';

describe('Languages', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, CurrencyOperations.GetSingleCurrency)) {
        req.reply(SingleCurrencyResponse);
      }
    });
  });
  it('Show Navigate to [CURRENCY] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('tr').should('have.length', 4);
  });

  it('Toggling status  toggle should update route', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');

    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/language?includeInactive=true');
  });

  it('Show Navigate to [NEW CURRENCY] form page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/language"]')
      .contains(localizations.en.languages)
      .click({ force: true });

    cy.url().should('contain', '/language');
    cy.get('a[href="/language/new"]').click();
    cy.url().should('contain', '/language/new');
  });

  it('Show [ADD CURRENCY]  successfully', () => {
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

  it('Show [INITIALIZE CURRENCY] successfully', () => {
    const { currency } = SingleCurrencyResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.get(`a[href="/currency/${currency._id}"]`).click();
    cy.url().should('contain', `/currency/${currency._id}`);
    cy.get('input#isoCode').should('have.value', currency.isoCode);
    cy.get('input#contractAddress').should(
      'have.value',
      currency.contractAddress,
    );
    cy.get('input[type="checkbox"]#is-active');
    cy.get('button').contains(localizations.en.delete);
    cy.get('input[type="submit"]').contains(localizations.en.update_currency);
  });

  it('Show [UPDATE CURRENCY] successfully', () => {
    const { currency } = SingleCurrencyResponse.data;

    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, CurrencyOperations.UpdateCurrency)) {
        const { body } = req;
        expect(body.variables).to.deep.eq({
          currency: {
            contractAddress: currency.contractAddress,
            isoCode: currency.isoCode,
            isActive: false,
          },
          currencyId: currency._id,
        });

        req.reply(UpdateCurrencyResponse);
      }
    });

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.get(`a[href="/currency/${currency._id}"]`).click();
    cy.url().should('contain', `/currency/${currency._id}`);
    cy.get('input#contractAddress')
      .clear()
      .type('0x26b3E189B7DEE08EB86cCc698abc9D33980e39c6');
    cy.get('input[type="checkbox"]#is-active').uncheck();
    cy.get('input[type="submit"]')
      .contains(localizations.en.update_currency)
      .click();
  });

  it('Show [DELETE CURRENCY] successfully', () => {
    const { currency } = SingleCurrencyResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.get(`a[href="/currency/${currency._id}"]`).click();
    cy.url().should('contain', `/currency/${currency._id}`);
    cy.get('input[type="checkbox"]#is-active');
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_currency).click();
    cy.url().should('contain', '/currency');
  });

  it('Show [DELETE CURRENCY FROM LIST] successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_currency).click();
    cy.url().should('contain', '/currency');
  });
});
