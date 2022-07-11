import localizations from '../../i18n';
import {
  CountryListResponse,
  CountryOperations,
  CreateCountryResponse,
<<<<<<< HEAD
  RemoveCountryResponse,
  SingleCountryResponse,
  UpdateCountryResponse,
=======
  SingleCountryResponse,
>>>>>>> 39af1e84 (Add country initialize and update tests)
} from '../mock/country';
import { CurrencyListResponse, CurrencyOperations } from '../mock/currency';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';

describe('Countries', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, CountryOperations.GetCountryList)) {
<<<<<<< HEAD
        aliasQuery(req, CountryOperations.GetCountryList);
=======
>>>>>>> 54e4318e (Fix failing country test and adjust few more)
        req.reply(CountryListResponse);
      }
      if (hasOperationName(req, CountryOperations.GetSingleCountry)) {
<<<<<<< HEAD
        aliasQuery(req, CountryOperations.GetSingleCountry);
        req.reply(SingleCountryResponse);
      }
      if (hasOperationName(req, CountryOperations.CreateCountry)) {
        aliasMutation(req, CountryOperations.CreateCountry);
        req.reply(CreateCountryResponse);
      }
      if (hasOperationName(req, CountryOperations.UpdateCountry)) {
        aliasMutation(req, CountryOperations.UpdateCountry);
        req.reply(UpdateCountryResponse);
      }
      if (hasOperationName(req, CountryOperations.RemoveCountry)) {
        aliasMutation(req, CountryOperations.RemoveCountry);
        req.reply(RemoveCountryResponse);
      }
      if (hasOperationName(req, CurrencyOperations.GetCurrencyList)) {
        aliasQuery(req, CurrencyOperations.GetCurrencyList);
        req.reply(CurrencyListResponse);
      }
=======
        req.reply(SingleCountryResponse);
      }
>>>>>>> 39af1e84 (Add country initialize and update tests)
    });
  });
  it('Show Navigate to [COUNTRY] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });
    // initial request to list
    cy.wait(fullAliasName(CountryOperations.GetCountryList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: false,
          limit: 50,
          offset: 0,
          queryString: '',
          sort: [],
        });
        expect(response.body).to.deep.eq(CountryListResponse);
      },
    );
  });

  it('Show Navigate to [COUNTRY] page successfully', () => {
    cy.location('pathname').should('eq', '/country');
    cy.get('h2').should('contain.text', localizations.en.countries);

    cy.get('tr').should('have.length', 4);
  });

<<<<<<< HEAD
  it('[TOGGLE STATUS] should update route', () => {
    cy.location('pathname').should('eq', '/country');
=======
  it('Toggling status toggle should update route', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/country"]')
      .contains(localizations.en.countries)
      .click({ force: true });

    cy.url().should('contain', '/country');
>>>>>>> 54e4318e (Fix failing country test and adjust few more)

    cy.get('button[role="switch"]').click();
    cy.wait(fullAliasName(CountryOperations.GetCountryList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: true,
          limit: 50,
          offset: 0,
          queryString: '',
          sort: [],
        });
        expect(response.body).to.deep.eq(CountryListResponse);
      },
    );
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/country');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'true',
      });
    });
    cy.get('button[role="switch"]').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/country');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'false',
      });
    });
  });

  it('should update data and route when [SEARCHING] accordingly', () => {
    cy.location('pathname').should('eq', '/country');

    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(CountryOperations.GetCountryList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: false,
          limit: 50,
          offset: 0,
          queryString: 's',
          sort: [],
        });
        expect(response.body).to.deep.eq(CountryListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/country');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        queryString: 's',
      });
    });
    cy.get('input[type="search"]').type('a');
    cy.wait(fullAliasName(CountryOperations.GetCountryList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: false,
          limit: 50,
          offset: 0,
          queryString: 'sa',
          sort: [],
        });
        expect(response.body).to.deep.eq(CountryListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/country');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        queryString: 'sa',
      });
    });
  });

  it('Should [FILTER] by multiple fields [STATUS & QUERY STRING]', () => {
    cy.location('pathname').should('eq', '/country');

    cy.get('button[role="switch"]').click();
    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(CountryOperations.GetCountryList));

    cy.wait(fullAliasName(CountryOperations.GetCountryList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: true,
          limit: 50,
          offset: 0,
          queryString: 's',
          sort: [],
        });
        expect(response.body).to.deep.eq(CountryListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/country');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'true',
        queryString: 's',
      });
    });
  });

  it('Show Navigate to [NEW COUNTRY] form page successfully', () => {
    cy.location('pathname').should('eq', '/country');
    cy.get('a[href="/country/new"]').click();
    cy.location('pathname').should('eq', '/country/new');
    cy.get('h2').should('contain.text', localizations.en.new_country_header);
  });

  it('Show [ADD COUNTRY]  successfully', () => {
    cy.location('pathname').should('eq', '/country');
    cy.get('a[href="/country/new"]').click();
    cy.location('pathname').should('eq', '/country/new');
    cy.get('h2').should('contain.text', localizations.en.new_country_header);
    cy.get('input#isoCode').type('de');
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_country)
      .click();

    cy.wait(fullAliasMutationName(CountryOperations.CreateCountry)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          country: {
            isoCode: 'de',
          },
        });
        expect(currentSubject.response.body).to.deep.eq(CreateCountryResponse);
      },
    );
    cy.location('pathname').should(
      'eq',
      `/country/${CreateCountryResponse.data.createCountry._id}`,
    );
  });

  it('Show [ERROR] when required fields are not provided in add country', () => {
    cy.location('pathname').should('eq', '/country');
    cy.get('a[href="/country/new"]').click();
    cy.location('pathname').should('eq', '/country/new');
    cy.get('h2').should('contain.text', localizations.en.new_country_header);
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

    cy.location('pathname').should('eq', '/country');
    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.location('pathname').should('eq', `/country/${country._id}`);
    cy.wait(fullAliasName(CountryOperations.GetSingleCountry)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          countryId: country._id,
        });
        expect(response.body).to.deep.eq(SingleCountryResponse);
      },
    );

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

    cy.location('pathname').should('eq', '/country');
    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.location('pathname').should('eq', `/country/${country._id}`);
    cy.wait(fullAliasName(CountryOperations.GetSingleCountry)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          countryId: country._id,
        });
        expect(response.body).to.deep.eq(SingleCountryResponse);
      },
    );

    cy.get('select#defaultCurrencyId').select(1);
    cy.get('input[type="checkbox"]#isActive').uncheck();
    cy.get('input[type="submit"]')
      .contains(localizations.en.update_country)
      .click();

    cy.wait(fullAliasMutationName(CountryOperations.UpdateCountry)).then(
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
    cy.location('pathname').should(
      'eq',
      `/country/${SingleCountryResponse.data.country._id}`,
    );
  });

  it('Show [DELETE COUNTRY] successfully', () => {
    const { country } = SingleCountryResponse.data;

    cy.location('pathname').should('eq', '/country');
    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.location('pathname').should('eq', `/country/${country._id}`);
    cy.get('input[type="checkbox"]#isActive');
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_country).click();
    cy.location('pathname').should('eq', '/country');

    cy.wait(fullAliasMutationName(CountryOperations.RemoveCountry)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          countryId: country._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveCountryResponse);
      },
    );
    cy.location('pathname').should('eq', `/country`);
  });

  it('Show [DELETE COUNTRY FROM LIST] successfully', () => {
    const { country } = SingleCountryResponse.data;

    cy.location('pathname').should('eq', '/country');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_country).click();
    cy.location('pathname').should('eq', '/country');

    cy.wait(fullAliasMutationName(CountryOperations.RemoveCountry)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          countryId: country._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveCountryResponse);
      },
    );
    cy.location('pathname').should('eq', `/country`);
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
      if (hasOperationName(req, CountryOperations.CreateCountry)) {
        const { body } = req;
        expect(body.variables).to.deep.eq({
          country: {
            _id: country._id,
            isoCode: country.isoCode,
            isBase: country.isBase,
            defaultCurrency: {
              _id: country.defaultCurrency._id,
              isoCode: 'CHF',
              __typename: 'Currency',
            },
            isActive: true,
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

    cy.get(`a[href="/country/${country._id}"]`).click();
    cy.url().should('contain', `/country/${country._id}`);
    cy.get('select#defaultCurrencyId').select('CHF');
    cy.get('input[type="checkbox"]#isActive').uncheck();
    cy.get('input[type="submit"]')
      .contains(localizations.en.update_country)
      .click();
  });
});
