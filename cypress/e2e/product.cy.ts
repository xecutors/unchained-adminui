import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  CreateProductResponse,
  ProductFilterRequest,
  ProductListResponse,
  ProductOperations,
  PublishProductResponse,
  SingleProductResponse,
  TranslatedProductTextResponse,
} from '../mock/product';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';

import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

describe('Product', () => {
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
        req.reply(SingleProductResponse);
      }
      if (hasOperationName(req, ProductOperations.GetTranslatedProductTexts)) {
        req.reply(TranslatedProductTextResponse);
      }
      if (hasOperationName(req, ProductOperations.CreateProduct)) {
        aliasMutation(req, ProductOperations.CreateProduct);
        req.reply(CreateProductResponse);
      }
      if (hasOperationName(req, ProductOperations.UnpublishProduct)) {
        aliasMutation(req, ProductOperations.UnpublishProduct);
        req.reply(PublishProductResponse); // because they both are the same
      }
      if (hasOperationName(req, ProductOperations.PublishProduct)) {
        aliasMutation(req, ProductOperations.PublishProduct);
        req.reply(PublishProductResponse); // because they both are the same
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

  context('List view', () => {
    it('Show Navigate to [PRODUCTS] page successfully', () => {
      cy.get('tr').should('have.length', 20);
    });
    it('should update data and route when [SEARCHING] accordingly', () => {
      cy.get('input[type="search"]').type('search');

      cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            ...ProductFilterRequest,
            queryString: 'search',
          });
          expect(response.body).to.deep.eq(ProductListResponse);
        },
      );
      cy.location().then((current) => {
        expect(current.pathname).to.eq('/products');
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          queryString: 'search',
        });
      });

      cy.get('input[type="search"]').type(' input');
      cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            ...ProductFilterRequest,
            queryString: 'search input',
          });
          expect(response.body).to.deep.eq(ProductListResponse);
        },
      );
      cy.location().then((current) => {
        expect(current.pathname).to.eq('/products');
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          queryString: 'search input',
        });
      });
    });

    it('Should [FILTER by TAG] and update route', () => {
      cy.get('input[id="tag-input"][type="text"]').type('product-tag1');
      cy.get('button[type="button"][id="add-tag"]')
        .should('contain.text', localizations.en.add)
        .click();

      cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            ...ProductFilterRequest,
            tags: ['product-tag1'],
          });
          expect(response.body).to.deep.eq(ProductListResponse);
        },
      );
      cy.location().then((current) => {
        expect(current.pathname).to.eq('/products');
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tags: 'product-tag1',
        });
      });

      cy.get('input[id="tag-input"][type="text"]').type('product-tag2');
      cy.get('button[type="button"][id="add-tag"]')
        .should('contain.text', localizations.en.add)
        .click();
      cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            ...ProductFilterRequest,
            tags: ['product-tag1', 'product-tag2'],
          });
          expect(response.body).to.deep.eq(ProductListResponse);
        },
      );
      cy.location().then((current) => {
        expect(current.pathname).to.eq('/products');
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tags: 'product-tag1,product-tag2',
        });
      });
    });

    it('Should [FILTER by MULTIPLE FIELDS] tags and query string and update route', () => {
      cy.get('input[id="tag-input"][type="text"]').type('product-tag1');

      cy.get('button[type="button"][id="add-tag"]')
        .should('contain.text', localizations.en.add)
        .click();

      cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            ...ProductFilterRequest,
            tags: ['product-tag1'],
          });
          expect(response.body).to.deep.eq(ProductListResponse);
        },
      );
      cy.location().then((current) => {
        expect(current.pathname).to.eq('/products');
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tags: 'product-tag1',
        });
      });

      cy.get('input[type="search"]').type('search input');

      cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            ...ProductFilterRequest,
            tags: ['product-tag1'],
            queryString: 'search input',
          });
          expect(response.body).to.deep.eq(ProductListResponse);
        },
      );
      cy.location().then((current) => {
        expect(current.pathname).to.eq('/products');
        expect(convertURLSearchParamToObj(current.search)).to.deep.eq({
          tags: 'product-tag1',
          queryString: 'search input',
        });
      });
    });
  });

  context('New Product', () => {
    beforeEach(() => {
      cy.get('a[href="/products/new"]')
        .should('contain.text', localizations.en.add)
        .click();
      cy.location('pathname').should('eq', '/products/new');
    });

    it('Show [ADD PRODUCT]  successfully', () => {
      cy.get('input#title').type('test');
      cy.get('select#type').select('SimpleProduct');
      cy.get('input[name="tags"]').type('test');
      cy.get('button').contains(localizations.en.add_tag).click();
      cy.get('input[type="submit"]').click();
      cy.wait(fullAliasMutationName(ProductOperations.CreateProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            product: {
              title: 'test',
              type: 'SimpleProduct',
              tags: ['test'],
            },
          });
          expect(response.body).to.deep.eq(CreateProductResponse);
        },
      );
      cy.url().should('contain', '/products/test-1');
    });

    it('Should [ERROR] when required fields are not provided', () => {
      cy.get('button[type="button"]')
        .contains(localizations.en.add_tag)
        .click();

      cy.get(
        `input[type="submit"][aria-label="${localizations.en.add_product}"]`,
      ).click();
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
      cy.get(
        `input[type="submit"][aria-label="${localizations.en.add_product}"]`,
      ).should('be.disabled');
    });
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

  context('Publish, Draft & Delete', () => {
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
});
