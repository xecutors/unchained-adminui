import React, { useState } from 'react';
import Portal from './Portal';

/**
 * Example component demonstrating Portal usage for dropdowns and modals
 */
const PortalExample: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Portal Examples</h3>

      {/* Dropdown Example */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="btn-primary"
        >
          Toggle Dropdown
        </button>

        {showDropdown && (
          <Portal>
            <div
              className="fixed inset-0 z-50"
              onClick={() => setShowDropdown(false)}
            >
              <div className="absolute top-16 left-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4 min-w-48">
                <div className="text-slate-900 dark:text-slate-100">
                  <p className="font-medium mb-2">Dropdown Content</p>
                  <ul className="space-y-1">
                    <li className="py-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                      Option 1
                    </li>
                    <li className="py-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                      Option 2
                    </li>
                    <li className="py-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                      Option 3
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </div>

      {/* Modal Example */}
      <div className="mb-4">
        <button onClick={() => setShowModal(true)} className="btn-primary">
          Open Modal
        </button>

        {showModal && (
          <Portal className="portal-modal">
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setShowModal(false)}
              />

              {/* Modal content */}
              <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Portal Modal
                  </h4>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="text-slate-700 dark:text-slate-300">
                  <p>
                    This modal is rendered using the Portal component, which
                    places it at the document body level to avoid z-index and
                    overflow issues.
                  </p>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-primary"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </div>
    </div>
  );
};

export default PortalExample;
