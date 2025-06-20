import React, { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

import ProductDetail from '../modules/product/components/ProductDetail';
import useCurrentUser from '../modules/accounts/hooks/useCurrentUser';
import { IUser } from '../gql/types';
import MiniUserAvatar from '../modules/common/components/MiniUserAvatar';
import { ComputerDesktopIcon } from '@heroicons/react/24/solid';
import { useFormatPrice } from '../modules/common/utils/utils';
import ImageWithFallback from '../modules/common/components/ImageWithFallback';
import Link from 'next/link';
import generateUniqueId from '../modules/common/utils/getUniqueId';

const ProductListItem = ({ product }) => {
  const { formatPrice } = useFormatPrice();
  const { texts, media, commerce } = product;
  const [text = {}] = texts || [];
  return (
    <div
      className="my-5 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{
        display: 'grid',
        gridTemplateRows: 'subgrid',
        gridRow: 'span 5',
      }}
    >
      <div className="aspect-square bg-gray-50 relative">
        {media?.length ? (
          <ImageWithFallback
            src={media[0]?.file.url}
            alt={text?.title}
            className="w-full h-full object-contain p-4"
            width={300}
            height={300}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-2">📦</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-900 px-4 line-clamp-2">
        {text.title}
      </h3>
      <p className="text-sm text-gray-600 px-4">
        {commerce?.pricing?.[0]?.currencyCode || 'CHF'}{' '}
        {commerce?.pricing?.[0]?.amount?.toFixed(2) || '0.00'}
      </p>
      <p className="text-xs text-gray-500 px-4 pb-4">
        {product._id || 'auf Lager'}
      </p>
      <div className="border-t border-gray-100">
        <Link
          href={`/products?slug=${generateUniqueId(product)}`}
          className="block text-center text-sm text-blue-600 hover:text-blue-800 py-3"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

const ProductList = ({ products }: { products: any[] }) => {
  return (
    <div
      className="gap-5"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gridTemplateRows: 'auto auto auto auto auto',
      }}
    >
      {products.map((product) => (
        <ProductListItem key={product._id} product={product} />
      ))}
    </div>
  );
};

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
    const listViewTools = [
      'create_product',
      'remove_product',
      'publish_product',
      'unpublish_product',
    ];
    if (toolName === 'list_products' && parsed?.products?.length) {
      return <ProductList products={parsed.products} />;
    }

    if (listViewTools.includes(toolName) && parsed?.product)
      return <ProductList products={[parsed.product]} />;

    if (toolName === 'get_product' && parsed?.product) {
      return (
        <ProductDetail
          key={parsed.product._id}
          product={{
            ...parsed.product,
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

const MessageRenderer = ({ message, user }: { message: any; user: IUser }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${!isUser ? 'justify-start' : 'justify-end'}`}>
      {isUser && (
        <div className="flex-shrink-0">
          {user && (
            <MiniUserAvatar
              url={user?.avatar?.url}
              showName={false}
              name={user.username}
            />
          )}
        </div>
      )}
      <div
        className={`px-4 py-3 ${
          isUser ? 'bg-slate-200 rounded-br-none rounded-xl' : 'text-gray-800'
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
  const { currentUser } = useCurrentUser();
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
      <header className="p-4 mt-1 text-xl font-semibold text-gray-900">
        Unchained <span className="font-light">Copilot</span>
      </header>
      <main className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages?.map((message) => (
          <MessageRenderer
            key={message.id}
            message={message}
            user={currentUser}
          />
        ))}
        <div ref={bottomRef} />
      </main>

      <div className="sticky bottom-6">
        <div className="absolute bottom-full left-0 right-0 h-24 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl border rounded-md p-3"
        >
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 border-0 bg-slate-100 rounded-md px-4 py-2"
            />
            <button type="submit" className="p-2">
              <PaperAirplaneIcon className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
        </form>
        <div className="absolute top-full left-0 right-0 h-6 backdrop-blur-md pointer-events-none" />
      </div>
    </div>
  );
};

export default Home;
