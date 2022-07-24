import localizations from '../../i18n';
import getContent from '../../modules/common/utils/utils';
import {
  AssortmentListResponse,
  AssortmentMediaResponse,
  AssortmentOperation,
  assortmentRequestVariables,
  RemoveAssortmentMediaResponse,
  SingleAssortmentResponse,
  TranslatedAssortmentTextsResponse,
  TranslatedAssortmentMediaTextsResponse,
  UpdateAssortmentMediaTextsResponse,
} from '../mock/assortment';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Assortment Detail Media', () => {
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
      if (hasOperationName(req, AssortmentOperation.AssortmentMedia)) {
        aliasQuery(req, AssortmentOperation.AssortmentMedia);
        req.reply(AssortmentMediaResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetMediaTexts)) {
        aliasQuery(req, AssortmentOperation.GetMediaTexts);
        req.reply(TranslatedAssortmentMediaTextsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.RemoveMedia)) {
        aliasMutation(req, AssortmentOperation.RemoveMedia);
        req.reply(RemoveAssortmentMediaResponse);
      }
      if (hasOperationName(req, AssortmentOperation.UpdateMediaTexts)) {
        aliasMutation(req, AssortmentOperation.UpdateMediaTexts);
        req.reply(UpdateAssortmentMediaTextsResponse);
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

    cy.get('a#media').contains(localizations.en.media).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'media',
      });
    });

    cy.wait(fullAliasName(AssortmentOperation.AssortmentMedia)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slug: null,
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(AssortmentMediaResponse);
      },
    );

    cy.wait(fullAliasName(AssortmentOperation.GetMediaTexts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentMediaId:
            AssortmentMediaResponse.data.assortment.media[0]._id,
        });
        expect(response.body).to.deep.eq(
          TranslatedAssortmentMediaTextsResponse,
        );
      },
    );

    cy.get('select#locale-wrapper').select('en');
  });

  it('Should Navigate to [ASSORTMENT DETAIL MEDIA] tab successfully', () => {
    cy.get('div#media_uploader').should('be.visible');
  });

  it('Should [DELETE] media successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button[type="button"]#delete_button').first().click();
    cy.get('button[type="button"]#danger_continue')
      .contains(localizations.en.delete_assortment_media)
      .click();

    cy.wait(fullAliasMutationName(AssortmentOperation.RemoveMedia)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentMediaId:
            AssortmentMediaResponse.data.assortment.media[0]._id,
        });
        expect(response.body).to.deep.eq(RemoveAssortmentMediaResponse);
      },
    );

    cy.wait(fullAliasName(AssortmentOperation.AssortmentMedia)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          slug: null,
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(AssortmentMediaResponse);
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'media',
      });
    });
  });

  it('Should [CANCEL] delete media successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button[type="button"]#delete_button').first().click();
    cy.get('button[type="button"]#danger_cancel')
      .contains(localizations.en.cancel)
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'media',
      });
    });
  });

  it('Should [UPDATE] media texts successfully', () => {
    const { assortment } = SingleAssortmentResponse.data;
    const { translatedAssortmentMediaTexts: mediaTexts } =
      TranslatedAssortmentMediaTextsResponse.data;

    cy.get('button#edit').first().click();
    cy.get('input#title').clear().type(mediaTexts[0].title);
    cy.get('input#subtitle').clear().type(mediaTexts[0].subtitle);

    cy.get('input[type="submit"]').contains(localizations.en.save).click();

    cy.wait(fullAliasMutationName(AssortmentOperation.UpdateMediaTexts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentMediaId:
            AssortmentMediaResponse.data.assortment.media[0]._id,
          texts: {
            locale: 'en',
            title: mediaTexts[0].title,
            subtitle: mediaTexts[0].title,
          },
        });
        expect(response.body).to.deep.eq(UpdateAssortmentMediaTextsResponse);
      },
    );

    cy.wait(fullAliasName(AssortmentOperation.GetMediaTexts)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentMediaId:
            AssortmentMediaResponse.data.assortment.media[0]._id,
        });
        expect(response.body).to.deep.eq(
          TranslatedAssortmentMediaTextsResponse,
        );
      },
    );

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'media',
      });
    });
  });

  it('Should [CANCEL] in media texts update form', () => {
    const { assortment } = SingleAssortmentResponse.data;

    cy.get('button#edit').first().click();
    cy.get('input#title').clear().type('title');
    cy.get('button[type="button"]#cancel_update')
      .contains(localizations.en.cancel)
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/assortments/${assortment.texts.slug}`);
      expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
        tab: 'media',
      });
    });
  });
});
