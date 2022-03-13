import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { PaperClipIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import StatusProgress from '../../common/components/StatusProgress';
import useQuotationStatusTypes from '../hooks/useQuotationStatusTypes';
import Header from '../../common/components/Header';  
import LogList from '../../order/components/LogList';
import DocumentList from '../../order/components/DocumentList';
import Accordion from '../../common/components/Accordion';
import Button from '../../common/components/Button';
import useModal from '../../modal/hooks/useModal';
import AlertMessage from '../../modal/components/AlertMessage';
import useVerifyQuotation from '../hooks/useVerifyQuotation';
import DangerMessage from '../../modal/components/DangerMessage';
import useRejectQuotation from '../hooks/useRejectQuotation';
import JSONAreaField from '../../forms/components/JSONAreaField';
import Form from '../../forms/components/Form';
import useForm from '../../forms/hooks/useForm';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';

const QuotationDetail = ({ quotation }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();

  const { quotationStatusTypes } = useQuotationStatusTypes();
  const { VerifyQuotation } = useVerifyQuotation();
  const { rejectQuotation } = useRejectQuotation();

  const onVerify = async () => {
    await setModal(
      <AlertMessage
        buttonText={formatMessage({
          id: 'verify_alert_button',
          defaultMessage: 'Verify',
        })}
        headerText={formatMessage({
          id: 'verify_alert_header',
          defaultMessage: 'Verify quotation?',
        })}
        onOkClick={async () => {
          setModal('');
          await VerifyQuotation({ id: quotation._id });
          toast.success(
            formatMessage(
              {
                id: 'success',
                defaultMessage: 'Quotation {id} verified successfully',
              },
              {
                id: quotation._id,
              },
            ),
          );
        }}
      />,
    );
  };

  const onReject = async () => {
    await setModal(
      <DangerMessage
        buttonText={formatMessage({
          id: 'reject_alert_button',
          defaultMessage: 'Reject',
        })}
        headerText={formatMessage({
          id: 'Reject_alert_header',
          defaultMessage: 'Reject quotation?',
        })}
        onOkClick={async () => {
          setModal('');
          await rejectQuotation({ id: quotation._id });
          toast.success(
            formatMessage(
              {
                id: 'reject_alert_success',
                defaultMessage: 'Reject {id} verified successfully',
              },
              {
                id: quotation._id,
              },
            ),
          );
        }}
      />,
    );
  };

  const rejectButton = (
    <Button
      text="Reject"
      onClick={onReject}
      className="-ml-px relative inline-flex items-center space-x-2 px-2 py-1 border border-indigo-500 text-base font-medium rounded-md bg-indigo-500 text-white bg-white-300 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500"
    />
  );

  const timeline = {
    REQUESTED: {
      id: 1,
      content: 'created',
      visible: true,
      Component: quotation.status === 'REQUESTED' && (
        <Button
          text="Verify"
          onClick={onVerify}
          className="-ml-px relative inline-flex items-center space-x-2 px-2 py-1 border border-indigo-500 text-base font-medium rounded-md bg-indigo-500 text-white bg-white-300 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500"
        />
      ),
    },
    PROCESSING: {
      id: 2,
      content: 'updated',
      visible: quotation.status === 'PROCESSING',
    },
    PROPOSED: {
      id: 3,
      content: 'updated',
      visible: true,
    },
    REJECTED: {
      id: 4,
      content: 'rejected',
      visible: quotation.status !== 'FULLFILLED',
    },
    FULLFILLED: {
      id: 5,
      content: 'fullfilled',
      visible: true,
    },
  };

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-t-md border border-gray-300 bg-grey-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500';

  const documents = {
    header: (
      <span className="flex">
        <PaperClipIcon
          className="flex-shrink-0 h-5 w-5 text-gray-400 mr-4"
          aria-hidden="true"
        />
        {formatMessage({
          id: 'documents',
          defaultMessage: 'Documents',
        })}
      </span>
    ),
    body: <DocumentList documents={quotation.documents} />,
  };

  const logs = {
    header: (
      <span className="flex">
        {formatMessage({
          id: 'logs',
          defaultMessage: 'Logs',
        })}
      </span>
    ),
    body: <LogList logs={quotation.logs} />,
  };

  const form = useForm({
    initialValues: {
      configuration: JSON.stringify(quotation.configuration || {}, null, 2),
    },
  });

  return (
    <>
      <Header name="quotation" data={quotation} reject={rejectButton} />
      <StatusProgress
        data={quotation}
        statusTypes={quotationStatusTypes}
        timeline={timeline}
      />
      <section aria-labelledby="products-heading" className="my-6">
        <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:border rounded-lg">
          <div className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
            <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
              <div className="m:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2 bg-gray-50 rounded-lg">
                <Image
                  loader={defaultNextImageLoader}
                  src={quotation.product?.media?.file.url}
                  layout="responsive"
                  width="100"
                  height={100}
                />
              </div>
            </div>
            <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1 pl-4">
              <h3 className="text-lg font-medium text-gray-900">
                <Link href={`/products/${quotation.product._id}`}>
                  <a href="#">{quotation.product?.texts?.title}</a>
                </Link>
              </h3>
              <p className="text-gray-500 mt-3">
                {quotation.product?.description}
              </p>
              <Form form={form} className="mr-4 pb-4">
                <label
                  htmlFor="configuration"
                  className="block text-lg font-medium text-gray-900 sm:mt-px sm:pt-2"
                >
                  {formatMessage({
                    id: 'configuration',
                    defaultMessage: 'Configuration',
                  })}
                </label>
                <JSONAreaField
                  disabled
                  id="configuration"
                  name="configuration"
                  value={form.formik.values.configuration}
                  rows={Math.max(form.formik.values.configuration.length, 5)}
                  label={formatMessage({
                    id: 'configuration',
                    defaultMessage: 'Configuration',
                  })}
                  hideLabel
                />
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Accordion data={[documents, logs]} headerCSS={headerCSS} />
    </>
  );
};

export default QuotationDetail;
