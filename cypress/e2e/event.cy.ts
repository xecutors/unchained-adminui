import localizations from '../../i18n';
import {
  EventOperations,
  EventsListResponse,
  EventsTypeResponse,
  SingleEventResponse,
} from '../mock/event';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

describe('Events ', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, EventOperations.GetEventList)) {
        const { body } = req;
        if (body.variables.types || body.variables.queryString) {
          aliasQuery(req, EventOperations.GetEventList);
        }
        req.reply(EventsListResponse);
      }
      if (hasOperationName(req, EventOperations.GetSingleEvent)) {
        aliasQuery(req, EventOperations.GetSingleEvent);
        req.reply(SingleEventResponse);
      }
      if (hasOperationName(req, EventOperations.GetEventTypes)) {
        req.reply(EventsTypeResponse);
      }
    });
  });

  it('Should display [LIST] of events', () => {
    cy.visit('/');
    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/events"]')
      .contains(localizations.en.event)
      .click({ force: true });

    cy.url().should('contain', '/events');
    cy.get('tr').should('have.length', 8);
  });

  it('Should support [FILTER] multiple type  value', () => {
    const { options: eventTypes } = EventsTypeResponse.data.eventTypes;
    cy.visit('/');
    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/events"]')
      .contains(localizations.en.event)
      .click({ force: true });

    cy.url().should('contain', '/event');
    cy.get('select#tag-input').select(eventTypes[0].value);
    cy.wait(fullAliasName(EventOperations.GetEventList))
      .its('request.body.variables.types')
      .should('include.members', [eventTypes[0].value]);
    cy.url().should('contain', `/events?types=${eventTypes[0].value}`);
    cy.get('select#tag-input').select(eventTypes[1].value);
    cy.wait(fullAliasName(EventOperations.GetEventList))
      .its('request.body.variables.types')
      .should('include.members', [eventTypes[0].value, eventTypes[1].value]);
    cy.url().should(
      'contain',
      `/events?types=${encodeURIComponent(
        `${eventTypes[0].value},${eventTypes[1].value}`,
      )}`,
    );
  });

  it('Should update data and route accordingly when [SEARCHING]', () => {
    cy.visit('/');
    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/events"]')
      .contains(localizations.en.event)
      .click({ force: true });

    cy.url().should('contain', '/events');
    cy.get('input[type="search"]').type('s');

    cy.url().should('contain', '/events?queryString=s');
    cy.wait(fullAliasName(EventOperations.GetEventList))
      .its('request.body.variables.queryString')
      .should('eq', 's');
    cy.get('input[type="search"]').type('a');

    cy.url().should('contain', '/events?queryString=sa');
    cy.wait(fullAliasName(EventOperations.GetEventList))
      .its('request.body.variables.queryString')
      .should('eq', 'sa');
  });

  it('Should support by [SEARCHING] and [TYPE]', () => {
    const { options: eventTypes } = EventsTypeResponse.data.eventTypes;
    cy.visit('/');
    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/events"]')
      .contains(localizations.en.event)
      .click({ force: true });

    cy.url().should('contain', '/events');
    cy.get('select#tag-input').select(eventTypes[0].value);
    cy.get('input[type="search"]').type('s');
    cy.wait(fullAliasName(EventOperations.GetEventList))
      .its('request.body.variables')
      .should('have.any.keys', ['types', 'queryString']);
    cy.url().should(
      'contain',
      `/events?types=${encodeURIComponent(
        `${eventTypes[0].value}`,
      )}&queryString=s`,
    );
  });

  it('Navigate to [EVENT DETAIL] successfully', () => {
    const [firstEvent] = EventsListResponse.data.events;
    cy.visit('/');
    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/events"]')
      .contains(localizations.en.event)
      .click({ force: true });

    cy.url().should('contain', '/events');
    cy.get(`a[href="/events/${firstEvent._id}"]`).click();
    cy.wait(fullAliasName(EventOperations.GetSingleEvent)).then(
      (currentSubject) => {
        expect(currentSubject.request.body.variables).to.deep.eq({
          eventId: firstEvent._id,
        });
        expect(currentSubject.response.body).to.deep.eq(SingleEventResponse);
      },
    );

    cy.url().should('contain', `/events/${firstEvent._id}`);
    cy.get('textarea').should('not.exist');
    cy.contains(localizations.en.payload).click({ multiple: true });
    cy.get('textarea').should('be.visible');
    cy.contains(SingleEventResponse.data.event.type);
    cy.get('textarea').should(
      'contain.value',
      JSON.stringify(SingleEventResponse.data.event.payload, null, 2),
    );
  });
});
