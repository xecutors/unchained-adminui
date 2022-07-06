import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  CreateProductResponse,
  ProductListResponse,
  ProductOperations,
  PublishProductResponse,
  SingleProductResponse,
  TranslatedProductTextResponse,
} from '../mock/product';
import hasOperationName from '../utils/hasOperationName';

describe('Product', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
    });
  });
  it('Show Navigate to [PRODUCTS] page successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.GetProductList)) {
        req.reply(ProductListResponse);
      }
    });
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.url().should('contain', '/products');
    cy.get('tr').should('have.length', 20); // 10 visible but duplicate for mobile
  });

  it('Show Navigate to [NEW PRODUCT] form page successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.GetProductList)) {
        req.reply(ProductListResponse);
      }
    });
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.url().should('contain', '/products');
    cy.get('a[href="/products/new"]').click();
    cy.url().should('contain', '/products/new');
  });

  it('Show Navigate to [ADD PRODUCT]  successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.GetProductList)) {
        req.reply(ProductListResponse);
      }
      if (hasOperationName(req, ProductOperations.GetSingleProduct)) {
        req.reply(SingleProductResponse);
      }
      if (hasOperationName(req, ProductOperations.GetTranslatedProductTexts)) {
        req.reply(TranslatedProductTextResponse);
      }
      if (hasOperationName(req, ProductOperations.CreateProduct)) {
        req.reply(CreateProductResponse);
      }
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
    });
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.url().should('contain', '/products');
    cy.get('a[href="/products/new"]').click();
    cy.url().should('contain', '/products/new');
    cy.get('input#title').type('test');
    cy.get('select#type').select('SimpleProduct');
    cy.get('input[name="tags"]').type('test');
    cy.get('button').contains(localizations.en.add_tag).click();
    cy.get('input[type="submit"]').click();
    cy.url().should('contain', '/products/test-1');
    cy.get('.relative.inline-flex.items-center.bg-slate-500').click({
      multiple: true,
    });
    cy.get('li[role="option"]').contains(localizations.en.publish).click();
  });

  it('Show [INITIALIZE PRODUCT TEXT FORM] successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.GetProductList)) {
        req.reply(ProductListResponse);
      }
      if (hasOperationName(req, ProductOperations.GetSingleProduct)) {
        req.reply(SingleProductResponse);
      }
      if (hasOperationName(req, ProductOperations.GetTranslatedProductTexts)) {
        req.reply(TranslatedProductTextResponse);
      }
      if (hasOperationName(req, ProductOperations.PublishProduct)) {
        req.reply(PublishProductResponse);
      }
    });
    const [firstProduct] = ProductListResponse.data.products;
    const [de] = TranslatedProductTextResponse.data.translatedProductTexts;
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();
    cy.url().should('contain', `/products/${firstProduct.texts.slug}`);
    cy.get('input#title').should('have.value', de.title);
    cy.get('input#subtitle').should('have.value', de.subtitle);
    cy.get('input#brand').should('have.value', de.brand);
    cy.get('input#vendor').should('have.value', de.vendor);
    cy.get('input#labels').should('have.value', de.labels);

    cy.get('.relative.inline-flex.items-center.bg-slate-500').click({
      multiple: true,
    });
    cy.get('li[role="option"]').contains(localizations.en.publish).click();
  });
});
