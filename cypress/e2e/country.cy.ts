import localizations from '../../i18n';
import {
  CountryListResponse,
  CountryOperations,
  CreateCountryResponse,
  SingleCountryResponse,
  UpdateCountryResponse,
} from '../mock/country';
import hasOperationName from '../utils/hasOperationName';

describe('Countries', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, CountryOperations.GetCountryList)) {
        req.reply(CountryListResponse);
      }
      if (hasOperationName(req, CountryOperations.GetSingleCountry)) {
        req.reply(SingleCountryResponse);
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
    cy.url().should('contain', '/country?includeInactive=true');
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
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, CountryOperations.CreateCountry)) {
        const { body } = req;
        expect(body.variables).to.deep.eq({
          country: {
            isoCode: 'de',
          },
        });

        req.reply(CreateCountryResponse);
      }
    });
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
  });

  it('Show [INITIALIZE COUNTRY] successfully', () => {
    const { country } = SingleCountryResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

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

    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, CountryOperations.UpdateCountry)) {
        const { body } = req;
        expect(body.variables).to.deep.eq({
          country: {
            defaultCurrencyId: country.defaultCurrency._id,
            isoCode: country.isoCode,
            isActive: false,
          },
          countryId: country._id,
        });

        req.reply(UpdateCountryResponse);
      }
    });

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.url().should('contain', `/country/${country._id}`);
    cy.get('select#defaultCurrencyId').select(1);
    cy.get('input[type="checkbox"]#isActive').uncheck();
    cy.get('input[type="submit"]')
      .contains(localizations.en.update_country)
      .click();
  });

  it('Show [DELETE COUNTRY] successfully', () => {
    const { country } = SingleCountryResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.url().should('contain', `/country/${country._id}`);
    cy.get('input[type="checkbox"]#isActive');
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_country).click();
    cy.url().should('contain', '/country');
  });

  it('Show [DELETE COUNTRY FROM LIST] successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_country).click();
    cy.url().should('contain', '/country');
  });
});
