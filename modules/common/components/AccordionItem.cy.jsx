import React from 'react';
import AccordionItem from './AccordionItem';

describe('<Button />', () => {
  it('renders', () => {
    cy.mount(<AccordionItem name="Header" />);
  });
  it('Not render if name is not provided', () => {
    cy.mount(<AccordionItem className="new-class" />);
    cy.get('div[aria-description]').should('not.exist');
  });
  it('contains the correct text', () => {
    cy.mount(<AccordionItem name="Header" />);
    cy.get('div[aria-description]').should('contain.text', 'Header');
  });
  it('assign the correct class', () => {
    cy.mount(<AccordionItem name="Header" className="new-class" />);
    cy.get('div[aria-description]').should('have.class', 'new-class');
  });
});
