import React from 'react';
import { IUser } from '../../gql/types';
import MiniUserAvatar from '../../modules/common/components/MiniUserAvatar';
import MarkdownText from './MarkdownText';
import ToolInvocationRenderer from './ToolInvocationRenderer';
import Image from 'next/image';

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
        className={`${
          isUser
            ? 'bg-slate-200 dark:bg-slate-700 rounded-br-none rounded-xl max-w-md px-3 py-2'
            : 'text-slate-800 dark:text-slate-200 flex-1 max-w-4xl py-3'
        }`}
      >
        {message.parts.map((part: any, index: number) => {
          switch (part.type) {
            case 'text':
              return (
                <>
                  <MarkdownText key={index} text={part.text} className="mb-0" />
                  <div>
                    {message?.experimental_attachments
                      ?.filter((attachment) =>
                        attachment?.contentType?.startsWith('image/'),
                      )
                      .map((attachment, index) => (
                        <Image
                          key={`${part.id}-${index}`}
                          src={attachment.url}
                          width={100}
                          height={50}
                          alt={attachment.name ?? `attachment-${index}`}
                        />
                      ))}
                  </div>
                </>
              );
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
