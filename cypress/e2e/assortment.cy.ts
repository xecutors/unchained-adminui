import localizations from '../../i18n';
import {
  AssortmentListResponse,
  AssortmentOperation,
} from '../mock/assortment';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

describe('Assortment', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, AssortmentOperation.GetAssortmentList)) {
        aliasQuery(req, AssortmentOperation.GetAssortmentList);
        req.reply(AssortmentListResponse);
      }
    });

    cy.visit('/');
    cy.get('a[href="/assortments"]')
      .contains(localizations.en.assortments)
      .click({ force: true });

    cy.wait(fullAliasName(AssortmentOperation.GetAssortmentList)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          forceLocale: 'en',
          includeInactive: false,
          includeLeaves: false,
          limit: 50,
          offset: 0,
          queryString: '',
          slugs: null,
          sort: [
            {
              key: 'sequence',
              value: 'ASC',
            },
          ],
          tags: null,
        });
        expect(currentSubject.response.body).to.deep.eq(AssortmentListResponse);
      },
    );

    cy.get('h2').should(
      'contain.text',
      localizations.en.assortments_list_header,
    );
  });

  it('Show Navigate to [ASSORTMENTS] page successfully', () => {
    cy.location('pathname').should('eq', '/assortments');
    cy.get('tr').should('have.length', 8);
  });
});
