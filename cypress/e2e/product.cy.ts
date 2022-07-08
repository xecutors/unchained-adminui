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
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Product', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, ProductOperations.GetProductList)) {
        req.reply(ProductListResponse);
      }
      if (hasOperationName(req, ProductOperations.GetSingleProduct)) {
        req.reply(SingleProductResponse);
      }
      if (hasOperationName(req, ProductOperations.GetTranslatedProductTexts)) {
        req.reply(TranslatedProductTextResponse);
      }
    });
  });

  it('Show Navigate to [PRODUCTS] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.url().should('contain', '/products');
    cy.get('tr').should('have.length', 20); // 10 visible but duplicate for mobile
  });

  it('Show Navigate to [NEW PRODUCT] form page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.url().should('contain', '/products');
    cy.get('a[href="/products/new"]').click();
    cy.url().should('contain', '/products/new');
  });

  it('Show [ADD PRODUCT]  successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.CreateProduct)) {
        const { body } = req;
        expect(body.variables).to.deep.eq({
          product: {
            title: 'test',
            type: 'SimpleProduct',
            tags: ['test'],
          },
        });

        req.reply(CreateProductResponse);
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
  });

  it('Should [ERROR] when required fields are not provided', () => {
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.url().should('contain', '/products');
    cy.get('a[href="/products/new"]').click();
    cy.url().should('contain', '/products/new');
    cy.get('button').contains(localizations.en.add_tag).click();

    cy.get('input[type="submit"]').click();
    cy.get('label[for="type"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.type,
      ),
    );
    cy.get('label[for="title"]').should(
      'contain.text',
      replaceIntlPlaceholder(
        localizations.en.error_required,
        localizations.en.name,
      ),
    );
  });

  it('Show [INITIALIZE PRODUCT TEXT FORM] successfully', () => {
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
  });

  it('[PUBLISH] product successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.GetSingleProduct)) {
        req.reply({
          ...SingleProductResponse,
          data: {
            ...SingleProductResponse.data,
            product: {
              ...SingleProductResponse.data.product,
              status: 'DRAFT',
              published: null,
            },
          },
        });
      }

      if (hasOperationName(req, ProductOperations.PublishProduct)) {
        const { body } = req;
        expect(body.variables).to.haveOwnProperty('productId');
        req.reply(PublishProductResponse);
      }
    });

    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)

      .click({ force: true });

    const [firstProduct] = ProductListResponse.data.products;

    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();

    cy.get('.relative.inline-flex.items-center.bg-slate-500').click({
      multiple: true,
    });
    cy.get('li[role="option"]').contains(localizations.en.publish).click();
  });

  it('Delete product button should be visible for unpublished/draft product', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.GetSingleProduct)) {
        req.reply({
          ...SingleProductResponse,
          data: {
            ...SingleProductResponse.data,
            product: {
              ...SingleProductResponse.data.product,
              published: null,
              status: 'DRAFT',
            },
          },
        });
      }
    });

    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)

      .click({ force: true });

    const [firstProduct] = ProductListResponse.data.products;

    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();
    cy.get(
      'button.my-auto.flex.items-center.justify-center.rounded.border-2.border-red-600.px-3.py-2',
    )
      .contains(localizations.en.delete)
      .should('be.visible');
  });

  it('Delete product button should [NOT] be visible for published product', () => {
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)

      .click({ force: true });

    const [firstProduct] = ProductListResponse.data.products;

    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });

    cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();
    cy.get(
      'button.my-auto.flex.items-center.justify-center.rounded.border-2.border-red-600.px-3.py-2',
    ).should('not.exist');
  });

  it('[UNPUBLISH] product successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.UnpublishProduct)) {
        const { body } = req;
        expect(body.variables).to.haveOwnProperty('productId');
        req.reply(PublishProductResponse); // because they both are the same
      }
    });
    const [firstProduct] = ProductListResponse.data.products;
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });
    cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();
    cy.get('button#headlessui-listbox-button-14').click({
      multiple: true,
    });
    cy.get('li[role="option"]').contains(localizations.en.draft).click();
  });

  it('[UNPUBLISH] product successfully', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, ProductOperations.GetSingleProduct)) {
        req.reply({
          ...SingleProductResponse,
          data: {
            ...SingleProductResponse.data,
            product: {
              ...SingleProductResponse.data.product,
              published: null,
              status: 'DRAFT',
            },
          },
        });
      }
      if (hasOperationName(req, ProductOperations.UnpublishProduct)) {
        const { body } = req;
        expect(body.variables).to.haveOwnProperty('productId');
        req.reply(PublishProductResponse); // because they both are the same
      }
    });
    const [firstProduct] = ProductListResponse.data.products;
    cy.visit('/');
    cy.get('a[href="/products"]')
      .contains(localizations.en.products)
      .click({ force: true });
    cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();
    cy.get('.relative.inline-flex.items-center.bg-slate-500').click({
      multiple: true,
    });
    cy.get('li[role="option"]').contains(localizations.en.draft).click();
  });
});
