import React, { useRef, useEffect } from 'react';
import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';
import useShopInfo from '../../modules/common/hooks/useShopInfo';
import { useChatContext } from '../../modules/chat';
import { MessageRenderer, LoadingIndicator } from '../chat';
import CopilotHeader from './CopilotHeader';
import CopilotInput from './CopilotInput';

const Copilot: React.FC = () => {
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
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-red-900 dark:text-red-200 sm:text-5xl">
              Chat is Disabled
            </h1>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-200">
              Copilot chat is currently disabled in this shop. Please check your
              engine configuration
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <CopilotHeader />
      <main className="flex-1 overflow-y-auto py-6 space-y-4 max-w-4xl mx-auto w-full px-4">
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
              <p className="mt-2 text-sm text-red-400 dark:text-red-300">
                A error occurred while processing your request, please reload
                the conversation and submit something shorter.
              </p>
              <button
                onClick={reload}
                className="mt-6 bg-transparent hover:bg-slate-950 text-slate-950 hover:text-white dark:hover:text-white rounded-sm shadow-sm hover:shadow-lg py-2 px-4 border border-slate-950 dark:border-slate-200 hover:border-transparent"
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
