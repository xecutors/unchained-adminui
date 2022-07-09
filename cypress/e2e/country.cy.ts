import localizations from '../../i18n';
import {
  CountryListResponse,
  CountryOperations,
  CreateCountryResponse,
} from '../mock/country';
import hasOperationName from '../utils/hasOperationName';

describe('Countries', () => {
  it('Show Navigate to [COUNTRY] page successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, CountryOperations.GetCountriesList)) {
        req.reply(CountryListResponse);
      }
    });

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
    cy.get('tr').should('have.length', 4);

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
});
