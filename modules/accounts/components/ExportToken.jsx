import { LinkIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import useExportToken from '../../product/hooks/useExportToken';
import ExportTokenForm from './ExportTokenForm';

const ExportToken = ({ tokenId, tokenStatus, addresses }) => {
  const { exportToken } = useExportToken();
  const { formatMessage } = useIntl();

  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (recipientWalletAddress) => {
    await exportToken({
      tokenId,
      recipientWalletAddress,
    });
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ExportTokenForm
        isOpen={showModal}
        cancel={closeModal}
        onExport={onSubmit}
        addresses={addresses}
      />
      {tokenStatus !== 'DECENTRALIZED' && (
        <button
          type="button"
          onClick={() => setShowModal(true)}
          disabled={tokenStatus === 'EXPORTING'}
          className={classNames(
            ' text-center   inline-flex truncate rounded-md border border-transparent bg-indigo-600 px-5 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            { 'bg-gray-400 hover:bg-gray-500': tokenStatus === 'EXPORTING' },
          )}
        >
          <LinkIcon className="w-6 h-6 mr-2" />
          {tokenStatus === 'CENTRALIZED'
            ? formatMessage({ id: 'export', defaultMessage: `Export` })
            : formatMessage({
                id: 'exporting',
                defaultMessage: 'Exporting...',
              })}
        </button>
      )}
    </>
  );
};

export default ExportToken;
