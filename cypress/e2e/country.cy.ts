import localizations from '../../i18n';
import {
  CountryListResponse,
  CountryOperations,
  CreateCountryResponse,
  RemoveCountryResponse,
  SingleCountryResponse,
  UpdateCountryResponse,
} from '../mock/country';
import { CurrencyListResponse, CurrencyOperations } from '../mock/currency';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

const ALIASES = {
  CreateCountry: 'CreateCountry',
  UpdateCountry: 'UpdateCountry',
  RemoveCountry: 'RemoveCountry',
};

describe('Countries', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, CountryOperations.GetCountryList)) {
        const { body } = req;
        if (body.variables?.includeInactive || body.variables?.queryString) {
          aliasQuery(req, CountryOperations.GetCountryList);
        }
        req.reply(CountryListResponse);
      }
      if (hasOperationName(req, CountryOperations.GetSingleCountry)) {
        req.reply(SingleCountryResponse);
      }
      if (hasOperationName(req, CountryOperations.CreateCountry)) {
        aliasMutation(req, ALIASES.CreateCountry);
        req.reply(CreateCountryResponse);
      }
      if (hasOperationName(req, CountryOperations.UpdateCountry)) {
        aliasMutation(req, ALIASES.UpdateCountry);
        req.reply(UpdateCountryResponse);
      }
      if (hasOperationName(req, CountryOperations.RemoveCountry)) {
        aliasMutation(req, ALIASES.RemoveCountry);
        req.reply(RemoveCountryResponse);
      }
      if (hasOperationName(req, CurrencyOperations.GetCurrencyList)) {
        req.reply(CurrencyListResponse);
      }
    });
  });

  it('Show Navigate to [COUNTRY] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get('tr').should('have.length', 4);
  });

  it('Toggling status toggle should update route', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');

    cy.get('button[role="switch"]').click();
    cy.wait(fullAliasName(CountryOperations.GetCountryList))
      .its('request.body.variables.includeInactive')
      .should('be.true');
    cy.url().should('contain', '/country?includeInactive=true');
    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/country?includeInactive=false');
  });

  it('should update data and route when [SEARCHING] accordingly', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');

    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(CountryOperations.GetCountryList))
      .its('request.body.variables.queryString')
      .should('eq', 's');
    cy.url().should('contain', '/country?queryString=s');
    cy.get('input[type="search"]').type('a');
    cy.wait(fullAliasName(CountryOperations.GetCountryList))
      .its('request.body.variables.queryString')
      .should('eq', 'sa');
    cy.url().should('contain', '/country?queryString=sa');
  });

  it('Show Navigate to [NEW COUNTRY] form page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get('a[href="/country/new"]').click();
    cy.url().should('contain', '/country/new');
  });

  it('Show [ADD COUNTRY]  successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get('a[href="/country/new"]').click();
    cy.url().should('contain', '/country/new');
    cy.get('input#isoCode').type('de');
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_country)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.CreateCountry)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          country: {
            isoCode: 'de',
          },
        });
        expect(currentSubject.response.body).to.deep.eq(SingleCountryResponse);
      },
    );
  });

  it('Show [ERROR] when required fields are not provided in add country', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get('a[href="/country/new"]').click();
    cy.url().should('contain', '/country/new');
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_country)
      .click();

    cy.get('label[for="isoCode"]').should(
      'contain.text',
      localizations.en.error_country_code,
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.add_country)
      .should('be.disabled');
  });

  it('Show [INITIALIZE COUNTRY] successfully', () => {
    const { country } = SingleCountryResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.url().should('contain', `/country/${country._id}`);
    cy.get('input#isoCode').should('have.value', country.isoCode);
    cy.get('select#defaultCurrencyId').should(
      'have.value',
      country.defaultCurrency._id,
    );
    cy.get('input[type="checkbox"]#isActive');
    cy.get('button').contains(localizations.en.delete);
    cy.get('input[type="submit"]').contains(localizations.en.update_country);
  });

  it('Show [UPDATE COUNTRY] successfully', () => {
    const { country } = SingleCountryResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.url().should('contain', `/country/${country._id}`);
    cy.get('select#defaultCurrencyId').select(1);
    cy.get('input[type="checkbox"]#isActive').uncheck();
    cy.get('input[type="submit"]')
      .contains(localizations.en.update_country)
      .click();

    cy.wait(fullAliasMutationName(ALIASES.UpdateCountry)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          country: {
            defaultCurrencyId: country.defaultCurrency._id,
            isoCode: country.isoCode,
            isActive: false,
          },
          countryId: country._id,
        });
        expect(currentSubject.response.body).to.deep.eq(UpdateCountryResponse);
      },
    );
  });

  it('Show [DELETE COUNTRY] successfully', () => {
    const { country } = SingleCountryResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.url().should('contain', `/country/${country._id}`);
    cy.get('input[type="checkbox"]#isActive');
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_country).click();
    cy.url().should('contain', '/country');

    cy.wait(fullAliasMutationName(ALIASES.RemoveCountry)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          countryId: country._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveCountryResponse);
      },
    );
  });

  it('Show [DELETE COUNTRY FROM LIST] successfully', () => {
    const { country } = SingleCountryResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_country).click();
    cy.url().should('contain', '/country');

    cy.wait(fullAliasMutationName(ALIASES.RemoveCountry)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          countryId: country._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveCountryResponse);
      },
    );
  });
});
