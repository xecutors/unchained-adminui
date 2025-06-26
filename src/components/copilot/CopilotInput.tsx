import React, { useState, useEffect, useMemo } from 'react';
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

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (input.trim() || selectedImages.length > 0) {
        setInputHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        await handleSubmit(e, selectedImages);
        setSelectedImages([]);
      }
    } catch (e) {
      console.error(e);
    }
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

  const imageUrls = useMemo(
    () => selectedImages.map((img) => URL.createObjectURL(img)),
    [selectedImages],
  );
  useEffect(() => {
    return () => imageUrls.forEach(URL.revokeObjectURL);
  }, [imageUrls]);

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
      <div className="absolute bottom-full left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
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
            onChange={(e) => {
              if (e.target.files) {
                const newFiles = Array.from(e.target.files);
                setSelectedImages((prev) => [...prev, ...newFiles]);
              }
            }}
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
            disabled={!input.trim() && selectedImages.length === 0}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 focus:ring-2 focus:ring-slate-700 focus:outline-hidden rounded-md"
          >
            <PaperAirplaneIcon className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>

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
                    setSelectedImages((prev) =>
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
      <div className="absolute top-full left-0 right-0 h-6 backdrop-blur-md pointer-events-none" />
    </div>
  );
};

export default CopilotInput;
