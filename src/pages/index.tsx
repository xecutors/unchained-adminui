import React from 'react';
import { useChat } from '@ai-sdk/react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import ProductListItem from '../modules/product/components/ProductListItem';
const Home = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    credentials: 'include',
    api: 'http://localhost:4010/chat',
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">AI Assistant</h1>

        <div className="space-y-4">
          {messages?.map((message) => (
            <div key={message.id} className="bg-white shadow rounded-xl p-4">
              <strong className="block mb-2 capitalize text-blue-600">{`${message.role}:`}</strong>
              {message.parts.map((part: any) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <Markdown
                        rehypePlugins={
                          [rehypeRaw, remarkGfm, rehypeSanitize] as any
                        }
                      >
                        {part.text}
                      </Markdown>
                    );
                  case 'tool-invocation':
                    if (
                      part?.toolInvocation?.toolName === 'list_products' &&
                      part?.toolInvocation?.result
                    ) {
                      const [{ text }] = part.toolInvocation.result.content;
                      const normalized = JSON.parse(text);

                      const { products, productTexts } = normalized || {};
                      return products?.map((product, i) => (
                        <ProductListItem
                          key={product?._id}
                          product={{ ...product, texts: productTexts?.[0] }}
                        />
                      ));
                    }

                    return (
                      <div>
                        <h6>
                          Tool Invocation :{' '}
                          <b> {part?.toolInvocation?.toolName}</b>
                        </h6>
                      </div>
                    );
                  case 'step-start':
                    return <h1>getting your data</h1>;
                  default:
                    return (
                      <div>
                        {' '}
                        <h1>Unkown part </h1>
                        {JSON.stringify(part)}
                      </div>
                    );
                }
              })}
            </div>
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
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
