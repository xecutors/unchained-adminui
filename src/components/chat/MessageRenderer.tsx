import React from 'react';
import { IUser } from '../../gql/types';
import MiniUserAvatar from '../../modules/common/components/MiniUserAvatar';
import MarkdownText from './MarkdownText';
import ToolInvocationRenderer from './ToolInvocationRenderer';

interface MessageRendererProps {
  message: any;
  user: IUser;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message, user }) => {
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
        className={`flex-1 max-w-4xl px-4 py-3 ${
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

export default MessageRenderer;
