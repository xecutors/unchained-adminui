import localizations from '../../i18n';
import { LanguageOperations, LanguagesResponse } from '../mock/language';
import {
  ACTIVE_PRODUCT_SLUG,
  CreateProductResponse,
  DRAFT_PRODUCT_SLUG,
  ProductFilterRequest,
  ProductListResponse,
  ProductOperations,
  PublishProductResponse,
  RemoveProductResponse,
  TranslatedProductTextResponse,
  UnpublishProductResponse,
  UpdateProductResponse,
} from '../mock/product';
import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import convertURLSearchParamToObj from '../utils/convertURLSearchParamToObj';

import hasOperationName from '../utils/hasOperationName';
import replaceIntlPlaceholder from '../utils/replaceIntlPlaceholder';

const ProductTypes = {
  ConfigurableProduct: 'ConfigurableProduct',
  SimpleProduct: 'SimpleProduct',
  PlanProduct: 'PlanProduct',
  BundleProduct: 'BundleProduct',
};

describe('Product', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      const { body } = req;
      if (hasOperationName(req, LanguageOperations.GetLanguagesList)) {
        req.reply(LanguagesResponse);
      }
      if (hasOperationName(req, ProductOperations.GetProductList)) {
        aliasQuery(req, ProductOperations.GetProductList);
        req.reply(ProductListResponse);
      }
      if (hasOperationName(req, ProductOperations.GetSingleProduct)) {
        req.reply({
          data: {
            product: ProductListResponse.data.products.find(
              ({ texts: { slug } }) => slug === body.variables.slug,
            ),
          },
        });
      }
      if (hasOperationName(req, ProductOperations.GetTranslatedProductTexts)) {
        req.reply(TranslatedProductTextResponse);
      }
      if (hasOperationName(req, ProductOperations.CreateProduct)) {
        const { variables } = body;
        aliasMutation(req, ProductOperations.CreateProduct);
        CreateProductResponse.data.createProduct.__typename =
          ProductTypes[variables.product.type];
        req.reply(CreateProductResponse);
      }
      if (hasOperationName(req, ProductOperations.UnpublishProduct)) {
        aliasMutation(req, ProductOperations.UnpublishProduct);
        req.reply(UnpublishProductResponse);
      }
      if (hasOperationName(req, ProductOperations.PublishProduct)) {
        aliasMutation(req, ProductOperations.PublishProduct);
        req.reply(PublishProductResponse);
      }

      if (hasOperationName(req, ProductOperations.UpdateProduct)) {
        aliasMutation(req, ProductOperations.UpdateProduct);
        req.reply(UpdateProductResponse);
      }
      if (hasOperationName(req, ProductOperations.RemoveProduct)) {
        aliasMutation(req, ProductOperations.RemoveProduct);
        req.reply(RemoveProductResponse);
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

    it('Should update data when [SEQUENCING] accordingly', () => {
      const { _id } = ProductListResponse.data.products[0];
      cy.get(`input#${_id}-sequence`).first().clear().type('50').blur();

      cy.wait(fullAliasMutationName(ProductOperations.UpdateProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            product: {
              sequence: 50,
            },
            productId: _id,
          });
          expect(response.body).to.deep.eq(UpdateProductResponse);
        },
      );

      cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq(ProductFilterRequest);
          expect(response.body).to.deep.eq(ProductListResponse);
        },
      );

      cy.location('pathname').should('eq', '/products');
    });

    it('[TOGGLE DRAFT STATUS] should update route', () => {
      cy.get('button#includeDrafts')
        .contains(localizations.en.include_drafts)
        .click({ force: true });

      cy.wait(fullAliasName(ProductOperations.GetProductList)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            ...ProductFilterRequest,
            includeDrafts: true,
          });
          expect(response.body).to.deep.eq(ProductListResponse);
        },
      );

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/products');
        expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
          includeDrafts: 'true',
        });
      });
      cy.get('button#includeDrafts')
        .contains(localizations.en.include_drafts)
        .click({ force: true });
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/products');
        expect(convertURLSearchParamToObj(loc.search)).to.deep.eq({
          includeDrafts: 'false',
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

    it('Show [ADD PRODUCT]  successfully [SimpleProduct]', () => {
      cy.get('input#title').type('test');
      cy.get('select#type').select(ProductTypes.SimpleProduct);
      cy.get('input[name="tags"]').type('test');
      cy.get('button').contains(localizations.en.add_tag).click();
      cy.get('input[type="submit"]').click();
      cy.wait(fullAliasMutationName(ProductOperations.CreateProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            product: {
              title: 'test',
              type: ProductTypes.SimpleProduct,
              tags: ['test'],
            },
          });
          expect(response.body).to.deep.eq({
            ...CreateProductResponse,
            data: {
              ...CreateProductResponse.data,
              createProduct: {
                ...CreateProductResponse.data.createProduct,
                __typename: ProductTypes.SimpleProduct,
              },
            },
          });
        },
      );
      cy.location('pathname').should(
        'eq',
        `/products/${CreateProductResponse.data.createProduct.texts.slug}`,
      );
    });

    it('Show [ADD PRODUCT]  successfully [BundleProduct]', () => {
      cy.get('input#title').type('test');
      cy.get('select#type').select(ProductTypes.BundleProduct);
      cy.get('input[name="tags"]').type('test');
      cy.get('button').contains(localizations.en.add_tag).click();
      cy.get('input[type="submit"]').click();
      cy.wait(fullAliasMutationName(ProductOperations.CreateProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            product: {
              title: 'test',
              type: ProductTypes.BundleProduct,
              tags: ['test'],
            },
          });
          expect(response.body).to.deep.eq({
            ...CreateProductResponse,
            data: {
              ...CreateProductResponse.data,
              createProduct: {
                ...CreateProductResponse.data.createProduct,
                __typename: ProductTypes.BundleProduct,
              },
            },
          });
        },
      );
      cy.location('pathname').should(
        'eq',
        `/products/${CreateProductResponse.data.createProduct.texts.slug}`,
      );
    });

    it('Show [ADD PRODUCT]  successfully [ConfigurableProduct]', () => {
      cy.get('input#title').type('test');
      cy.get('select#type').select(ProductTypes.ConfigurableProduct);
      cy.get('input[name="tags"]').type('test');
      cy.get('button').contains(localizations.en.add_tag).click();
      cy.get('input[type="submit"]').click();
      cy.wait(fullAliasMutationName(ProductOperations.CreateProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            product: {
              title: 'test',
              type: ProductTypes.ConfigurableProduct,
              tags: ['test'],
            },
          });
          expect(response.body).to.deep.eq({
            ...CreateProductResponse,
            data: {
              ...CreateProductResponse.data,
              createProduct: {
                ...CreateProductResponse.data.createProduct,
                __typename: ProductTypes.ConfigurableProduct,
              },
            },
          });
        },
      );
      cy.location('pathname').should(
        'eq',
        `/products/${CreateProductResponse.data.createProduct.texts.slug}`,
      );
    });

    it('Show [ADD PRODUCT]  successfully [PlanProduct]', () => {
      cy.get('input#title').type('test');
      cy.get('select#type').select(ProductTypes.PlanProduct);
      cy.get('input[name="tags"]').type('test');
      cy.get('button').contains(localizations.en.add_tag).click();
      cy.get('input[type="submit"]').click();
      cy.wait(fullAliasMutationName(ProductOperations.CreateProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            product: {
              title: 'test',
              type: ProductTypes.PlanProduct,
              tags: ['test'],
            },
          });
          expect(response.body).to.deep.eq({
            ...CreateProductResponse,
            data: {
              ...CreateProductResponse.data,
              createProduct: {
                ...CreateProductResponse.data.createProduct,
                __typename: ProductTypes.PlanProduct,
              },
            },
          });
        },
      );
      cy.location('pathname').should(
        'eq',
        `/products/${CreateProductResponse.data.createProduct.texts.slug}`,
      );
    });

    it('Should [ERROR] when required fields are not provided', () => {
      cy.get('button[type="button"]')
        .contains(localizations.en.add_tag)
        .click();

      cy.get(
        `input[type="submit"][aria-label="${localizations.en.add_product}"]`,
      )
        .should('have.value', localizations.en.add_product)
        .click();
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
      )
        .should('have.value', localizations.en.add_product)
        .should('be.disabled');
    });
  });

  context('Publish, Draft & Delete', () => {
    it('[PUBLISH] product successfully', () => {
      const [firstProduct] = ProductListResponse.data.products.filter(
        ({ texts: { slug } }) => slug === DRAFT_PRODUCT_SLUG,
      );
      cy.get(`a[href="/products/${DRAFT_PRODUCT_SLUG}"]`).first().click();
      cy.get('.relative.inline-flex.items-center.bg-slate-500').click({
        multiple: true,
      });
      cy.get('li[role="option"]').contains(localizations.en.publish).click();
      cy.wait(fullAliasMutationName(ProductOperations.PublishProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            productId: firstProduct._id,
          });
          expect(response.body).to.deep.eq(PublishProductResponse);
        },
      );
    });

    it('Delete product button should be visible for unpublished/draft product', () => {
      cy.get(`a[href="/products/${DRAFT_PRODUCT_SLUG}"]`).first().click();
      cy.get(
        'button.my-auto.flex.items-center.justify-center.rounded.border-2.border-red-600.px-3.py-2',
      )
        .contains(localizations.en.delete)
        .should('be.visible');
    });

    it('Delete product button should [NOT] be visible for published product', () => {
      cy.get(`a[href="/products/${ACTIVE_PRODUCT_SLUG}"]`).click();
      cy.get(
        'button.my-auto.flex.items-center.justify-center.rounded.border-2.border-red-600.px-3.py-2',
      ).should('not.exist');
    });

    it('[UNPUBLISH] product successfully', () => {
      const [firstProduct] = ProductListResponse.data.products.filter(
        ({ texts: { slug } }) => slug === ACTIVE_PRODUCT_SLUG,
      );
      cy.get(`a[href="/products/${ACTIVE_PRODUCT_SLUG}"]`).first().click();
      cy.get('button#headlessui-listbox-button-14').click({
        multiple: true,
      });
      cy.get('li[role="option"]').contains(localizations.en.draft).click();

      cy.wait(fullAliasMutationName(ProductOperations.UnpublishProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            productId: firstProduct._id,
          });
          expect(response.body).to.deep.eq(UnpublishProductResponse);
        },
      );
    });

    it('[DELETE] product successfully', () => {
      const [firstProduct] = ProductListResponse.data.products.filter(
        ({ texts: { slug } }) => slug === DRAFT_PRODUCT_SLUG,
      );

      cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();
      cy.get(
        'button.my-auto.flex.items-center.justify-center.rounded.border-2.border-red-600.px-3.py-2',
      ).click();

      cy.get('button#danger_continue')
        .should('contain.text', localizations.en.continue)
        .click();
      cy.wait(fullAliasMutationName(ProductOperations.RemoveProduct)).then(
        (currentSubject) => {
          const { request, response } = currentSubject;
          expect(request.body.variables).to.deep.eq({
            productId: firstProduct._id,
          });
          expect(response.body).to.deep.eq(RemoveProductResponse);
        },
      );

      cy.location('pathname').should('eq', '/products');
    });

    it('Cancel [DELETE] product when cancel is clicked', () => {
      const [firstProduct] = ProductListResponse.data.products.filter(
        ({ texts: { slug } }) => slug === DRAFT_PRODUCT_SLUG,
      );

      cy.get(`a[href="/products/${firstProduct.texts.slug}"]`).first().click();
      cy.get(
        'button.my-auto.flex.items-center.justify-center.rounded.border-2.border-red-600.px-3.py-2',
      ).click();

      cy.get('button#danger_cancel')
        .should('contain.text', localizations.en.cancel)
        .click();
    });
  });
});
