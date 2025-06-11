import React, { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

import ProductListItem from '../modules/product/components/ProductListItem';
import ProductDetail from '../modules/product/components/ProductDetail';

const MarkdownText = ({ text }: { text: string }) => (
  <Markdown rehypePlugins={[rehypeRaw, remarkGfm, rehypeSanitize] as any}>
    {text}
  </Markdown>
);

const ToolInvocationRenderer = ({ part }: { part: any }) => {
  const { toolName, result } = part.toolInvocation ?? {};
  if (!toolName || !result?.content?.length) return null;

  try {
    const [{ text }] = result.content;
    const parsed = JSON.parse(text);

    if (toolName === 'list_products' && parsed?.products?.length) {
      return parsed.products.map((p: any) => (
        <ProductListItem
          showAvatar
          key={p._id}
          product={{ ...p, texts: p.texts?.[0] }}
          hideSortIndex
        />
      ));
    }

    if (toolName === 'get_product' && parsed?.product) {
      return (
        <ProductDetail
          key={parsed.product._id}
          product={{
            ...parsed.product,
            texts: parsed.productTexts?.[0],
            media: parsed?.media,
          }}
        />
      );
    }

    return (
      <div className="text-sm text-gray-500">
        Unknown tool response: <pre>{JSON.stringify(parsed, null, 2)}</pre>
      </div>
    );
  } catch {
    return (
      <div className="text-sm text-red-500">Failed to parse tool result.</div>
    );
  }
};

const MessageRenderer = ({ message }: { message: any }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-xl px-4 py-3 shadow-md ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        {message.parts.map((part: any, index: number) => {
          switch (part.type) {
            case 'text':
              return <MarkdownText key={index} text={part.text} />;
            case 'tool-invocation':
              return <ToolInvocationRenderer key={index} part={part} />;
            case 'step-start':
              return null;
            default:
              return (
                <div key={index} className="text-sm text-yellow-600">
                  Unknown part: {JSON.stringify(part)}
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

const Home = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    credentials: 'include',
    api: 'http://localhost:4010/chat',
  });

  const bottomRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <header className="p-4 shadow bg-white border-b text-center text-xl font-semibold text-gray-700">
        AI Assistant
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages?.map((message) => (
          <MessageRenderer key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </main>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-t p-4 sticky bottom-0"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded-full hover:bg-blue-700"
          >
            <PaperAirplaneIcon className="h-6 w-6 text-white" strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
