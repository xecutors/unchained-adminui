import { experimental_generateImage, ImageModel, tool } from 'ai';
import { fileTypeFromBuffer } from 'file-type';
import { z } from 'zod';

const generateImageHandler =
  (req: any) =>
  ({ model }: { model: ImageModel }) => {
    if (!model) return null;
    return tool({
      description: 'Generate an image based on the prompt',
      parameters: z.object({
        prompt: z.string().describe('The prompt to generate the image from'),
        size: z
          .enum(['1024x1024', '1024x1792', '1792x1024'])
          .optional()
          .describe('The size of the image (default is 1024x1024).'),
      }),
      execute: async ({ prompt, size = '1024x1024' }) => {
        try {
          const { image } = await experimental_generateImage({
            model: model,
            prompt,
            size,
          });

          const buffer = Buffer.from(image.base64, 'base64');
          const fileType = await fileTypeFromBuffer(buffer);
          const extension = fileType?.ext || 'png';
          const mime = fileType?.mime || 'image/png';

          const filename = `image-${Date.now()}.${extension}`;
          const blob = new Blob([buffer], { type: mime });
          const file = new File([blob], filename, { type: mime });

          const formData = new FormData();
          formData.append('image', file);

          const uploadUrl =
            process.env.TEMP_FILE_UPLOAD_URL ||
            'http://localhost:4010/temp-upload';

          const uploadRes = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
              Cookie: req?.headers?.cookie || req?.headers?.get('cookie') || '',
            },
          });

          if (!uploadRes.ok) {
            throw new Error(`Image upload failed: ${uploadRes.statusText}`);
          }

          const { url } = await uploadRes.json();
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({ imageUrl: url, prompt }),
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text' as const,
                text: `Error Generating image: ${(error as Error).message}`,
              },
            ],
          };
        }
      },
    });
  };

export default generateImageHandler;
