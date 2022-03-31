import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { PaperClipIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';

import StatusProgress from '../../common/components/StatusProgress';
import useQuotationStatusTypes from '../hooks/useQuotationStatusTypes';
import DocumentList from '../../order/components/DocumentList';
import Accordion from '../../common/components/Accordion';
import Button from '../../common/components/Button';
import useModal from '../../modal/hooks/useModal';
import AlertMessage from '../../modal/components/AlertMessage';
import useVerifyQuotation from '../hooks/useVerifyQuotation';
import JSONAreaField from '../../forms/components/JSONAreaField';
import Form from '../../forms/components/Form';
import useForm from '../../forms/hooks/useForm';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import QuotationDetailHeader from './QuotationDetailHeader';
import DangerMessage from '../../modal/components/DangerMessage';
import useRejectQuotation from '../hooks/useRejectQuotation';

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

  const timeline = {
    REQUESTED: {
      id: 1,
      content: 'created',
      visible: true,
      Component: quotation.status === 'REQUESTED' && (
        <Button
          text="Verify"
          onClick={onVerify}
          className="bg-white-300 relative -ml-px inline-flex items-center space-x-2 rounded-md border border-indigo-500 bg-indigo-500 px-2 py-1 text-base font-medium text-white hover:bg-indigo-700 focus:border-indigo-400 focus:outline-none focus:ring-0 focus:ring-indigo-400"
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
      Component: quotation.status !== 'FULLFILLED' &&
        quotation.status !== 'REJECTED' && (
          <Button
            text="Reject"
            onClick={onReject}
            className="rounded-md text-base"
          />
        ),
    },
    FULLFILLED: {
      id: 5,
      content: 'fullfilled',
      visible: true,
    },
  };

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-t-md border border-gray-300 bg-grey-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400';

  const documents = {
    header: (
      <span className="flex">
        <PaperClipIcon
          className="mr-4 h-5 w-5 flex-shrink-0 text-gray-400"
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

  const form = useForm({
    initialValues: {
      configuration: JSON.stringify(quotation.configuration || {}, null, 2),
    },
  });

  return (
    <>
      <QuotationDetailHeader quotation={quotation} />
      <StatusProgress
        data={quotation}
        statusTypes={quotationStatusTypes}
        timeline={timeline}
      />
      <section aria-labelledby="products-heading" className="my-6">
        <div className="rounded-lg border-t border-b border-gray-200 bg-white shadow-sm sm:border">
          <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
            <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
              <div className="m:col-span-4 rounded-lg bg-gray-50 md:col-span-5 md:row-span-2 md:row-end-2">
                <Image
                  loader={defaultNextImageLoader}
                  src={quotation.product?.media?.file.url}
                  layout="responsive"
                  width="100"
                  height={100}
                />
              </div>
            </div>
            <div className="pt-6 pl-4 sm:col-span-7 md:row-end-1">
              <h3 className="text-lg font-medium text-gray-900">
                <Link href={`/products/${quotation.product._id}`}>
                  <a href="#">{quotation.product?.texts?.title}</a>
                </Link>
              </h3>
              <p className="mt-3 text-gray-500">
                {quotation.product?.description}
              </p>
              <Form form={form} className="mr-4 pb-4">
                <JSONAreaField
                  disabled
                  id="configuration"
                  name="configuration"
                  value={form.formik.values.configuration}
                  rows={Math.max(
                    form.formik.values.configuration?.split(' ')?.length / 2,
                    5,
                  )}
                  label={formatMessage({
                    id: 'configuration',
                    defaultMessage: 'Configuration',
                  })}
                />
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Accordion data={[documents]} headerCSS={headerCSS} />
    </>
  );
};

export default QuotationDetail;
