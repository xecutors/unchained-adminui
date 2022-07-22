import localizations from '../../i18n';
import {
  AssortmentListResponse,
  AssortmentOperation,
  assortmentRequestVariables,
  SetBaseAssortmentResponse,
  SingleAssortmentResponse,
  SingleTranslatedAssortmentTextsResponse,
  UpdateAssortmentResponse,
  UpdateAssortmentTextsResponse,
} from '../mock/assortment';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import getContent from '../utils/getContent';
import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Assortment Detail', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, AssortmentOperation.GetAssortmentList)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentList);
        req.reply(AssortmentListResponse);
      }
      if (hasOperationName(req, AssortmentOperation.GetSingleAssortment)) {
        aliasQuery(req, AssortmentOperation.GetSingleAssortment);
        req.reply({
          data: {
            assortment: AssortmentListResponse.data.assortments.find(
              ({ texts }) => texts.slug === req.body.variables.slug,
            ),
          },
        });
      }
      if (
        hasOperationName(req, AssortmentOperation.GetTranslatedAssortmentTexts)
      ) {
        aliasQuery(req, AssortmentOperation.GetTranslatedAssortmentTexts);
        req.reply(SingleTranslatedAssortmentTextsResponse);
      }
      if (hasOperationName(req, AssortmentOperation.UpdateAssortment)) {
        aliasMutation(req, AssortmentOperation.UpdateAssortment);
        req.reply(UpdateAssortmentResponse);
      }
      if (hasOperationName(req, AssortmentOperation.SetBaseAssortment)) {
        aliasMutation(req, AssortmentOperation.SetBaseAssortment);
        req.reply(SetBaseAssortmentResponse);
      }
      if (hasOperationName(req, AssortmentOperation.UpdateAssortmentTexts)) {
        aliasMutation(req, AssortmentOperation.UpdateAssortmentTexts);
        req.reply(UpdateAssortmentTextsResponse);
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

  context('Assortment Detail text', () => {
    beforeEach(() => {
      const { assortment } = SingleAssortmentResponse.data;

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
        expect(response.body).to.deep.eq(
          SingleTranslatedAssortmentTextsResponse,
        );
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
      cy.get('select#locale-wrapper').select('en');
    });

    it('Should Navigate to [ASSORTMENT DETAIL] page successfully', () => {
      cy.location('pathname').should(
        'eq',
        `/assortments/${SingleAssortmentResponse.data.assortment.texts.slug}`,
      );
    });

    it('Should be visible [ADD TAGS] form successfully', () => {
      cy.get('button#add_tag').click();
      cy.get('form#add_tag_form').should('be.visible');
    });

    it('Should [ADD TAGS] successfully', () => {
      const { assortment } = SingleAssortmentResponse.data;

      cy.get('button#add_tag').click();
      cy.get('input#tags').type('new');
      cy.get('button#add-tag').contains(localizations.en.add_tag).click();
      cy.get('form#add_tag_form').within(() => {
        cy.get('input[type="submit"]').contains(localizations.en.save).click();
      });

      cy.wait(fullAliasMutationName(AssortmentOperation.UpdateAssortment)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            assortment: { tags: ['new'] },
            assortmentId: assortment._id,
          });
          expect(currentSubject.response.body).to.deep.eq(
            UpdateAssortmentResponse,
          );
        },
      );
    });

    it('Should cancel [ADD TAGS] form successfully', () => {
      const { assortment } = SingleAssortmentResponse.data;

      cy.get('button#add_tag').click();
      cy.get('button#cancel_update')
        .contains(localizations.en.cancel)
        .click({ force: true });
      cy.location('pathname').should(
        'eq',
        `/assortments/${assortment.texts.slug}`,
      );
    });

    it('Should update data when [SEQUENCING] accordingly', () => {
      const { assortment } = SingleAssortmentResponse.data;

      cy.get('input#sequence').clear().type('50').blur();
      cy.wait(fullAliasMutationName(AssortmentOperation.UpdateAssortment)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            assortment: {
              sequence: 50,
            },
            assortmentId: assortment._id,
          });
          expect(response.body).to.deep.eq(UpdateAssortmentResponse);
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

      cy.location('pathname').should(
        'eq',
        `/assortments/${assortment.texts.slug}`,
      );
    });

    it('Should initialize assortment text form', () => {
      const { assortment } = SingleAssortmentResponse.data;

      cy.get('input#slug').should('have.value', assortment.texts.slug);
      cy.get('input#title').should('have.value', assortment.texts.title);
      cy.get('input#subtitle').should('have.value', assortment.texts.subtitle);
      cy.get('div.ql-editor').within(() => {
        cy.get('p').should('contain.text', assortment.texts.description);
      });

      cy.location('pathname').should(
        'eq',
        `/assortments/${assortment.texts.slug}`,
      );
    });

    it('Should update assortment text form', () => {
      const { assortment } = SingleAssortmentResponse.data;

      cy.get('input#title').clear().type(assortment.texts.title);
      cy.get('input#subtitle').clear().type(assortment.texts.subtitle);
      cy.get('input[type="submit"]').contains(localizations.en.save).click();

      cy.wait(
        fullAliasMutationName(AssortmentOperation.UpdateAssortmentTexts),
      ).then((currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          texts: {
            locale: 'en',
            slug: assortment.texts.slug,
            title: assortment.texts.title,
            subtitle: assortment.texts.subtitle,
            description: assortment.texts.description,
          },
          assortmentId: SingleAssortmentResponse.data.assortment._id,
        });
        expect(response.body).to.deep.eq(UpdateAssortmentTextsResponse);
      });

      cy.location('pathname').should(
        'eq',
        `/assortments/${assortment.texts.slug}`,
      );
    });
  });

  context('Assortment Detail buttons', () => {
    it('Should [MAKE BASE] successfully', () => {
      const assortment = AssortmentListResponse.data.assortments.find(
        ({ _id }) => _id === 'not-base',
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
          expect(response.body).to.deep.eq({
            data: {
              assortment,
            },
          });
        },
      );

      cy.wait(
        fullAliasName(AssortmentOperation.GetTranslatedAssortmentTexts),
      ).then((currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(
          SingleTranslatedAssortmentTextsResponse,
        );
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
      cy.get('select#locale-wrapper').select('en');

      cy.get('button#not_base').contains(localizations.en.not_base).click();
      cy.get('button#alert_ok').contains(localizations.en.mark_as_base).click();

      cy.wait(
        fullAliasMutationName(AssortmentOperation.SetBaseAssortment),
      ).then((currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(SetBaseAssortmentResponse);
      });

      cy.wait(fullAliasName(AssortmentOperation.GetSingleAssortment)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            slug: assortment.texts.slug,
            assortmentId: null,
            forceLocale: 'en',
          });
          expect(response.body).to.deep.eq({
            data: {
              assortment,
            },
          });
        },
      );

      cy.location('pathname').should(
        'eq',
        `/assortments/${assortment.texts.slug}`,
      );
    });

    it('Should [MAKE ROOT] successfully', () => {
      const assortment = AssortmentListResponse.data.assortments.find(
        ({ _id }) => _id === 'not-root',
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
          expect(response.body).to.deep.eq({
            data: {
              assortment,
            },
          });
        },
      );

      cy.wait(
        fullAliasName(AssortmentOperation.GetTranslatedAssortmentTexts),
      ).then((currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(
          SingleTranslatedAssortmentTextsResponse,
        );
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
      cy.get('select#locale-wrapper').select('en');

      cy.get('button#headlessui-listbox-button-14')
        .contains(
          replaceIntlPlaceholder(
            localizations.en.select_options_toggle,
            'Assortment',
            'type',
          ),
        )
        .click({ force: true });
      cy.get('ul li:first').contains(localizations.en.make_root).click();

      cy.wait(fullAliasMutationName(AssortmentOperation.UpdateAssortment)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            assortment: { isRoot: true },
            assortmentId: assortment._id,
          });
          expect(currentSubject.response.body).to.deep.eq(
            UpdateAssortmentResponse,
          );
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
          expect(response.body).to.deep.eq({
            data: {
              assortment,
            },
          });
        },
      );

      cy.location('pathname').should(
        'eq',
        `/assortments/${assortment.texts.slug}`,
      );
    });

    it('Should [ACTIVATE] successfully', () => {
      const assortment = AssortmentListResponse.data.assortments.find(
        ({ _id }) => _id === 'not-active',
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
          expect(response.body).to.deep.eq({
            data: {
              assortment,
            },
          });
        },
      );

      cy.wait(
        fullAliasName(AssortmentOperation.GetTranslatedAssortmentTexts),
      ).then((currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          assortmentId: assortment._id,
        });
        expect(response.body).to.deep.eq(
          SingleTranslatedAssortmentTextsResponse,
        );
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
      cy.get('select#locale-wrapper').select('en');

      cy.get('button#headlessui-listbox-button-16')
        .contains(
          replaceIntlPlaceholder(
            localizations.en.select_options_toggle,
            'Assortment',
            'type',
          ),
        )
        .click({ force: true });
      cy.get('ul li:first').contains(localizations.en.activate).click();

      cy.wait(fullAliasMutationName(AssortmentOperation.UpdateAssortment)).then(
        (currentSubject) => {
          expect(currentSubject.request.body.variables).to.deep.eq({
            assortment: { isActive: true },
            assortmentId: assortment._id,
          });
          expect(currentSubject.response.body).to.deep.eq(
            UpdateAssortmentResponse,
          );
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
          expect(response.body).to.deep.eq({
            data: {
              assortment,
            },
          });
        },
      );

      cy.location('pathname').should(
        'eq',
        `/assortments/${assortment.texts.slug}`,
      );
    });
  });
});
