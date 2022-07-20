import localizations from '../../i18n';
import {
  AssortmentListResponse,
  AssortmentOperation,
  AssortmentPathsResponse,
  UpdateAssortmentResponse,
} from '../mock/assortment';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';

const assortmentRequestVariables = {
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
};

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
      if (hasOperationName(req, AssortmentOperation.UpdateAssortment)) {
        aliasQuery(req, AssortmentOperation.UpdateAssortment);
        req.reply(UpdateAssortmentResponse);
      }
    });

    cy.visit('/');
    cy.get('a[href="/assortments"]')
      .contains(localizations.en.assortments)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq(
          assortmentRequestVariables,
        );
        expect(currentSubject.response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.get('h2').should(
      'contain.text',
      localizations.en.assortments_list_header,
    );
  });

  it('Show Navigate to [ASSORTMENTS] page successfully', () => {
    cy.location('pathname').should('eq', '/assortments');
    cy.get('tr').should('have.length', 8);
  });

  it('[TOGGLE INACTIVE STATUS] should update route', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('button#includeInactive').click();
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: true,
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

  it('[TOGGLE LEAF STATUS] should update route', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('button#includeLeaves').click();
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeLeaves: true,
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

  it('Show Navigate to [TANGLE TREE] successfully', () => {
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
    cy.get('svg#tangle-tree').should('be.visible');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        viewGraph: 'true',
      });
    });
  });

  it('[TOGGLE GRAPH STATUS] should update route', () => {
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

  it('should update data and route when [SEARCHING] accordingly', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          queryString: 's',
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
          ...assortmentRequestVariables,
          queryString: 'sa',
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
          ...assortmentRequestVariables,
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
          ...assortmentRequestVariables,
          tags: ['new', 'old'],
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tags: 'new,old',
      });
    });
  });

  it('should update data and route when [REMOVE TAGS IN ADD TAG] accordingly', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('input#tag-input').type('new');
    cy.get('button#add-tag').contains(localizations.en.add_tag).click();

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
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

    cy.get('button#badge-x-button').click();
    cy.location('pathname').should('eq', '/assortments');
  });

  it('should update data  when [ADD SEQUENCE] accordingly', () => {
    cy.location('pathname').should('eq', '/assortments');

    cy.get('input#sequence').first().clear().type('50').blur();
    cy.wait(fullAliasName(AssortmentOperation.UpdateAssortment)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortment: {
            sequence: 50,
          },
          assortmentId: 'snacks',
        });
        expect(response.body).to.deep.eq(UpdateAssortmentResponse);
      },
    );

    cy.location('pathname').should('eq', '/assortments');
  });

  it('Should [FILTER] by multiple fields [INACTIVE, LEAFS, TAGS & QUERY STRING]', () => {
    cy.location('pathname').should('eq', '/assortments');

    // toggle inactive
    cy.get('button#includeInactive').click();
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: true,
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

    // toggle leafs
    cy.get('button#includeLeaves').click();
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: true,
          includeLeaves: true,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'true',
        includeLeaves: 'true',
      });
    });

    // add tags
    cy.get('input#tag-input').type('new');
    cy.get('button#add-tag').contains(localizations.en.add_tag).click();

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: true,
          includeLeaves: true,
          tags: ['new'],
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'true',
        includeLeaves: 'true',
        tags: 'new',
      });
    });

    // search
    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: true,
          includeLeaves: true,
          tags: ['new'],
          queryString: 's',
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'true',
        includeLeaves: 'true',
        tags: 'new',
        queryString: 's',
      });
    });
  });
});
