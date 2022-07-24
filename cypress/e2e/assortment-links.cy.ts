import localizations from '../../i18n';
import getContent from '../../modules/common/utils/utils';
import {
  AddAssortmentLinkResponse,
  AssortmentLinksResponse,
  AssortmentListResponse,
  AssortmentOperation,
  assortmentRequestVariables,
  RemoveAssortmentLinkResponse,
  SearchAssortmentsResponse,
  SingleAssortmentResponse,
  TranslatedAssortmentTextsResponse,
} from '../mock/assortment';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Assortment Detail Links', () => {
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
      if (hasOperationName(req, AssortmentOperation.GetTranslatedTexts)) {
        aliasQuery(req, AssortmentOperation.GetTranslatedTexts);
        req.reply(TranslatedAssortmentTextsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetAssortmentLinks)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentLinks);
        req.reply(AssortmentLinksResponse);
      }
      if (hasOperationName(req, AssortmentOperation.SearchAssortments)) {
        aliasQuery(req, AssortmentOperation.SearchAssortments);
        req.reply(SearchAssortmentsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.AddAssortmentLink)) {
        aliasMutation(req, AssortmentOperation.AddAssortmentLink);
        req.reply(AddAssortmentLinkResponse);
      }
      if (hasOperationName(req, AssortmentOperation.RemoveAssortmentLink)) {
        aliasMutation(req, AssortmentOperation.RemoveAssortmentLink);
        req.reply(RemoveAssortmentLinkResponse);
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
        expect(response.body).to.deep.eq(TranslatedAssortmentTextsResponse);
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

    cy.get('a#links').contains(localizations.en.links).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
      });
    });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentLinks)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slug: null,
          forceLocale: 'en',
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(AssortmentLinksResponse);
      },
    );
  });

  it('Should Navigate to [ASSORTMENT DETAIL LINKS] tab successfully', () => {
    cy.get('form#assortment_link_form').should('be.visible');
    cy.get('div[draggable="true"]').should('have.length', 3);
  });

  it('Should [ADD TAG] successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#tags').clear().type('new');
    cy.get('button#add-tag').contains(localizations.en.add_tag).click();
    cy.get('span#badge').should('contain.text', 'new');

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
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
        tab: 'links',
      });
    });
  });

  it('Should [SEARCH] assortment successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#react-select-2-input').clear().type('s');

    cy.wait(fullAliasName(AssortmentOperation.SearchAssortments)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          queryString: 's',
          forceLocale: 'en',
        });
        expect(response.body).to.deep.eq(SearchAssortmentsResponse);
      },
    );

    cy.get('div#react-select-2-listbox div:first').within(() => {
      cy.get('div').should('have.length', 1);
    });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
      });
    });
  });

  it('Should [ADD ASSORTMENT LINK] successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;
    const { assortments } = SearchAssortmentsResponse.data.searchAssortments;

    cy.get('input#react-select-2-input').clear().type('s');

    cy.wait(fullAliasName(AssortmentOperation.SearchAssortments)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          queryString: 's',
          forceLocale: 'en',
        });
        expect(response.body).to.deep.eq(SearchAssortmentsResponse);
      },
    );

    cy.get('div#react-select-2-listbox div:first').within(() => {
      cy.get('div').first().click();
    });
    cy.get('input[type="submit"]').contains(localizations.en.save).click();

    cy.wait(fullAliasMutationName(AssortmentOperation.AddAssortmentLink)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          parentAssortmentId: assortment._id,
          childAssortmentId: assortments[0]._id,
          tags: [],
        });
        expect(response.body).to.deep.eq(AddAssortmentLinkResponse);
      },
    );

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

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentLinks)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slug: null,
          forceLocale: 'en',
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(AssortmentLinksResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
      });
    });
  });

  it('Should [ERROR] when required fields are not provided in add sub-assortment link', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#react-select-2-input').clear();
    cy.get('input[type="submit"]').contains(localizations.en.save).click();

    cy.get('label[for="childAssortmentId"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.child_assortment,
      ),
    );

    cy.get('input[type="submit"]')
      .contains(localizations.en.save)
      .should('be.disabled');

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
      });
    });
  });

  it('should [DELETE] sub-assortment successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button[type="button"]#delete_button').first().click();
    cy.get('button[type="button"]#danger_continue')
      .contains(localizations.en.delete_link)
      .click();

    cy.wait(
      fullAliasMutationName(AssortmentOperation.RemoveAssortmentLink),
    ).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        assortmentLinkId: '7336cc61081c8b0e770dca64',
      });
      expect(response.body).to.deep.eq(RemoveAssortmentLinkResponse);
    });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentLinks)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slug: null,
          forceLocale: 'en',
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(AssortmentLinksResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
      });
    });
  });

  it('Should [CANCEL DELETE] sub-assortment successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button[type="button"]#delete_button').first().click();
    cy.get('button[type="button"]#danger_cancel')
      .contains(localizations.en.cancel)
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
      });
    });
  });
});
