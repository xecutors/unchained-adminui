import localizations from '../../i18n';
import {
  CreateFilterResponse,
  FilterListResponse,
  FilterOperations,
  FilterTypesResponse,
  RemoveFilterResponse,
  SingleFilterResponse,
  TranslatedFilterTextResponse,
  UpdateFilterTextResponse,
} from '../mock/filter';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Filter', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, FilterOperations.GetFiltersList)) {
        aliasQuery(req, FilterOperations.GetFiltersList);
        req.reply(FilterListResponse);
      }
      if (hasOperationName(req, FilterOperations.GetSingleFilter)) {
        aliasQuery(req, FilterOperations.GetSingleFilter);
        req.reply(SingleFilterResponse);
      }
      if (hasOperationName(req, FilterOperations.GetTranslatedFilterText)) {
        aliasQuery(req, FilterOperations.GetTranslatedFilterText);
        req.reply(TranslatedFilterTextResponse);
      }
      if (hasOperationName(req, FilterOperations.GetFilterType)) {
        aliasQuery(req, FilterOperations.GetFilterType);
        req.reply(FilterTypesResponse);
      }
      if (hasOperationName(req, FilterOperations.CreateFiler)) {
        aliasMutation(req, FilterOperations.CreateFiler);
        req.reply(CreateFilterResponse);
      }
      if (hasOperationName(req, FilterOperations.UpdateFilterText)) {
        aliasMutation(req, FilterOperations.UpdateFilterText);
        req.reply(UpdateFilterTextResponse);
      }
      if (hasOperationName(req, FilterOperations.RemoveFilter)) {
        aliasMutation(req, FilterOperations.RemoveFilter);
        req.reply(RemoveFilterResponse);
      }
    });
  });

  it('Should navigate to [FILTER LIST] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });
    cy.url().should('match', /\/filters$/);
    cy.get('h2').should('contain', localizations.en.filters);
    cy.get('tr').should('have.length', 4);
  });

  it('Should navigate to [FILTER DETAIL] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });
    cy.url().should('match', /\/filters$/);
    cy.get(`a[href="/filters/${SingleFilterResponse.data.filter._id}"]`)
      .contains(SingleFilterResponse.data.filter.texts.title)
      .first()
      .click();

    cy.wait(fullAliasName(FilterOperations.GetSingleFilter)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables.filterId).eq(
          SingleFilterResponse.data.filter._id,
        );
      },
    );

    cy.url().should(
      'contain',
      `/filters/${SingleFilterResponse.data.filter._id}`,
    );
    cy.get('h2').should('contain', localizations.en.filter_detail);
  });

  it('Toggling status [ACTIVE/INACTIVE] toggle should update route', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });

    cy.url().should('contain', '/filters');
    cy.wait(fullAliasName(FilterOperations.GetFiltersList)).then(
      (currentSubject) => {
        const { request } = currentSubject;
        expect(request.body.variables.includeInactive).to.eq(false);
      },
    );

    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/filters?includeInactive=true');
    cy.wait(fullAliasName(FilterOperations.GetFiltersList)).then(
      (currentSubject) => {
        const { request } = currentSubject;
        expect(request.body.variables.includeInactive).to.eq(true);
      },
    );

    cy.get('button[role="switch"]').click();
    cy.url().should('contain', '/filters?includeInactive=false');
  });

  it('should update data and route when [SEARCHING] accordingly', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });

    cy.url().should('contain', '/filters');
    cy.wait(fullAliasName(FilterOperations.GetFiltersList));
    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(FilterOperations.GetFiltersList))
      .its('request.body.variables.queryString')
      .should('eq', 's');
    cy.url().should('contain', '/filters?queryString=s');
    cy.get('input[type="search"]').type('a');
    cy.wait(fullAliasName(FilterOperations.GetFiltersList))
      .its('request.body.variables.queryString')
      .should('eq', 'sa');
    cy.url().should('contain', '/filters?queryString=sa');
  });

  it('Should navigate to [INITIALIZE FILTER TEXT] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });
    cy.url().should('match', /\/filters$/);
    cy.get(`a[href="/filters/${SingleFilterResponse.data.filter._id}"]`)
      .contains(SingleFilterResponse.data.filter.texts.title)
      .first()
      .click();

    cy.wait(fullAliasName(FilterOperations.GetSingleFilter)).then(
      (currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(SingleFilterResponse);
      },
    );

    cy.wait(fullAliasName(FilterOperations.GetTranslatedFilterText)).then(
      (currentSubject) => {
        expect(currentSubject.response.body).to.deep.eq(
          TranslatedFilterTextResponse,
        );
      },
    );

    cy.get('input[name="title"]').should(
      'have.value',
      TranslatedFilterTextResponse.data.translatedFilterTexts[0].title,
    );
    cy.get('input[name="subtitle"]').should(
      'have.value',
      TranslatedFilterTextResponse.data.translatedFilterTexts[0].subtitle,
    );
  });

  it('Should navigate to [NEW FILTER FORM] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });
    cy.url().should('match', /\/filters$/);

    cy.get('a[href="/filters/new"]').click();
    cy.url().should('contain', '/filters/new');
    cy.get('h2').should('contain', localizations.en.new_filter_header);
  });

  it('Should navigate to [NEW FILTER FORM] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });
    cy.url().should('match', /\/filters$/);

    cy.get('a[href="/filters/new"]').click();
    cy.url().should('contain', '/filters/new');
    cy.get('h2').should('contain', localizations.en.new_filter_header);
  });

  it('Should [CREATE FILTER] successfully', () => {
    const [firstFilterType] = FilterTypesResponse.data.filterTypes.options;
    cy.visit('/');
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });
    cy.url().should('match', /\/filters$/);

    cy.get('a[href="/filters/new"]').click();
    cy.url().should('contain', '/filters/new');
    cy.get('h2').should('contain', localizations.en.new_filter_header);
    cy.get('input[name="title"]').type(
      SingleFilterResponse.data.filter.texts.title,
    );
    cy.get('input[name="key"]').type(SingleFilterResponse.data.filter.key);
    cy.get('select[name="type"]').select(firstFilterType.value);
    cy.get(`button[aria-label="${localizations.en.delete}"]`).click();
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_filter)
      .click();
    cy.wait(fullAliasMutationName(FilterOperations.CreateFiler)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          filter: {
            key: SingleFilterResponse.data.filter.key,
            title: SingleFilterResponse.data.filter.texts.title,
            type: firstFilterType.value,
            options: [],
          },
        });
        expect(response.body).to.deep.eq(CreateFilterResponse);
      },
    );
    cy.url().should(
      'contain',
      `/filters/${CreateFilterResponse.data.createFilter._id}`,
    );
  });

  it('Should Display [ERROR when CREATE FILTER] required fields are missing', () => {
    const [firstFilterType] = FilterTypesResponse.data.filterTypes.options;
    cy.visit('/');
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });
    cy.url().should('match', /\/filters$/);

    cy.get('a[href="/filters/new"]').click();
    cy.url().should('contain', '/filters/new');
    cy.get('h2').should('contain', localizations.en.new_filter_header);
    cy.get('input[name="title"]').type(
      SingleFilterResponse.data.filter.texts.title,
    );
    cy.get('input[name="key"]').type(SingleFilterResponse.data.filter.key);
    cy.get('select[name="type"]').select(firstFilterType.value);
    cy.get(`button[aria-label="${localizations.en.delete}"]`).click();
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_filter)
      .click();
    cy.wait(fullAliasMutationName(FilterOperations.CreateFiler)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          filter: {
            key: SingleFilterResponse.data.filter.key,
            title: SingleFilterResponse.data.filter.texts.title,
            type: firstFilterType.value,
            options: [],
          },
        });
        expect(response.body).to.deep.eq(CreateFilterResponse);
      },
    );
    cy.url().should(
      'contain',
      `/filters/${CreateFilterResponse.data.createFilter._id}`,
    );
  });

  it('Should Display [ERROR when CREATE FILTER] required fields are missing', () => {
    cy.visit('/');
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });
    cy.url().should('match', /\/filters$/);

    cy.get('a[href="/filters/new"]').click();
    cy.url().should('contain', '/filters/new');
    cy.get('h2').should('contain', localizations.en.new_filter_header);
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_filter)
      .click();

    cy.get('label[for="title"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.title,
      ),
    );
    cy.get('label[for="key"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.key,
      ),
    );
    cy.get('label[for="type"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.type,
      ),
    );

    // Add options required test

    cy.get('input[type="submit"]').should('be.disabled');
  });

  it('Show [DELETE FILTER] successfully', () => {
    const { filter } = SingleFilterResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });

    cy.url().should('contain', '/filters');
    cy.get(`a[href="/filters/${filter._id}"]`).click();
    cy.url().should('contain', `/filters/${filter._id}`);
    cy.get('button').contains(localizations.en.delete).click();
    cy.get('button').contains(localizations.en.delete_filter).click();
    cy.url().should('contain', '/filters');

    cy.wait(fullAliasMutationName(FilterOperations.RemoveFilter)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          filterId: filter._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveFilterResponse);
      },
    );
  });

  it('Show [DELETE FILTER FROM LIST] successfully', () => {
    const { filter } = SingleFilterResponse.data;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/filters"]')
      .contains(localizations.en.filters)
      .click({ force: true });

    cy.url().should('contain', '/filters');
    cy.get('button.rounded-full.bg-white.px-1.py-1').first().click();
    cy.get('button').contains(localizations.en.delete_filter).click();
    cy.url().should('contain', '/filters');

    cy.wait(fullAliasMutationName(FilterOperations.RemoveFilter)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          filterId: filter._id,
        });
        expect(currentSubject.response.body).to.deep.eq(RemoveFilterResponse);
      },
    );
  });
});
