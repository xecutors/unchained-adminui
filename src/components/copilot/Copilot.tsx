import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useIntl } from 'react-intl';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';
import { useChatContext } from '../../modules/chat';
import { MessageRenderer, LoadingIndicator } from '../chat';
import CopilotHeader from './CopilotHeader';
import CopilotInput from './CopilotInput';
import ToolGrid from './ToolGrid';
import { useChatEndpointChecker } from '../../modules/common/hooks/useChatEndpointChecker';
import { useAvailableTools } from '../../modules/chat/hooks/useAvailableTools';

const Copilot: React.FC = () => {
  const { formatMessage } = useIntl();
  const chatContext = useChatContext();
  const { messages, status, reload, append } = chatContext;
  const { chatEnabled } = useChatEndpointChecker();
  const { currentUser } = useCurrentUser();
  const {
    groupedTools,
    loading: toolsLoading,
    error: toolsError,
    lastUpdated,
  } = useAvailableTools();
  const bottomRef = useRef<HTMLDivElement>(null);
  const loading = status !== 'ready' && status !== 'error';
  const [showTools, setShowTools] = useState(false);
  const hasInitialized = useRef(false);

  // Auto-send introduction message when copilot opens
  useEffect(() => {
    // Only check when chat is ready and enabled
    if (status !== 'ready' || !chatEnabled) return;

    // Check if we already have messages
    if (messages.length > 0) return;

    // Check if we've already initialized
    if (hasInitialized.current) return;

    hasInitialized.current = true;

    // Use append directly instead of simulating form submission
    const introMessage =
      'Hello! Please introduce yourself and explain what you can help me with in managing my Unchained Commerce store. Be friendly and informative about your current capabilities.';

    const timer = setTimeout(async () => {
      try {
        await append({
          id: `intro-${Date.now()}`,
          role: 'user',
          content: introMessage,
        });
      } catch (error) {
        console.error('Failed to append introduction:', error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [status, chatEnabled, messages.length, append]);

  useLayoutEffect(() => {
    const el = bottomRef.current;
    if (!el || messages.length === 0) return;

    el.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);
  if (!chatEnabled) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-rose-900 dark:text-rose-200 sm:text-5xl">
              {formatMessage({
                id: 'chat_disabled_title',
                defaultMessage: 'Chat is Disabled',
              })}
            </h1>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-200">
              {formatMessage({
                id: 'chat_disabled_message',
                defaultMessage:
                  'Copilot chat is currently disabled in this shop. Please check your engine configuration',
              })}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <CopilotHeader />
      <main className="flex-1 overflow-y-auto py-6 space-y-4 max-w-4xl mx-auto w-full px-4">
        {(() => {
          let visibleMessageIndex = 0;
          return messages?.map((message, index) => {
            // Skip empty assistant messages (these might be loading placeholders)
            if (
              message.role === 'assistant' &&
              (!message.parts ||
                message.parts.length === 0 ||
                (message.parts.length === 1 &&
                  message.parts[0].type === 'text' &&
                  !message.parts[0].text))
            ) {
              return null;
            }

            // Hide the auto-introduction prompt from user
            if (
              message.role === 'user' &&
              (message?.content?.includes('Give a brief introduction') ||
                message?.content?.includes(
                  'Introduce yourself and your tools',
                ) ||
                message?.content?.includes(
                  'Please introduce yourself and explain',
                ))
            ) {
              return null;
            }

            // This is a visible message
            const isFirstVisibleMessage = visibleMessageIndex === 0;
            visibleMessageIndex++;

            return (
              <React.Fragment key={message.id}>
                <MessageRenderer message={message} user={currentUser} />
                {/* Show tools button after the first visible message */}
                {isFirstVisibleMessage && !loading && (
                  <div className="py-4">
                    <div>
                      {/* Tools toggle button */}
                      <div className="mb-6">
                        <button
                          onClick={() => setShowTools(!showTools)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          {showTools ? (
                            <>
                              <ChevronUpIcon className="w-4 h-4" />
                              {formatMessage({
                                id: 'hide_capabilities',
                                defaultMessage: 'Hide Available Tools',
                              })}
                            </>
                          ) : (
                            <>
                              <ChevronDownIcon className="w-4 h-4" />
                              {formatMessage({
                                id: 'show_capabilities',
                                defaultMessage: 'Show Available Tools',
                              })}
                            </>
                          )}
                        </button>
                      </div>

                      {/* Tools grid - collapsible */}
                      {showTools && (
                        <div className="mt-8">
                          <ToolGrid
                            groupedTools={groupedTools}
                            loading={toolsLoading}
                            error={toolsError}
                            lastUpdated={lastUpdated}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          });
        })()}
        {status === 'error' && (
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            <div className="py-16 text-center max-w-lg mx-auto">
              <p className="mt-2 text-sm text-rose-400 dark:text-rose-300">
                A error occurred while processing your request, please reload
                the conversation and submit something shorter.
              </p>
              <button
                onClick={reload}
                className="mt-6 bg-white hover:bg-slate-950 text-slate-950 hover:text-white dark:hover:text-white rounded-sm shadow-sm hover:shadow-lg py-2 px-4 border border-slate-950 dark:border-slate-200 hover:border-transparent"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        {loading && <LoadingIndicator />}

        <div
          ref={bottomRef}
          className={messages.length > 0 || loading ? 'pb-6' : ''}
        />
      </main>

      <CopilotInput />
    </div>
  );
};

export default Copilot;
