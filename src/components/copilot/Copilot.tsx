import React, { useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';
import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';
import useShopInfo from '../../modules/common/hooks/useShopInfo';
import { useChatContext } from '../../modules/chat';
import { MessageRenderer, LoadingIndicator } from '../chat';
import CopilotHeader from './CopilotHeader';
import CopilotInput from './CopilotInput';

const Copilot: React.FC = () => {
  const { formatMessage } = useIntl();
  const { messages, status, reload } = useChatContext();
  const { shopInfo } = useShopInfo();
  const { currentUser } = useCurrentUser();
  const bottomRef = useRef<HTMLDivElement>(null);
  const loading = status !== 'ready' && status !== 'error';

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const { top, bottom } = el.getBoundingClientRect();
    const inView =
      top >= 0 &&
      bottom <= (window.innerHeight || document.documentElement.clientHeight);

    if (!inView) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!shopInfo?.chatEnabled) {
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
                defaultMessage: 'Copilot chat is currently disabled in this shop. Please check your engine configuration',
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
        {messages.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-500 dark:to-slate-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Welcome to Copilot
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
              Your AI assistant for managing your Unchained Commerce store
            </p>
            <div className="text-sm text-slate-500 dark:text-slate-500 mb-8">
              Initializing your personal assistant...
            </div>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Here are some things you can ask me:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    📦 "Show me my products"
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    List and manage products
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    🔍 "Find draft products"
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Search with specific filters
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ✏️ "Create a new product"
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Add products to your catalog
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    🚀 "Publish product [ID]"
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Manage product status
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {messages?.map((message) => {
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
            (message.content.includes('Give a brief introduction') || 
             message.content.includes('Introduce yourself and your tools'))
          ) {
            return null;
          }
          
          return (
            <MessageRenderer
              key={message.id}
              message={message}
              user={currentUser}
            />
          );
        })}
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
