import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  ProductFilterRequest,
  ProductListResponse,
  ProductOperations,
  TranslatedProductTextResponse,
  UpdateProductTextsResponse,
} from '../mock/product';
import { aliasMutation } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

describe('Product Text', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, ProductOperations.GetProductList)) {
        aliasQuery(req, ProductOperations.GetProductList);
        req.reply(ProductListResponse);
      }
      if (hasOperationName(req, ProductOperations.GetSingleProduct)) {
        const { body } = req;

        req.reply({
          data: {
            product: ProductListResponse.data.products.find(
              ({ texts: { slug } }) => slug === body.variables.slug,
            ),
          },
        });
      }
      if (hasOperationName(req, ProductOperations.GetTranslatedProductTexts)) {
        aliasMutation(req, ProductOperations.GetTranslatedProductTexts);
        req.reply(TranslatedProductTextResponse);
      }
      if (hasOperationName(req, ProductOperations.UpdateTexts)) {
        aliasMutation(req, ProductOperations.UpdateTexts);
        req.reply(UpdateProductTextsResponse);
      }
    });
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.location('pathname').should('eq', '/products');
    cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq(ProductFilterRequest);
        expect(response.body).to.deep.eq(ProductListResponse);
      },
    );
    cy.get('h2').should('contain.text', localizations.en.products);
  });

  it('Show [INITIALIZE PRODUCT TEXT FORM] successfully', () => {
    const [firstProduct] = ProductListResponse.data.products;
    const [de] = TranslatedProductTextResponse.data.translatedProductTexts;

    cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();
    cy.location('pathname').should(
      'eq',
      `/products/${firstProduct.texts.slug}`,
    );
    cy.get('input#title').should('have.value', de.title);
    cy.get('input#subtitle').should('have.value', de.subtitle);
    cy.get('input#brand').should('have.value', de.brand);
    cy.get('input#vendor').should('have.value', de.vendor);
    cy.get('input#labels').should('have.value', de.labels);
  });
});
