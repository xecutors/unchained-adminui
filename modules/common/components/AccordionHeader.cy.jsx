import React from 'react';
import AccordionHeader from './AccordionHeader';

describe('<Button />', () => {
  it('renders', () => {
    cy.mount(<AccordionHeader name="Header" />);
  });
  it('Not render if name is not provided', () => {
    cy.mount(<AccordionHeader className="new-class" />);
    cy.get('div[aria-description]').should('not.exist');
  });
  it('contains the correct text', () => {
    cy.mount(<AccordionHeader name="Header" />);
    cy.get('div[aria-description]').should('contain.text', 'Header');
  });
  it('assign the correct class', () => {
    cy.mount(<AccordionHeader name="Header" className="new-class" />);
    cy.get('div[aria-description]').should('have.class', 'new-class');
  });
});
