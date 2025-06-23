import React, { useRef, useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import {
  PaperAirplaneIcon,
  TrashIcon,
  CommandLineIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

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
          text={PRODUCT_STATUS_LABELS[product?.status] || 'Draft'}
          color={PRODUCT_STATUS[product?.status] || 'yellow'}
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

const ProductListItemCompact = ({ product }) => {
  const { formatPrice } = useFormatPrice();
  const { texts, media, commerce } = product;
  const [text = {}] = texts || [];
  
  return (
    <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200">
      <div className="w-16 h-16 flex-shrink-0 bg-slate-50 dark:bg-slate-700 rounded-md overflow-hidden">
        {media?.length ? (
          <ImageWithFallback
            src={media[0]?.file.url}
            alt={text?.title}
            className="w-full h-full object-cover"
            width={64}
            height={64}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <span className="text-2xl">📦</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {text.title || 'Untitled Product'}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <Badge
            text={PRODUCT_STATUS_LABELS[product?.status] || 'Draft'}
            color={PRODUCT_STATUS[product?.status] || 'yellow'}
            square
            dotted
          />
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {commerce?.pricing?.[0]?.currencyCode || 'CHF'}{' '}
            {commerce?.pricing?.[0]?.amount?.toFixed(2) || '0.00'}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ID: {product._id}
          </span>
        </div>
      </div>
      
      <Link
        href={`/products?slug=${generateUniqueId(product)}`}
        className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        Edit
      </Link>
    </div>
  );
};

const ProductList = ({ products }: { products: any[] }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('product-view-mode') as 'grid' | 'list') || 'grid';
    }
    return 'grid';
  });
  
  useEffect(() => {
    localStorage.setItem('product-view-mode', viewMode);
  }, [viewMode]);
  
  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="Grid view"
          >
            <Squares2X2Icon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="List view"
          >
            <ListBulletIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div
          className="gap-5"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gridTemplateRows: 'span 6',
          }}
        >
          {products.map((product) => (
            <ProductListItem key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((product) => (
            <ProductListItemCompact key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const MarkdownText = ({ text }: { text: string }) => (
  <div className="prose prose-sm dark:prose-invert max-w-none mb-4 [&>*:last-child]:mb-0">
    <Markdown rehypePlugins={[rehypeRaw, remarkGfm, rehypeSanitize] as any}>
      {text}
    </Markdown>
  </div>
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
      return (
        <div className="mb-6">
          <ProductList products={parsed.products} />
        </div>
      );
    }

    if (listViewTools.includes(toolName) && parsed?.product)
      return (
        <div className="mb-6">
          <ProductList products={[parsed.product]} />
        </div>
      );

    if (toolName === 'get_product' && parsed?.product) {
      return (
        <div className="mb-6">
          <ProductDetail
            key={parsed.product._id}
            product={{
              ...parsed.product,
            }}
          />
        </div>
      );
    }

    return (
      <div className="mb-6">
        <UnknownToolResponse data={parsed} />
      </div>
    );
  } catch {
    return (
      <div className="text-sm text-red-500 mb-4">Failed to parse tool result.</div>
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

const UnknownToolResponse = ({ data }: { data: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
        Unknown tool response:
      </div>
      <div className="mb-4 relative rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <pre
          className={`p-4 text-xs overflow-x-auto overflow-y-hidden ${
            !isExpanded ? 'max-h-[300px]' : ''
          }`}
        >
          <code className="text-slate-800 dark:text-slate-200">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
        {!isExpanded && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-800 to-transparent pointer-events-none" />
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              Show full response
            </button>
          </>
        )}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="sticky bottom-2 left-1/2 transform -translate-x-1/2 mt-2 mb-2 px-4 py-1.5 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

const LoadingIndicator = () => {
  const { status } = useChatContext();
  const loadingMessages = {
    submitted: 'Processing...',
    streaming: 'Generating...',
  };

  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-500 dark:to-slate-700 rounded-lg flex items-center justify-center shadow-sm">
          <CommandLineIcon className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Copilot
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400 italic transition-opacity duration-300">
              {loadingMessages[status]}
            </span>
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Copilot = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    clearHistory,
    status,
  } = useChatContext();
  const { shopInfo } = useShopInfo();
  const { currentUser } = useCurrentUser();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [inputHistory, setInputHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('copilot-input-history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Save input history to localStorage
  useEffect(() => {
    if (inputHistory.length > 0) {
      localStorage.setItem(
        'copilot-input-history',
        JSON.stringify(inputHistory.slice(-50)),
      ); // Keep last 50 entries
    }
  }, [inputHistory]);
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
        {status !== 'ready' && <LoadingIndicator />}
        <div
          ref={bottomRef}
          className={messages.length > 0 || status !== 'ready' ? 'pb-6' : ''}
        />
      </main>

      <div className="sticky bottom-6">
        <div className="absolute bottom-full left-0 right-0 h-24 bg-gradient-to-t from-slate-100 dark:from-slate-900 to-transparent pointer-events-none" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              setInputHistory((prev) => [...prev, input]);
              setHistoryIndex(-1);
            }
            handleSubmit(e);
          }}
          className="bg-white dark:bg-slate-800 shadow-2xl border border-slate-300 dark:border-slate-700 rounded-md p-3"
        >
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  if (inputHistory.length > 0) {
                    const newIndex =
                      historyIndex === -1
                        ? inputHistory.length - 1
                        : Math.max(0, historyIndex - 1);
                    setHistoryIndex(newIndex);
                    handleInputChange({
                      target: { value: inputHistory[newIndex] },
                    } as any);
                  }
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  if (historyIndex !== -1) {
                    const newIndex = historyIndex + 1;
                    if (newIndex >= inputHistory.length) {
                      setHistoryIndex(-1);
                      handleInputChange({ target: { value: '' } } as any);
                    } else {
                      setHistoryIndex(newIndex);
                      handleInputChange({
                        target: { value: inputHistory[newIndex] },
                      } as any);
                    }
                  }
                }
              }}
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
