import localizations from '../../i18n';
import {
  AllocatedWorkResponse,
  WorkOperations,
  WorkQueueResponse,
} from '../mock/work';
import { aliasQuery, fullAliasName } from '../utils/aliasQuery';
import hasOperationName from '../utils/hasOperationName';

describe('WorkQueue', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (hasOperationName(req, WorkOperations.GetWorkQueue)) {
        aliasQuery(req, WorkOperations.GetWorkQueue);
        req.reply(WorkQueueResponse);
      }
      if (hasOperationName(req, WorkOperations.GetWork)) {
        aliasQuery(req, WorkOperations.GetWork);
        req.reply(AllocatedWorkResponse);
      }
    });
  });

  it('Should return [WORK QUEUE LIST] successfully', () => {
    cy.visit('/');

    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/works"]')
      .contains(localizations.en.work_queue)
      .click({ force: true });
    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
    cy.url().should('contain', '/works');
    cy.get('h2').should('contain', localizations.en.work_queue_header);
    cy.get('tr').should('have.length', 20);
  });

  it('Should  [HAVE, ALLOCATED, NEW, FAILED & SELECTED] checked initially', () => {
    cy.visit('/');

    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/works"]')
      .contains(localizations.en.work_queue)
      .click({ force: true });

    cy.url().should('contain', '/works');
    cy.get('h2').should('contain', localizations.en.work_queue_header);
    cy.get(`input[type="checkbox"][value="ALLOCATED"]`).should('be.checked');
    cy.get(`input[type="checkbox"][value="SUCCESS"]`).should('be.checked');
    cy.get(`input[type="checkbox"][value="NEW"]`).should('be.checked');
    cy.get(`input[type="checkbox"][value="FAILED"]`).should('be.checked');
    cy.get(`input[type="checkbox"][value="DELETED"]`).should('not.be.checked');
  });

  it('Should [FILTER] with selected [STATUS] only [NEW, SUCCESS, FAILED & DELETED]', () => {
    cy.visit('/');

    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/works"]')
      .contains(localizations.en.work_queue)
      .click({ force: true });

    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
    cy.url().should('contain', '/works');
    cy.get('h2').should('contain', localizations.en.work_queue_header);
    cy.get(`input[type="checkbox"][value="ALLOCATED"]`).click();
    cy.get(`input[type="checkbox"][value="SUCCESS"]`).should('be.checked');
    cy.get(`input[type="checkbox"][value="NEW"]`).should('be.checked');
    cy.get(`input[type="checkbox"][value="FAILED"]`).should('be.checked');
    cy.url().should(
      'contains',
      `/works?status=${encodeURIComponent('NEW,SUCCESS,FAILED')}`,
    );
    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          status: ['NEW', 'SUCCESS', 'FAILED'],
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
    cy.get(`input[type="checkbox"][value="DELETED"]`).click();
    cy.url().should(
      'contains',
      `/works?status=${encodeURIComponent('NEW,SUCCESS,FAILED,DELETED')}`,
    );

    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          status: ['NEW', 'SUCCESS', 'FAILED', 'DELETED'],
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
  });

  it('Should [FILTER] with selected [TYPE] only', () => {
    cy.visit('/');
    const { activeWorkTypes } = WorkQueueResponse.data;
    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/works"]')
      .contains(localizations.en.work_queue)
      .click({ force: true });

    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
    cy.url().should('contain', '/works');
    cy.get('h2').should('contain', localizations.en.work_queue_header);
    cy.get('select[id="tag-input"]').select(activeWorkTypes[0]);
    cy.url().should(
      'contains',
      `/works?types=${encodeURIComponent(activeWorkTypes[0])}`,
    );
    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          types: [activeWorkTypes[0]],
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
    cy.get('select[id="tag-input"]').select(activeWorkTypes[1]);
    cy.url().should(
      'contains',
      `/works?types=${encodeURIComponent(
        `${activeWorkTypes[0]},${activeWorkTypes[1]}`,
      )}`,
    );

    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          types: [activeWorkTypes[0], activeWorkTypes[1]],
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
  });

  it('Should [SEARCH] with [QUERY STRING] only', () => {
    cy.visit('/');
    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/works"]')
      .contains(localizations.en.work_queue)
      .click({ force: true });
    cy.url().should('contain', '/works');
    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
  });

  it('Should [FILTER] with multiple fields [TYPE & STATUS] only', () => {
    cy.visit('/');
    const { activeWorkTypes } = WorkQueueResponse.data;
    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/works"]')
      .contains(localizations.en.work_queue)
      .click({ force: true });

    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
    cy.url().should('contain', '/works');
    cy.get('h2').should('contain', localizations.en.work_queue_header);
    cy.get('select[id="tag-input"]').select(activeWorkTypes[0]);
    cy.url().should(
      'contains',
      `/works?types=${encodeURIComponent(activeWorkTypes[0])}`,
    );

    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          types: [activeWorkTypes[0]],
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );

    cy.get(`input[type="checkbox"][value="ALLOCATED"]`).click();
    cy.url().should(
      'contains',
      `/works?types=${activeWorkTypes[0]}&status=${encodeURIComponent(
        'NEW,SUCCESS,FAILED',
      )}`,
    );

    cy.wait(fullAliasName(WorkOperations.GetWorkQueue)).then(
      (currentSubject) => {
        const { request, response } = currentSubject;
        expect(request.body.variables).to.deep.eq({
          queryString: '',
          offset: 0,
          limit: 50,
          created: {},
          types: [activeWorkTypes[0]],
          status: ['NEW', 'SUCCESS', 'FAILED'],
          sort: [],
        });
        expect(response.body).to.deep.eq(WorkQueueResponse);
      },
    );
  });

  it('Should Navigate to [WORK DETAIL] page successfully', () => {
    cy.visit('/');

    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/works"]')
      .contains(localizations.en.work_queue)
      .click({ force: true });

    cy.url().should('contain', '/works');
    cy.get('h2').should('contain', localizations.en.work_queue_header);
    cy.get(`a[href="/works/${AllocatedWorkResponse.data.work._id}"]`)
      .first()
      .click();

    cy.wait(fullAliasName(WorkOperations.GetWork)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        workId: AllocatedWorkResponse.data.work._id,
      });
      expect(response.body).to.deep.eq(AllocatedWorkResponse);
    });

    cy.url().should('contain', `/works/${AllocatedWorkResponse.data.work._id}`);
    cy.get('h2').should('contain', localizations.en.work_detail);
  });

  it('Should Navigate to [WORK DETAIL] page successfully', () => {
    cy.visit('/');

    cy.get('button')
      .contains(localizations.en.activities)
      .click({ force: true });
    cy.get('a[href="/works"]')
      .contains(localizations.en.work_queue)
      .click({ force: true });

    cy.url().should('contain', '/works');
    cy.get('h2').should('contain', localizations.en.work_queue_header);
    cy.get(`a[href="/works/${AllocatedWorkResponse.data.work._id}"]`)
      .first()
      .click();

    cy.wait(fullAliasName(WorkOperations.GetWork)).then((currentSubject) => {
      const { request, response } = currentSubject;
      expect(request.body.variables).to.deep.eq({
        workId: AllocatedWorkResponse.data.work._id,
      });
      expect(response.body).to.deep.eq(AllocatedWorkResponse);
    });

    cy.url().should('contain', `/works/${AllocatedWorkResponse.data.work._id}`);
    cy.get('h2').should('contain', localizations.en.work_detail);
  });
});
