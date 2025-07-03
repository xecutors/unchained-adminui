import React from 'react';
import { IUser } from '../../gql/types';
import MiniUserAvatar from '../../modules/common/components/MiniUserAvatar';
import MarkdownText from './MarkdownText';
import ToolInvocationRenderer from './ToolInvocationRenderer';
import UnifiedProductList from './UnifiedProductList';
import UnifiedAssortmentList from './UnifiedAssortmentList';

interface MessageRendererProps {
  message: any;
  user: IUser;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message, user }) => {
  const isUser = message.role === 'user';
  
  // Extract product and assortment data from all tool invocations in this message
  const productSections: Array<{ products: any[]; filters?: any; title?: string }> = [];
  const assortmentSections: Array<{ assortments: any[]; filters?: any; title?: string }> = [];
  
  if (!isUser) {
    message.parts.forEach((part: any) => {
      if (part.type === 'tool-invocation') {
        const { toolName, result } = part.toolInvocation ?? {};
        if (toolName && result?.content?.length) {
          try {
            const content = result.content[0];
            const text = content?.text || content;
            const textString = typeof text === 'string' ? text : JSON.stringify(text);
            
            if (!textString?.startsWith('Error')) {
              const parsed = JSON.parse(textString);
              
              // Collect products from various tool operations
              if (toolName === 'list_products' && parsed?.products?.length) {
                productSections.push({
                  products: parsed.products,
                  filters: parsed.filters,
                  title: 'Product Search Results'
                });
              } else if (parsed?.product) {
                productSections.push({
                  products: [parsed.product],
                  title: 'Updated Product'
                });
              } else if (toolName === 'assortment_products' && parsed?.products?.length) {
                productSections.push({
                  products: parsed.products,
                  filters: parsed.filters,
                  title: 'Assortment Products'
                });
              }
              
              // Collect assortments from various tool operations
              if (toolName === 'list_assortments' && parsed?.assortments?.length) {
                assortmentSections.push({
                  assortments: parsed.assortments,
                  filters: parsed.filters,
                  title: 'Assortment Search Results'
                });
              } else if (parsed?.assortment) {
                assortmentSections.push({
                  assortments: [parsed.assortment],
                  title: 'Updated Assortment'
                });
              } else if (toolName === 'assortment_children' && parsed?.assortments?.length) {
                assortmentSections.push({
                  assortments: parsed.assortments,
                  title: 'Child Assortments'
                });
              }
            }
          } catch (error) {
            // Ignore parsing errors for individual tools
          }
        }
      }
    });
  }
  
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
        className={`${
          isUser
            ? 'bg-slate-200 dark:bg-slate-700 rounded-br-none rounded-xl max-w-md px-3 py-2'
            : 'text-slate-800 dark:text-slate-200 flex-1 max-w-full py-3 overflow-hidden'
        }`}
      >
        {message.parts.map((part: any, index: number) => {
          switch (part.type) {
            case 'text':
              return (
                <MarkdownText key={index} text={part.text} className="mb-0" />
              );
            case 'tool-invocation':
              return <ToolInvocationRenderer key={index} part={part} hideProducts={true} />;
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
        
        {/* Show unified product list at the end if there are any products */}
        {productSections.length > 0 && (
          <UnifiedProductList productSections={productSections} />
        )}
        
        {/* Show unified assortment list at the end if there are any assortments */}
        {assortmentSections.length > 0 && (
          <UnifiedAssortmentList assortmentSections={assortmentSections} />
        )}
      </div>
    </div>
  );
};

export default MessageRenderer;
