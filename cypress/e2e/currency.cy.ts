import localizations from '../../i18n';
import {
  CreateCurrencyResponse,
  CurrencyListResponse,
  CurrencyOperations,
  RemoveCurrencyResponse,
  SingleCurrencyResponse,
  UpdateCurrencyResponse,
} from '../mock/currency';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ALIASES = {
  CreateCurrency: 'CreateCurrency',
  UpdateCurrency: 'UpdateCurrency',
  RemoveCurrency: 'RemoveCurrency',
};

describe('Currencies', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, CurrencyOperations.GetCurrencyList)) {
        const { body } = req;
        if (body.variables?.includeInactive || body.variables?.queryString) {
          aliasQuery(req, CurrencyOperations.GetCurrencyList);
        }

        req.reply(CurrencyListResponse);
      }
      if (hasOperationName(req, CurrencyOperations.GetSingleCurrency)) {
        req.reply(SingleCurrencyResponse);
      }
      if (hasOperationName(req, CurrencyOperations.CreateCurrency)) {
        aliasMutation(req, ALIASES.CreateCurrency);
        req.reply(CreateCurrencyResponse);
      }
      if (hasOperationName(req, CurrencyOperations.UpdateCurrency)) {
        aliasMutation(req, ALIASES.UpdateCurrency);
        req.reply(UpdateCurrencyResponse);
      }
      if (hasOperationName(req, CurrencyOperations.RemoveCurrency)) {
        aliasMutation(req, ALIASES.RemoveCurrency);
        req.reply(RemoveCurrencyResponse);
      }
    });
  });

  it('Show Navigate to [CURRENCY] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');
    cy.get('tr').should('have.length', 4);
  });

  it('Toggling status  toggle should update route', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');

    cy.get('button[role="switch"]').click();
    cy.wait(fullAliasName(CurrencyOperations.GetCurrencyList))
      .its('request.body.variables.includeInactive')
      .should('be.true');
    cy.url().should('contain', '/currency?includeInactive=true');
    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/currency?includeInactive=false');
  });

  it('should update data and route when [SEARCHING] accordingly', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');

    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(CurrencyOperations.GetCurrencyList))
      .its('request.body.variables.queryString')
      .should('eq', 's');
    cy.url().should('contain', '/currency?queryString=s');
    cy.get('input[type="search"]').type('a');
    cy.wait(5000);
    cy.wait(fullAliasName(CurrencyOperations.GetCurrencyList))
      .its('request.body.variables.queryString')
      .should('eq', 'sa');
    cy.url().should('contain', '/currency?queryString=sa');
  });

  it('Show Navigate to [NEW CURRENCY] form page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');
    cy.get('a[href="/currency/new"]').click();
    cy.url().should('contain', '/currency/new');
  });

  it('Show [ADD CURRENCY]  successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');
    cy.get('a[href="/currency/new"]').click();
    cy.url().should('contain', '/currency/new');
    cy.get('input#isoCode').type('de');
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_currency)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.CreateCurrency)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          currency: {
            isoCode: 'de',
          },
        });
        expect(currentSubject.response.body).to.deep.eq(SingleCurrencyResponse);
      },
    );
  });

  it('Show [ERROR] when required fields are not provided in add currency', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');
    cy.get('a[href="/currency/new"]').click();
    cy.url().should('contain', '/currency/new');
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_currency)
      .click();

    cy.get('label[for="isoCode"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.iso_code,
      ),
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.add_currency)
      .should('be.disabled');
  });

  it('Show [INITIALIZE CURRENCY] successfully', () => {
    const { currency } = SingleCurrencyResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');
    cy.get(`a[href="/currency/${currency._id}"]`).click();
    cy.url().should('contain', `/currency/${currency._id}`);
    cy.get('input#isoCode').should('have.value', currency.isoCode);
    cy.get('input#contractAddress').should(
      'have.value',
      currency.contractAddress,
    );
    cy.get('input[type="checkbox"]#is-active');
  });

  it('Show [UPDATE CURRENCY] successfully', () => {
    const { currency } = SingleCurrencyResponse.data;

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
    cy.get('input[type="checkbox"]#is-active').check();
    cy.get('input[type="submit"]')
      .contains(localizations.en.update_currency)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.UpdateCurrency)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          currency: {
            // contractAddress: currency.contractAddress,
            isoCode: currency.isoCode,
            isActive: currency.isActive,
          },
          currencyId: currency._id,
        });
        expect(currentSubject.response.body).to.deep.eq(UpdateCurrencyResponse);
      },
    );
  });

  it('Show [DELETE CURRENCY] successfully', () => {
    const { currency } = SingleCurrencyResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');
    cy.get(`a[href="/currency/${currency._id}"]`).click();
    cy.url().should('contain', `/currency/${currency._id}`);
    cy.get('input[type="checkbox"]#is-active');
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_currency).click();
    cy.url().should('contain', '/currency');

    cy.wait(fullAliasMutationName(ALIASES.RemoveCurrency)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          currencyId: currency._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveCurrencyResponse);
      },
    );
  });

  it('Show [DELETE CURRENCY FROM LIST] successfully', () => {
    const { currency } = SingleCurrencyResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/currency"]')
      .contains(localizations.en.currencies)
      .click({ force: true });

    cy.url().should('contain', '/currency');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_currency).click();
    cy.url().should('contain', '/currency');

    cy.wait(fullAliasMutationName(ALIASES.RemoveCurrency)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          currencyId: currency._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveCurrencyResponse);
      },
    );
  });
});
