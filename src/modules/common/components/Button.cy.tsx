import React from 'react';
import Button from './Button';

describe('<Button />', () => {
  it('renders', () => {
    cy.mount(<Button text="Button 1" onClick={null} />);
  });
  it('contains the correct text', () => {
    cy.mount(<Button text="Button 1" onClick={null} />);
    cy.get('[type="button"]').should('contain.text', 'Button 1');
  });
  it('trigger click event', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<Button text="Button 1" onClick={onClickSpy} />);
    cy.get('[type="button"]').click();
    cy.get('[type="button"]').click();
    cy.get('@onClickSpy').should('have.been.calledTwice');
  });
  it('not trigger click event when disabled', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<Button text="Button 1" onClick={onClickSpy} disabled />);
    cy.get('[type="button"]').click({ force: true });
    cy.get('@onClickSpy').should('not.have.been.called');
  });
  it('Be disabled', () => {
    cy.mount(<Button text="Button 1" disabled onClick={null} />);
    cy.get('[type="button"]').should('be.disabled');
  });

  it('assign classes successfully', () => {
    cy.mount(<Button text="Button 1" className="new-class" onClick={null} />);
    cy.get('[type="button"]').should('have.class', 'new-class');
  });

  it('assign Id successfully', () => {
    cy.mount(<Button text="Button 1" id="new-class" onClick={null} />);
    cy.get('[type="button"]').should('have.id', 'new-class');
  });
});
