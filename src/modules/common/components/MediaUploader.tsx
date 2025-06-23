import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';

const MediaUploader = ({
  enableDragAndDrop = true,
  onlyDragAndDrop,
  text = null,
  addMedia,
}) => {
  const [dragArea, setDragArea] = useState(false);
  const { formatMessage } = useIntl();

  const handleDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setDragArea(true);
  };

  const handleDragEnter = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setDragArea(true);
  };

  const handleDragLeave = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setDragArea(false);
  };

  const handleDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { files } = event.dataTransfer;
    [...files].forEach((file) => {
      addMedia(file);
    });
    setDragArea(false);
  };

  const handleSelect = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { files } = event.target;
    [...files].forEach((file) => {
      addMedia(file);
    });
    setDragArea(false);
  };

  return (
    <>
      {!onlyDragAndDrop && (
        <div className="text-slate-500 dark:text-slate-200">
          <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-200">
            {formatMessage({ id: 'avatar', defaultMessage: 'Avatar' })}
          </h3>
          <div className="my-4 flex items-center">
            <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-slate-50">
              <svg
                className="h-full w-full text-slate-300 dark:text-slate-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button
              type="button"
              className="ml-5 rounded-md border border-slate-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-slate-700 shadow-xs hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            >
              {text ||
                formatMessage({
                  id: 'upload',
                  defaultMessage: 'Upload',
                })}
            </button>
          </div>
        </div>
      )}
      {enableDragAndDrop && (
        <div
          id="media_uploader"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className="text-slate-500 dark:text-slate-200"
        >
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" />
          <div
            className={classNames(
              'flex justify-center rounded-md border-1 border-dashed border-slate-300 px-6 py-10',
              {
                'border-slate-950': dragArea,
              },
            )}
          >
            <div className="pl-5 space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-200"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-slate-600 dark:text-slate-200">
                <label
                  htmlFor="file-upload"
                  className="px-1 mr-1 relative cursor-pointer rounded-md font-medium text-slate-950 dark:text-slate-300 focus-within:outline-hidden focus-within:ring-2 focus-within:ring-slate-900 focus-within:ring-offset-2 hover:text-slate-900"
                >
                  <span>
                    {formatMessage({
                      id: 'upload_file',
                      defaultMessage: 'Upload a file',
                    })}
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleSelect}
                  />
                </label>
                <p className="pl-1">
                  {formatMessage({
                    id: 'or_drag_and_drop',
                    defaultMessage: 'or drag and drop',
                  })}
                </p>
              </div>
              <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaUploader;
