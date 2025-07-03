import {
  ImageModel,
  InvalidToolArgumentsError,
  NoSuchToolError,
  ToolExecutionError,
  streamText,
} from 'ai';

type StreamTextParams = Parameters<typeof streamText>[0];

export interface ChatConfiguration extends StreamTextParams {
  unchainedMCPUrl?: string;
  imageGenerationTool?: { model: ImageModel; uploadUrl?: string };
}

export const errorHandler = (error: any): string => {
  if (NoSuchToolError.isInstance(error)) return 'NoSuchToolError';
  if (InvalidToolArgumentsError.isInstance(error))
    return 'InvalidToolArgumentsError';
  if (ToolExecutionError.isInstance(error)) return 'ToolExecutionError';
  if (error?.message?.toLowerCase()?.includes('forbidden'))
    return 'NetworkError';
  if (error?.message?.toLowerCase()?.includes('limit')) return 'LimitExceeded';
  return `Failed to stream response: ${error?.message || 'Unknown error'}`;
};
