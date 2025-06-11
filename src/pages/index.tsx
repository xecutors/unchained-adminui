import React from 'react';
import { useChat } from '@ai-sdk/react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

import ProductListItem from '../modules/product/components/ProductListItem';
import ProductDetail from '../modules/product/components/ProductDetail';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

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
        <ProductListItem key={p._id} product={{ ...p, texts: p.texts?.[0] }} />
      ));
    }

    if (toolName === 'get_product' && parsed?.product) {
      return (
        <ProductDetail
          key={parsed.product._id}
          product={{ ...parsed.product, texts: parsed.productTexts?.[0] }}
        />
      );
    }

    return (
      <div className="text-sm text-gray-500">
        Unknown tool response: <pre>{JSON.stringify(parsed, null, 2)}</pre>
      </div>
    );
  } catch (e) {
    return (
      <div className="text-sm text-red-500">Failed to parse tool result.</div>
    );
  }
};

const MessageRenderer = ({ message }: { message: any }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <strong className="block mb-2 capitalize text-blue-600">
      {message.role}:
    </strong>
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
);

const Home = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 2,
    credentials: 'include',
    api: 'http://localhost:4010/chat',
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">AI Assistant</h1>

        <div className="space-y-4">
          {messages?.map((message) => (
            <MessageRenderer key={message.id} message={message} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl"
            >
              <PaperAirplaneIcon
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
