import localizations from '../../i18n';
import {
  AssortmentListResponse,
  AssortmentOperation,
  AssortmentPathsResponse,
} from '../mock/assortment';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';

describe('Assortment', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, AssortmentOperation.GetAssortmentList)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentList);
        req.reply(AssortmentListResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetAssortmentPaths)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentPaths);
        req.reply(AssortmentPathsResponse);
      }
    });

    cy.visit('/');
    cy.get('a[href="/assortments"]')
      .contains(localizations.en.assortments)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          forceLocale: 'en',
          includeInactive: false,
          includeLeaves: false,
          limit: 50,
          offset: 0,
          queryString: '',
          slugs: null,
          sort: [
            {
              key: 'sequence',
              value: 'ASC',
            },
          ],
          tags: null,
        });
        expect(currentSubject.response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.get('h2').should(
      'contain.text',
      localizations.en.assortments_list_header,
    );
  });

  xit('Show Navigate to [ASSORTMENTS] page successfully', () => {
    cy.location('pathname').should('eq', '/assortments');
    cy.get('tr').should('have.length', 8);
  });

  xit('[TOGGLE INACTIVE STATUS] should update route', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('button#includeInactive').click();
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          forceLocale: 'en',
          includeInactive: true,
          includeLeaves: false,
          limit: 50,
          offset: 0,
          queryString: '',
          slugs: null,
          sort: [
            {
              key: 'sequence',
              value: 'ASC',
            },
          ],
          tags: null,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'true',
      });
    });
    cy.get('button#includeInactive').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'false',
      });
    });
  });

  xit('[TOGGLE LEAF STATUS] should update route', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('button#includeLeaves').click();
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          forceLocale: 'en',
          includeInactive: false,
          includeLeaves: true,
          limit: 50,
          offset: 0,
          queryString: '',
          slugs: null,
          sort: [
            {
              key: 'sequence',
              value: 'ASC',
            },
          ],
          tags: null,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeLeaves: 'true',
      });
    });
    cy.get('button#includeLeaves').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeLeaves: 'false',
      });
    });
  });

  xit('[TOGGLE GRAPH STATUS] should update route', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('button#viewGraph').click();
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentPaths)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slugs: null,
          includeInactive: false,
          includeLeaves: false,
        });
        expect(response.body).to.deep.eq(AssortmentPathsResponse);
      },
    );
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        viewGraph: 'true',
      });
    });
    cy.get('button#viewGraph').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
    });
  });

  xit('should update data and route when [SEARCHING] accordingly', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          forceLocale: 'en',
          includeInactive: false,
          includeLeaves: false,
          limit: 50,
          offset: 0,
          queryString: 's',
          slugs: null,
          sort: [
            {
              key: 'sequence',
              value: 'ASC',
            },
          ],
          tags: null,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        queryString: 's',
      });
    });
    cy.get('input[type="search"]').type('a');
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          forceLocale: 'en',
          includeInactive: false,
          includeLeaves: false,
          limit: 50,
          offset: 0,
          queryString: 'sa',
          slugs: null,
          sort: [
            {
              key: 'sequence',
              value: 'ASC',
            },
          ],
          tags: null,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        queryString: 'sa',
      });
    });
  });

  it('should update data and route when [ADD TAG] accordingly', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('input#tag-input').type('new');
    cy.get('button#add-tag').contains(localizations.en.add_tag).click();

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          forceLocale: 'en',
          includeInactive: false,
          includeLeaves: false,
          limit: 50,
          offset: 0,
          queryString: '',
          slugs: null,
          sort: [
            {
              key: 'sequence',
              value: 'ASC',
            },
          ],
          tags: ['new'],
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tags: 'new',
      });
    });
    cy.get('input#tag-input').type('old');
    cy.get('button#add-tag').contains(localizations.en.add_tag).click();

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          forceLocale: 'en',
          includeInactive: false,
          includeLeaves: false,
          limit: 50,
          offset: 0,
          queryString: '',
          slugs: null,
          sort: [
            {
              key: 'sequence',
              value: 'ASC',
            },
          ],
          tags: ['new', 'old'],
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tags: 'new',
      });
    });
  });
});
