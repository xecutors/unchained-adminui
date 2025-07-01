import React, { useState, useEffect } from 'react';
import {
  CameraIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useChatContext } from '../../modules/chat';
const CopilotInput: React.FC = () => {
  const { input, handleInputChange, handleSubmit } = useChatContext();

  const [inputHistory, setInputHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('copilot-input-history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (input.trim() || imageUrls.length > 0) {
        setInputHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        const imgs = [...imageUrls];
        setImageUrls([]);
        await handleSubmit(e, imgs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_TEMP_FILE_UPLOAD_URL || '/temp-upload',
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      );

      const data = await res.json();
      return data?.url;
    } catch (err) {
      console.error('Upload failed', err);
      return null;
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);

    const files = Array.from(e.target.files);
    const uploadedUrls = await Promise.all(
      files.map((file) => uploadImage(file)),
    );

    setImageUrls((prev) => [
      ...prev,
      ...(uploadedUrls.filter(Boolean) as string[]),
    ]);
    setUploading(false);
  };

  const setInputValue = (value: string) =>
    handleInputChange({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      let newIndex = historyIndex;
      if (e.key === 'ArrowUp') {
        newIndex =
          historyIndex === -1
            ? inputHistory.length - 1
            : Math.max(0, historyIndex - 1);
      } else if (e.key === 'ArrowDown') {
        newIndex = historyIndex + 1;
        if (newIndex >= inputHistory.length) {
          newIndex = -1;
        }
      }

      setHistoryIndex(newIndex);
      setInputValue(newIndex === -1 ? '' : inputHistory[newIndex]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputHistory.length > 0) {
        localStorage.setItem(
          'copilot-input-history',
          JSON.stringify(inputHistory.slice(-50)),
        );
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputHistory]);

  return (
    <div className="sticky bottom-6 max-w-4xl mx-auto w-full">
      <form
        onSubmit={onSubmit}
        className="bg-white dark:bg-slate-800 shadow-2xl border border-slate-300 dark:border-slate-700 rounded-md p-3"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 border-0 bg-slate-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-400"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
            title="Upload images"
          >
            <CameraIcon className="h-6 w-6" strokeWidth={2} />
          </label>

          <button
            type="submit"
            disabled={!input.trim() && imageUrls.length === 0}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 focus:ring-2 focus:ring-slate-700 focus:outline-hidden rounded-md"
          >
            <PaperAirplaneIcon className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>

        {uploading && (
          <p className="mt-2 text-sm text-slate-500">Uploading...</p>
        )}

        {imageUrls.length > 0 && (
          <div className="mt-2 flex gap-3 flex-wrap">
            {imageUrls.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt={`Selected ${i}`}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImageUrls((prev) =>
                      prev.filter((_, index) => index !== i),
                    )
                  }
                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <XMarkIcon className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default CopilotInput;
