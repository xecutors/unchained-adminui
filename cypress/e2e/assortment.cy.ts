import localizations from '../../src/i18n';
import generateUniqueId from '../../src/modules/common/utils/getUniqueId';
import {
  AssortmentChildrenResponse,
  AssortmentListResponse,
  AssortmentOperation,
  assortmentRequestVariables,
  CreateAssortmentResponse,
  SingleAssortmentResponse,
  TranslatedAssortmentTextsResponse,
  UpdateAssortmentResponse,
} from '../mock/assortment';
import { LanguagesResponse } from '../mock/language';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Assortment', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (hasOperationName(req, AssortmentOperation.GetAssortmentList)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentList);
        req.reply(AssortmentListResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetAssortmentChildren)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentChildren);
        req.reply(AssortmentChildrenResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetSingleAssortment)) {
        aliasQuery(req, AssortmentOperation.GetSingleAssortment);
        req.reply(SingleAssortmentResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetTranslatedTexts)) {
        aliasQuery(req, AssortmentOperation.GetTranslatedTexts);
        req.reply(TranslatedAssortmentTextsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.UpdateAssortment)) {
        aliasMutation(req, AssortmentOperation.UpdateAssortment);
        req.reply(UpdateAssortmentResponse);
      }
      if (hasOperationName(req, AssortmentOperation.CreateAssortment)) {
        aliasMutation(req, AssortmentOperation.CreateAssortment);
        req.reply(CreateAssortmentResponse);
      }
    });

    cy.visit('/');
    cy.get('a[href="/assortments"]')
      .contains(localizations.en.assortments)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq(assortmentRequestVariables);
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location('pathname').should('eq', '/assortments');
    cy.get('h2').should(
      'contain.text',
      localizations.en.assortments_list_header,
    );
  });

  it('Should Navigate to [ASSORTMENTS] page successfully', () => {
    cy.get('tr').should('have.length', 8);
  });

  it('[TOGGLE INACTIVE STATUS] should update route', () => {
    cy.get('button#includeInactive')
      .contains(localizations.en.include_inactive)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: false,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'false',
      });
    });
    cy.get('button#includeInactive')
      .contains(localizations.en.include_inactive)
      .click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'true',
      });
    });
  });

  it('[TOGGLE LEAF STATUS] should update route', () => {
    cy.get('button#includeLeaves')
      .contains(localizations.en.include_leaf)
      .click({ force: true });

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
    cy.get('button#includeLeaves')
      .contains(localizations.en.include_leaf)
      .click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeLeaves: 'false',
      });
    });
  });

  it('Should Navigate to [TANGLE TREE] successfully', () => {
    cy.get('button#viewGraph')
      .contains(localizations.en.display_as_graph)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentChildren)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: true,
          includeLeaves: false,
        });
        expect(response.body).to.deep.eq(AssortmentChildrenResponse);
      },
    );

    cy.get('svg#tangle-tree').should('be.visible');
    cy.get('a#root').should(
      'have.length',
      AssortmentListResponse.data.assortmentsCount,
    );
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        viewGraph: 'true',
      });
    });
  });

  it('[TOGGLE GRAPH STATUS] should update route', () => {
    cy.get('button#viewGraph')
      .contains(localizations.en.display_as_graph)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentChildren)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: true,
          includeLeaves: false,
        });
        expect(response.body).to.deep.eq(AssortmentChildrenResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        viewGraph: 'true',
      });
    });
    cy.get('button#viewGraph')
      .contains(localizations.en.display_as_graph)
      .click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
    });
  });

  it('[TOGGLE INACTIVE STATUS] should update route and assortment paths data', () => {
    cy.get('button#viewGraph')
      .contains(localizations.en.display_as_graph)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentChildren)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: true,
          includeLeaves: false,
        });
        expect(response.body).to.deep.eq(AssortmentChildrenResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        viewGraph: 'true',
      });
    });
    cy.get('button#includeInactive')
      .contains(localizations.en.include_inactive)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentChildren)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          includeInactive: false,
          includeLeaves: false,
        });
        expect(response.body).to.deep.eq(AssortmentChildrenResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'false',
        viewGraph: 'true',
      });
    });
    cy.get('button#includeInactive')
      .contains(localizations.en.include_inactive)
      .click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'true',
        viewGraph: 'true',
      });
    });
  });

  it('Should update data and route when [SEARCHING] accordingly', () => {
    cy.get('input[type="search"]').type('search');

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          queryString: 'search',
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        queryString: 'search',
      });
    });
    cy.get('input[type="search"]').type(' input');

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          queryString: 'search input',
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        queryString: 'search input',
      });
    });
  });

  it('Should update data and route when [ADD TAG] accordingly', () => {
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

  it('Should update data and route when [REMOVE TAG IN ADD TAG] accordingly', () => {
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

  it('Should update data when [SEQUENCING] accordingly', () => {
    const { _id } = SingleAssortmentResponse.data.assortment;
    cy.get(`input#${_id}-sequence`).first().clear().type('50').blur();

    cy.wait(fullAliasMutationName(AssortmentOperation.UpdateAssortment)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortment: {
            sequence: 50,
          },
          assortmentId: _id,
        });
        expect(response.body).to.deep.eq(UpdateAssortmentResponse);
      },
    );

    cy.location('pathname').should('eq', '/assortments');
  });

  it('Should [FILTER] by multiple fields [INACTIVE, LEAFS, TAGS & QUERY STRING]', () => {
    // toggle inactive
    cy.get('button#includeInactive')
      .contains(localizations.en.include_inactive)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: false,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'false',
      });
    });

    // toggle leafs
    cy.get('button#includeLeaves')
      .contains(localizations.en.include_leaf)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: false,
          includeLeaves: true,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'false',
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
          includeInactive: false,
          includeLeaves: true,
          tags: ['new'],
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'false',
        includeLeaves: 'true',
        tags: 'new',
      });
    });

    // search
    cy.get('input[type="search"]').type('search');

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
          includeInactive: false,
          includeLeaves: true,
          tags: ['new'],
          queryString: 'search',
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/assortments');
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        includeInactive: 'false',
        includeLeaves: 'true',
        tags: 'new',
        queryString: 'search',
      });
    });
  });

  it('Should navigate to [SELECTED LOCALE] page successfully', () => {
    const [, deLocale] = LanguagesResponse.data.languages;

    cy.get('select#locale-wrapper').select(deLocale.isoCode);

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          ...assortmentRequestVariables,
        });
        expect(response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.location('pathname').should('eq', '/assortments');
  });

  it('Should Navigate to [NEW ASSORTMENT] form page successfully', () => {
    cy.get('a[href="/assortments/new"]').contains(localizations.en.add).click();
    cy.location('pathname').should('eq', '/assortments/new');
    cy.get('h2').should('contain.text', localizations.en.new_assortment_header);
  });

  it('Should [ADD ASSORTMENT] successfully', () => {
    cy.get('a[href="/assortments/new"]').contains(localizations.en.add).click();
    cy.location('pathname').should('eq', '/assortments/new');
    cy.get('h2').should('contain.text', localizations.en.new_assortment_header);

    cy.get('input#title').type('mobile');
    cy.get('input#tags').type('new');
    cy.get('button#add-tag').contains(localizations.en.add_tag).click();
    cy.get('input#isRoot').check();
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_assortment)
      .click();

    cy.wait(fullAliasMutationName(AssortmentOperation.CreateAssortment)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortment: {
            isRoot: true,
            title: 'mobile',
            tags: ['new'],
          },
        });
        expect(response.body).to.deep.eq(CreateAssortmentResponse);
      },
    );

    cy.location('pathname').should(
      'eq',
      `/assortments?assortmentSlug=${generateUniqueId(
        CreateAssortmentResponse.data.createAssortment,
      )}`,
    );

    cy.wait(fullAliasName(AssortmentOperation.GetSingleAssortment)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentId: CreateAssortmentResponse.data.createAssortment._id,
        });
        expect(response.body).to.deep.eq(SingleAssortmentResponse);
      },
    );

    cy.wait(fullAliasName(AssortmentOperation.GetTranslatedTexts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentId: SingleAssortmentResponse.data.assortment._id,
        });
        expect(response.body).to.deep.eq(TranslatedAssortmentTextsResponse);
      },
    );
  });

  it('Show [ERROR] when required fields are not provided in add assortment', () => {
    cy.get('a[href="/assortments/new"]').contains(localizations.en.add).click();
    cy.location('pathname').should('eq', '/assortments/new');
    cy.get('h2').should('contain.text', localizations.en.new_assortment_header);
    cy.get('input[type="submit"]')
      .contains(localizations.en.add_assortment)
      .click();

    cy.get('label[for="title"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.title,
      ),
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.add_assortment)
      .should('be.disabled');

    cy.location('pathname').should('eq', '/assortments/new');
  });
});
