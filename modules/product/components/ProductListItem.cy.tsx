import React from 'react';
import ProductListItem from './ProductListItem';
const MOCK_PRODUCT = {
  _id: 'mock',
  texts: { title: 'new products', slug: 'texts-slug' },
  status: 'ACTIVE',
  tags: ['test'],
  sequence: 1,
};
describe('<ProductListItem />', () => {
  it('renders', () => {
    cy.mount(<ProductListItem showAvatar={false} product={MOCK_PRODUCT} />);
    cy.get('.flex.items-center').should('be.visible');
    cy.get('.text-blue-600').should('be.visible');
    cy.get('.whitespace-nowrap').should('be.visible');
    cy.get('input[type="number"]').should('be.visible');
  });
});
