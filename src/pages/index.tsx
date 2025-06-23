import React, { useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline';

import ProductDetail from '../modules/product/components/ProductDetail';
import useCurrentUser from '../modules/accounts/hooks/useCurrentUser';
import { IUser } from '../gql/types';
import MiniUserAvatar from '../modules/common/components/MiniUserAvatar';
import { useFormatPrice } from '../modules/common/utils/utils';
import ImageWithFallback from '../modules/common/components/ImageWithFallback';
import Link from 'next/link';
import generateUniqueId from '../modules/common/utils/getUniqueId';
import useShopInfo from '../modules/common/hooks/useShopInfo';
import Badge from '../modules/common/components/Badge';
import { useChatContext } from '../modules/chat/ChatContext';

const PRODUCT_STATUS = {
  DRAFT: 'yellow',
  ACTIVE: 'green',
  DELETED: 'red',
  null: 'yellow', // Treat null status as draft
  undefined: 'yellow', // Treat undefined status as draft
};

const PRODUCT_STATUS_LABELS = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  DELETED: 'Deleted',
  null: 'Draft', // Treat null status as draft
  undefined: 'Draft', // Treat undefined status as draft
};

const ProductListItem = ({ product }) => {
  const { formatPrice } = useFormatPrice();
  const { texts, media, commerce } = product;
  const [text = {}] = texts || [];
  return (
    <div
      className="gap-3 my-5 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-300 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{
        display: 'grid',
        gridTemplateRows: 'subgrid',
        gridRow: 'span 6',
      }}
    >
      <div className="aspect-square bg-slate-50 relative">
        {media?.length ? (
          <ImageWithFallback
            src={media[0]?.file.url}
            alt={text?.title}
            className="w-full h-full object-contain p-4"
            width={300}
            height={300}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <div className="text-6xl mb-2">📦</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 px-4 line-clamp-2">
        {text.title}
      </h3>
      <div className="px-4">
        <Badge
          text={
            PRODUCT_STATUS_LABELS[product?.status] ||
            PRODUCT_STATUS_LABELS[null] ||
            'Draft'
          }
          color={
            PRODUCT_STATUS[product?.status] || PRODUCT_STATUS[null] || 'yellow'
          }
          square
          dotted
        />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 px-4">
        {commerce?.pricing?.[0]?.currencyCode || 'CHF'}{' '}
        {commerce?.pricing?.[0]?.amount?.toFixed(2) || '0.00'}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 px-4">
        {product._id || 'auf Lager'}
      </p>
      <div className="border-t border-slate-100 dark:border-slate-700">
        <Link
          href={`/products?slug=${generateUniqueId(product)}`}
          className="block text-center text-sm text-slate-900 dark:text-slate-200 hover:text-slate-800 dark:hover:text-slate-300 py-3"
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
        gridTemplateRows: 'auto auto auto auto auto auto',
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
      <div className="text-sm text-slate-500">
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
          isUser
            ? 'bg-slate-200 dark:bg-slate-700 rounded-br-none rounded-xl'
            : 'text-slate-800 dark:text-slate-200'
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
                <div key={index} className="text-sm text-amber-600">
                  Unknown part: {JSON.stringify(part)}
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

const Copilot = () => {
  const { messages, input, handleInputChange, handleSubmit, clearHistory } = useChatContext();
  const { shopInfo } = useShopInfo();
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
  if (!shopInfo?.chatEnabled)
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
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <header className="p-4 mt-1 flex items-center justify-between">
        <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Unchained
          <span className="font-light ml-1">
            Copilot<span className="text-xs ml-1"> 1.0</span>
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <TrashIcon className="h-4 w-4" />
            Clear History
          </button>
        )}
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
        <div className="absolute bottom-full left-0 right-0 h-24 bg-gradient-to-t from-slate-100 dark:from-slate-900 to-transparent pointer-events-none" />
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 shadow-2xl border border-slate-300 dark:border-slate-700 rounded-md p-3"
        >
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 border-0 bg-slate-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-400 rounded-md px-4 py-2"
            />
            <button
              type="submit"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <PaperAirplaneIcon className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
        </form>
        <div className="absolute top-full left-0 right-0 h-6 backdrop-blur-md pointer-events-none" />
      </div>
    </div>
  );
};

export default Copilot;
