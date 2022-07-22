import localizations from '../../i18n';
import getContent from '../../modules/common/utils/utils';
import {
  AssortmentLinksResponse,
  AssortmentListResponse,
  AssortmentOperation,
  assortmentRequestVariables,
  RemoveAssortmentLinkResponse,
  SearchAssortmentsResponse,
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
      if (
        hasOperationName(req, AssortmentOperation.GetTranslatedAssortmentTexts)
      ) {
        aliasQuery(req, AssortmentOperation.GetTranslatedAssortmentTexts);
        req.reply(SingleTranslatedAssortmentTextsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetAssortmentLinks)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentLinks);
        req.reply(AssortmentLinksResponse);
      }
      if (hasOperationName(req, AssortmentOperation.SearchAssortments)) {
        aliasQuery(req, AssortmentOperation.SearchAssortments);
        req.reply(SearchAssortmentsResponse);
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

    cy.wait(
      fullAliasName(AssortmentOperation.GetTranslatedAssortmentTexts),
    ).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        assortmentId: SingleAssortmentResponse.data.assortment._id,
      });
      expect(response.body).to.deep.eq(SingleTranslatedAssortmentTextsResponse);
    });

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

  xit('Should Navigate to [ASSORTMENT DETAIL LINKS] tab successfully', () => {
    cy.get('form#assortment_link_form').should('be.visible');
  });

  xit('Should [ADD TAG] successfully', () => {
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

  xit('Should [REMOVE TAG] successfully', () => {
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

    cy.get('input#react-select-2-input').clear().type('m');

    cy.wait(fullAliasName(AssortmentOperation.SearchAssortments)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          queryString: 'm',
          forceLocale: 'en',
        });
        expect(response.body).to.deep.eq(SearchAssortmentsResponse);
      },
    );

    cy.get('input#react-select-2-input').clear().type('mo');

    cy.wait(fullAliasName(AssortmentOperation.SearchAssortments)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          queryString: 'mo',
          forceLocale: 'en',
        });
        expect(response.body).to.deep.eq(SearchAssortmentsResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
      });
    });
  });

  xit('Should [ADD ASSORTMENT LINK] successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('input#react-select-2-input').clear().type('m');

    cy.wait(fullAliasName(AssortmentOperation.SearchAssortments)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          limit: 50,
          offset: 0,
          queryString: 'm',
          forceLocale: 'en',
        });
        expect(response.body).to.deep.eq(SearchAssortmentsResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'links',
      });
    });
  });

  xit('Should [ERROR] when required fields are not provided in add sub-assortment link', () => {
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

  xit('should [DELETE] sub-assortment successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button[type="button"]#delete').first().click();
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

  xit('Should [CANCEL DELETE] sub-assortment successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button[type="button"]#delete').first().click();
    cy.get('button[type="button"]#cancel')
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
