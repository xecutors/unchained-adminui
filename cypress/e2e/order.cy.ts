import localization from '../../i18n/index';

describe('Order', () => {
  it('Show Navigate to [Orders] page successfully', () => {
    cy.visit('/');
    cy.get('a[href="/orders"]')
      .contains(localization.en.orders)
      .click({ force: true });
    cy.url().should('contain', '/orders');
  });
});
