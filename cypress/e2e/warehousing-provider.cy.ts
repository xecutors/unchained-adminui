import localizations from '../../i18n';

import {
  CreateWarehousingProviderResponse,
  SingleWarehousingProviderResponse,
  WarehousingProviderInterfacesResponse,
  WarehousingProviderOperations,
  WarehousingProvidersListResponse,
  WarehousingProvidersTypeResponse,
} from '../mock/warehousing-provider';

import { aliasMutation, fullAliasMutationName } from '../utils/aliasMutation';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

const ALIASES = {
  GetPickUpWarehousingProviders: 'GetPickUpWarehousingProviders',
  CreateProvider: 'CreateProvider',
};
describe('Warehousing Provider', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      const { body } = req;
      if (
        hasOperationName(req, WarehousingProviderOperations.GetProvidersList)
      ) {
        const { variables } = body;
        if (variables?.type === 'PHYSICAL') {
          aliasQuery(req, ALIASES.GetPickUpWarehousingProviders);
        }
        req.reply(WarehousingProvidersListResponse);
      }
      if (
        hasOperationName(req, WarehousingProviderOperations.GetSingleProvider)
      ) {
        req.reply(SingleWarehousingProviderResponse);
      }
      if (
        hasOperationName(req, WarehousingProviderOperations.GetProvidersType)
      ) {
        req.reply(WarehousingProvidersTypeResponse);
      }
      if (hasOperationName(req, WarehousingProviderOperations.GetInterfaces)) {
        req.reply(WarehousingProviderInterfacesResponse);
      }
    });
  });
  it('Show Navigate to [WAREHOUSING PROVIDERS] page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('tr').should('have.length', 4);
  });

  it('Should [FILTER] list based on selected value', () => {
    const { options } =
      WarehousingProvidersTypeResponse.data.warehousingProviderType;
    const [firstOption] = options;

    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('tr').should('have.length', 4);
    cy.get('select#select-type').contains(localizations.en.filter_by_type);
    cy.get('select#select-type').select(firstOption.value);
    cy.url().should(
      'contain',
      `/warehousing-provider?type=${firstOption.value}`,
    );

    cy.wait(fullAliasName(ALIASES.GetPickUpWarehousingProviders))
      .its('request.body.variables.type')
      .should('eq', firstOption.value);
  });

  it('Show Navigate to [NEW WAREHOUSING PROVIDER] form page successfully', () => {
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('a[href="/warehousing-provider/new"]').click();
    cy.url().should('contain', '/warehousing-provider/new');
  });

  it('Show [ADD NEW WAREHOUSING PROVIDER]  successfully', () => {
    const [firstPickUpInterface] =
      WarehousingProviderInterfacesResponse.data.warehousingInterfaces;
    const { options } =
      WarehousingProvidersTypeResponse.data.warehousingProviderType;
    const [firstType] = options;
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, WarehousingProviderOperations.CreateProvider)) {
        aliasMutation(req, ALIASES.CreateProvider);
        req.reply(CreateWarehousingProviderResponse);
      }
    });
    cy.visit('/');
    cy.get('button').contains(localizations.en.system).click({ force: true });
    cy.get('a[href="/warehousing-provider"]')
      .contains(localizations.en.warehousing_provider)
      .click({ force: true });

    cy.url().should('contain', '/warehousing-provider');
    cy.get('a[href="/warehousing-provider/new"]').click();
    cy.url().should('contain', '/warehousing-provider/new');
    cy.get('select#type').select(firstType.value);
    cy.get('select#adapterKey').select(firstPickUpInterface.value);
    cy.get('input[type="submit"]')
      .contains(localizations.en.create_provider)
      .click();

    cy.url().should(
      'contain',
      `/warehousing-provider/${CreateWarehousingProviderResponse.data.createWarehousingProvider._id}`,
    );

    cy.wait(fullAliasMutationName(ALIASES.CreateProvider)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          warehousingProvider: {
            adapterKey: firstPickUpInterface._id,
            type: firstType.value,
          },
        });
        expect(currentSubject.response.body).to.deep.eq(
          CreateWarehousingProviderResponse,
        );
      },
    );
  });
});
