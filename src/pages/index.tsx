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
    <Link
      href={`/products?slug=${generateUniqueId(product)}`}
      className="text-blue-600 dark:text-blue-400"
    >
      <div className="flex gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
          {media?.length ? (
            <ImageWithFallback
              src={media[0]?.file.url}
              alt={text?.title}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {text.title}
            </h2>
            <p className="text-sm text-gray-600">{text?.subtitle}</p>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-blue-600 font-semibold">
              {formatPrice(commerce?.pricing?.[0])}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {product.type}
            </span>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const ProductList = ({ products }: { products: any[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className={`flex ${!isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser && (
        <div className="flex-shrink-0 mr-2">
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
      {!isUser && (
        <div className="flex-shrink-0 ml-2">
          <div className="h-10 w-10 bg-blue-200 text-blue-800 font-bold rounded-full flex items-center justify-center">
            <ComputerDesktopIcon className="h-6 w-6" />
          </div>
        </div>
      )}
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
      <header className="p-4 text-xl font-semibold text-gray-900">
        Unchained <span className="font-light">Copilot</span>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages?.map((message) => (
          <MessageRenderer
            key={message.id}
            message={message}
            user={currentUser}
          />
        ))}
        <div ref={bottomRef} />
      </main>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl border rounded-md p-3 sticky bottom-6"
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
    </div>
  );
};

export default Home;
