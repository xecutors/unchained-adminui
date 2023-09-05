import { useState } from 'react';
import { useIntl } from 'react-intl';

const CopyableText = ({ text }) => {
  const { formatMessage } = useIntl();
  const [tooltipText, setTooltipText] = useState(
    formatMessage({
      id: 'copy_to_clipboard',
      defaultMessage: 'Copy to clipboard',
    }),
  );
  const copyToClipboard = () => {
    const element = document.createElement('textarea');
    element.value = document.getElementById('copyable').innerText;

    element.setAttribute('readonly', '');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    element.select();
    element.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(element);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    setTooltipText(formatMessage({ id: 'copied', defaultMessage: 'Copied' }));
  };
  return (
    <div
      onClick={copyToClipboard}
      className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onMouseEnter={() =>
        setTooltipText(
          formatMessage({
            id: 'copy_to_clipboard',
            defaultMessage: 'Copy to clipboard',
          }),
        )
      }
    >
      <pre>
        <span>{tooltipText}</span>
        <code id="copyable" className="sr-only">
          {text}
        </code>
      </pre>
    </div>
  );
};

export default CopyableText;
