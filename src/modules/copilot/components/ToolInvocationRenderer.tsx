import React from 'react';
import UnknownToolResponse from './UnknownToolResponse';
import ToolRenderer from './ToolRenderer';
import { SkippedToolResponse } from '../hooks/useToolTextNormalizer';
import { useIntl } from 'react-intl';

interface ToolInvocationRendererProps {
  part: any;
}

const ToolInvocationRenderer: React.FC<ToolInvocationRendererProps> = ({
  part,
}) => {
  const { formatMessage } = useIntl();
  const { toolName, result, toolCallId } = part.toolInvocation ?? {};
  if (!toolName || !result?.content?.length) return null;

  const content = result.content[0];
  const text = content?.text ?? content;
  try {
    const textString = typeof text === 'string' ? text : JSON.stringify(text);

    if (textString.startsWith('Error')) {
      return (
        <div className="mt-4 text-sm border border-amber-200 text-amber-700 dark:text-amber-400 mb-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-md">
          <div className="font-medium mb-1">
            {' '}
            {formatMessage({
              id: 'tool_response',
              defaultMessage: 'Tool Response',
            })}{' '}
            :
          </div>
          <div>{textString}</div>
        </div>
      );
    }

    const parsed = { toolCallId, ...JSON.parse(textString || '{}') };

    if (SkippedToolResponse.includes(toolName)) return null;

    const renderer = ToolRenderer[toolName];

    return (
      <div className="mb-6">
        {renderer ? renderer(parsed) : <UnknownToolResponse data={parsed} />}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-sm text-rose-500 mb-4">
        <div>
          {' '}
          {formatMessage({
            id: 'failed_tool_response',
            defaultMessage: 'Failed to parse tool result.',
          })}{' '}
        </div>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs">Debug info</summary>
          <pre className="text-xs mt-1 p-2 bg-rose-50 dark:bg-rose-950 rounded overflow-auto">
            {`Tool: ${toolName}
Error: ${error?.message || 'Unknown error'}
Content: ${JSON.stringify(result?.content, null, 2)}`}
          </pre>
        </details>
      </div>
    );
  }
};

export default ToolInvocationRenderer;
