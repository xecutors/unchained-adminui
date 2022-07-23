import localizations from '../../i18n';
import getContent from '../../modules/common/utils/utils';
import {
  AssortmentListResponse,
  AssortmentOperation,
  AssortmentProductsResponse,
  assortmentRequestVariables,
  RemoveAssortmentProductResponse,
  SearchProductsResponse,
  SingleAssortmentResponse,
  SingleTranslatedAssortmentTextsResponse,
} from '../mock/assortment';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Assortment Detail', () => {
  beforeEach(() => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, AssortmentOperation.GetAssortmentList)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentList);
        req.reply(AssortmentListResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetSingleAssortment)) {
        aliasQuery(req, AssortmentOperation.GetSingleAssortment);
        req.reply(SingleAssortmentResponse);
      }
      if (hasOperationName(req, AssortmentOperation.AssortmentProducts)) {
        aliasQuery(req, AssortmentOperation.AssortmentProducts);
        req.reply(AssortmentProductsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetTranslatedTexts)) {
        aliasQuery(req, AssortmentOperation.GetTranslatedTexts);
        req.reply(SingleTranslatedAssortmentTextsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.SearchProducts)) {
        aliasQuery(req, AssortmentOperation.SearchProducts);
        req.reply(SearchProductsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.RemoveProduct)) {
        aliasMutation(req, AssortmentOperation.RemoveProduct);
        req.reply(RemoveAssortmentProductResponse);
      }
    });

    cy.viewport(1200, 800);
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

    cy.get(`a[href="/assortments/${assortment.texts.slug}"]`)
      .contains(assortment?.texts?.title)
      .click();

    cy.wait(fullAliasName(AssortmentOperation.GetSingleAssortment)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slug: assortment.texts.slug,
          assortmentId: null,
          forceLocale: 'en',
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
        expect(response.body).to.deep.eq(
          SingleTranslatedAssortmentTextsResponse,
        );
      },
    );

    cy.location('pathname').should(
      'eq',
      `/assortments/${assortment.texts.slug}`,
    );
    cy.get('h2').within(() => {
      cy.get('span').should(
        'contain.text',
        getContent(
          replaceIntlPlaceholder(
            localizations.en.assortment_detail_header,
            assortment._id,
            'id',
          ),
        ),
      );
    });

    cy.get('a#products').contains(localizations.en.products).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'products',
      });
    });

    cy.wait(fullAliasName(AssortmentOperation.AssortmentProducts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slug: null,
          forceLocale: 'en',
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(AssortmentProductsResponse);
      },
    );
  });

  it('Should [ADD TAG] successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#tags').clear().type('new');
    cy.get('button#add-tag').contains(localizations.en.add_tag).click();
    cy.get('span#badge').should('contain.text', 'new');

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'products',
      });
    });
  });

  it('Should [REMOVE TAG] successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#tags').clear().type('new');
    cy.get('button#add-tag').contains(localizations.en.add_tag).click();
    cy.get('span#badge').within(() => {
      cy.get('button#badge-x-button').click();
    });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'products',
      });
    });
  });

  it('Should [SEARCH] product successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#react-select-2-input').clear().type('m');

    cy.wait(fullAliasName(AssortmentOperation.SearchProducts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 10,
          offset: 0,
          includeInactive: true,
          queryString: 'm',
          filterQuery: [],
          assortmentId: null,
          orderBy: null,
          ignoreChildAssortments: false,
          forceLocale: 'en',
        });
        expect(response.body).to.deep.eq(SearchProductsResponse);
      },
    );

    cy.get('input#react-select-2-input').clear().type('mo');

    cy.wait(fullAliasName(AssortmentOperation.SearchProducts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 10,
          offset: 0,
          includeInactive: true,
          queryString: 'mo',
          filterQuery: [],
          assortmentId: null,
          orderBy: null,
          ignoreChildAssortments: false,
          forceLocale: 'en',
        });
        expect(response.body).to.deep.eq(SearchProductsResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'products',
      });
    });
  });

  it('Should [ADD PRODUCT] successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#react-select-2-input').clear().type('m');

    cy.wait(fullAliasName(AssortmentOperation.SearchProducts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 10,
          offset: 0,
          includeInactive: true,
          queryString: 'm',
          filterQuery: [],
          assortmentId: null,
          orderBy: null,
          ignoreChildAssortments: false,
          forceLocale: 'en',
        });
        expect(response.body).to.deep.eq(SearchProductsResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'products',
      });
    });
  });

  it('Should [ERROR] when required fields are not provided in add product', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#react-select-2-input').clear();
    cy.get('input[type="submit"]').contains(localizations.en.save).click();

    cy.get('label[for="productId"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.product,
      ),
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.save)
      .should('be.disabled');

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'products',
      });
    });
  });

  it('should [DELETE] product successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button[type="button"]#delete_button').first().click();
    cy.get('button[type="button"]#danger_continue')
      .contains(localizations.en.delete_product)
      .click();

    cy.wait(fullAliasMutationName(AssortmentOperation.RemoveProduct)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentProductId: 'fee3ae6e702679cde6f0f1aa',
        });
        expect(response.body).to.deep.eq(RemoveAssortmentProductResponse);
      },
    );

    cy.wait(fullAliasName(AssortmentOperation.AssortmentProducts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slug: null,
          forceLocale: 'en',
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(AssortmentProductsResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'products',
      });
    });
  });

  it('Should [CANCEL DELETE] product successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button[type="button"]#delete_button').first().click();
    cy.get('button[type="button"]#danger_cancel')
      .contains(localizations.en.cancel)
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'products',
      });
    });
  });
});
