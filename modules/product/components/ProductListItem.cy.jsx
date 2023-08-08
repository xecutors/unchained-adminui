import React from 'react';
import ProductListItem from './ProductListItem';

describe('<ProductListItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ProductListItem
        product={{
          _id: 'mock',
          texts: { title: 'new products', slug: 'texts-slug' },
          status: 'ACTIVE',
          tags: ['test'],
          sequence: 1,
        }}
      />,
    );
  });
});
