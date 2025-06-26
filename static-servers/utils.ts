import {
  InvalidToolArgumentsError,
  NoSuchToolError,
  ToolExecutionError,
} from 'ai';

export const errorHandler = (error: any): string => {
  if (NoSuchToolError.isInstance(error)) return 'NoSuchToolError';
  if (InvalidToolArgumentsError.isInstance(error))
    return 'InvalidToolArgumentsError';
  if (ToolExecutionError.isInstance(error)) return 'ToolExecutionError';
  if (error?.message?.toLowerCase() === 'forbidden') return 'NetworkError';
  return `Failed to stream response: ${error?.message || 'Unknown error'}`;
};
