import React, { useState } from 'react';
import Portal from './Portal';

// Test component that uses Portal
const TestPortalComponent = () => {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <div>
      <button
        data-cy="toggle-portal"
        onClick={() => setShowPortal(!showPortal)}
      >
        Toggle Portal
      </button>

      {showPortal && (
        <Portal>
          <div
            data-cy="portal-content"
            className="fixed top-10 left-10 bg-blue-500 text-white p-4 rounded"
          >
            Portal Content
          </div>
        </Portal>
      )}
    </div>
  );
};

// Test component with custom container
const TestPortalWithContainer = () => {
  const [showPortal, setShowPortal] = useState(false);

  React.useEffect(() => {
    // Create custom container
    const container = document.createElement('div');
    container.id = 'custom-portal-container';
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return (
    <div>
      <button
        data-cy="toggle-custom-portal"
        onClick={() => setShowPortal(!showPortal)}
      >
        Toggle Custom Portal
      </button>

      {showPortal && (
        <Portal container={document.getElementById('custom-portal-container')}>
          <div
            data-cy="custom-portal-content"
            className="bg-green-500 text-white p-4 rounded"
          >
            Custom Portal Content
          </div>
        </Portal>
      )}
    </div>
  );
};

describe('Portal Component', () => {
  it('should render portal content at document body level', () => {
    cy.mount(<TestPortalComponent />);

    // Initially portal content should not exist
    cy.get('[data-cy="portal-content"]').should('not.exist');

    // Click toggle button
    cy.get('[data-cy="toggle-portal"]').click();

    // Portal content should now exist
    cy.get('[data-cy="portal-content"]').should('exist');
    cy.get('[data-cy="portal-content"]').should(
      'contain.text',
      'Portal Content',
    );

    // Portal content should be direct child of body
    cy.get('[data-cy="portal-content"]').should('satisfy', ($el) => {
      return $el.parent().parent().is('body');
    });

    // Toggle off
    cy.get('[data-cy="toggle-portal"]').click();
    cy.get('[data-cy="portal-content"]').should('not.exist');
  });

  it('should render portal content in custom container', () => {
    cy.mount(<TestPortalWithContainer />);

    // Click toggle button
    cy.get('[data-cy="toggle-custom-portal"]').click();

    // Portal content should exist in custom container
    cy.get('[data-cy="custom-portal-content"]').should('exist');
    cy.get('[data-cy="custom-portal-content"]').should(
      'contain.text',
      'Custom Portal Content',
    );

    // Verify it's in the custom container
    cy.get('#custom-portal-container').should('exist');
    cy.get('#custom-portal-container').should(
      'contain',
      '[data-cy="custom-portal-content"]',
    );
  });

  it('should handle multiple portals without conflicts', () => {
    const MultiPortalComponent = () => {
      const [showPortal1, setShowPortal1] = useState(false);
      const [showPortal2, setShowPortal2] = useState(false);

      return (
        <div>
          <button
            data-cy="toggle-portal-1"
            onClick={() => setShowPortal1(!showPortal1)}
          >
            Toggle Portal 1
          </button>
          <button
            data-cy="toggle-portal-2"
            onClick={() => setShowPortal2(!showPortal2)}
          >
            Toggle Portal 2
          </button>

          {showPortal1 && (
            <Portal>
              <div data-cy="portal-1">Portal 1</div>
            </Portal>
          )}

          {showPortal2 && (
            <Portal>
              <div data-cy="portal-2">Portal 2</div>
            </Portal>
          )}
        </div>
      );
    };

    cy.mount(<MultiPortalComponent />);

    // Show both portals
    cy.get('[data-cy="toggle-portal-1"]').click();
    cy.get('[data-cy="toggle-portal-2"]').click();

    // Both should exist
    cy.get('[data-cy="portal-1"]').should('exist');
    cy.get('[data-cy="portal-2"]').should('exist');

    // Hide first portal
    cy.get('[data-cy="toggle-portal-1"]').click();
    cy.get('[data-cy="portal-1"]').should('not.exist');
    cy.get('[data-cy="portal-2"]').should('exist');
  });

  it('should apply custom className to portal container', () => {
    const ClassNamePortalComponent = () => {
      const [showPortal, setShowPortal] = useState(false);

      return (
        <div>
          <button
            data-cy="toggle-class-portal"
            onClick={() => setShowPortal(!showPortal)}
          >
            Toggle Portal
          </button>

          {showPortal && (
            <Portal className="custom-portal-class">
              <div data-cy="class-portal-content">Content</div>
            </Portal>
          )}
        </div>
      );
    };

    cy.mount(<ClassNamePortalComponent />);

    cy.get('[data-cy="toggle-class-portal"]').click();

    // Find the portal container with custom class
    cy.get('.custom-portal-class').should('exist');
    cy.get('.custom-portal-class').should(
      'contain',
      '[data-cy="class-portal-content"]',
    );
  });
});
