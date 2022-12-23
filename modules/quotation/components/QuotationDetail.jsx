import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import { MailIcon, XIcon } from '@heroicons/react/solid';
import StatusProgress from '../../common/components/StatusProgress';
import useQuotationStatusTypes from '../hooks/useQuotationStatusTypes';
import Button from '../../common/components/Button';
import useModal from '../../modal/hooks/useModal';

import useVerifyQuotation from '../hooks/useVerifyQuotation';

import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import QuotationDetailHeader from './QuotationDetailHeader';
import useRejectQuotation from '../hooks/useRejectQuotation';
import generateUniqueId from '../../common/utils/getUniqueId';
import QuotationConfigurationForm from './QuotationConfigurationForm';
import useMakeQuotationProposal from '../hooks/useMakeQuotationProposal';
import JSONView from '../../common/components/JSONView';

const QuotationDetail = ({ quotation }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();

  const { quotationStatusTypes } = useQuotationStatusTypes();
  const { VerifyQuotation } = useVerifyQuotation();
  const { rejectQuotation } = useRejectQuotation();
  const { makeQuotationProposal } = useMakeQuotationProposal();

  const onVerify = async () => {
    await setModal(
      <QuotationConfigurationForm
        onSubmit={async ({ quotationContext }) => {
          await VerifyQuotation({
            quotationId: quotation._id,
            quotationContext: quotationContext
              ? JSON.parse(quotationContext || null)
              : null,
          });

          setModal('');
        }}
        onCancel={() => setModal('')}
        successMessage={formatMessage({
          id: 'quotation-verified-successfully',
          defaultMessage: 'Quotation verified successfully',
        })}
        headerText={formatMessage({
          id: 'verify-quotation-quotation',
          defaultMessage: 'Verify quotation?',
        })}
      />,
    );
  };

  const onReject = async () => {
    await setModal(
      <QuotationConfigurationForm
        onSubmit={async ({ quotationContext }) => {
          await rejectQuotation({
            quotationId: quotation._id,
            quotationContext: quotationContext
              ? JSON.parse(quotationContext || null)
              : null,
          });
          setModal('');
        }}
        onCancel={() => setModal('')}
        successMessage={formatMessage({
          id: 'quotation-rejection-successfully',
          defaultMessage: 'Quotation rejected successfully',
        })}
        headerText={formatMessage({
          id: 'reject-quotation-quotation',
          defaultMessage: 'Reject quotation?',
        })}
        icon={
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <XIcon className="h-6 w-6 text-red-600" />
          </div>
        }
      />,
    );
  };

  const proposeQuote = async () => {
    await setModal(
      <QuotationConfigurationForm
        onSubmit={async ({ quotationContext }) => {
          await makeQuotationProposal({
            quotationId: quotation._id,
            quotationContext: quotationContext
              ? JSON.parse(quotationContext || null)
              : null,
          });
          setModal('');
        }}
        onCancel={() => setModal('')}
        successMessage={formatMessage({
          id: 'quotation-quoted-successfully',
          defaultMessage: 'Quoted successfully',
        })}
        headerText={formatMessage({
          id: 'make-proposal-header',
          defaultMessage: 'Make quotation proposal',
        })}
        icon={
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <MailIcon className="h-6 w-6 text-green-600" />
          </div>
        }
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
      Component: quotation.status === 'PROCESSING' && (
        <Button
          text="Propose"
          onClick={proposeQuote}
          className="bg-white-300 relative -ml-px inline-flex items-center space-x-2 rounded-md border border-indigo-500 bg-indigo-500 px-2 py-1 text-base font-medium text-white hover:bg-indigo-700 focus:border-indigo-400 focus:outline-none focus:ring-0 focus:ring-indigo-400"
        />
      ),
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
            className="bg-white-300 relative -ml-px inline-flex items-center space-x-2 rounded-md border border-red-500 bg-red-500 px-2 py-1 text-base font-medium text-white hover:bg-red-700 focus:border-red-400 focus:outline-none focus:ring-0 focus:ring-red-400"
          />
        ),
    },
    FULLFILLED: {
      id: 5,
      content: 'fullfilled',
      visible: true,
    },
  };

  return (
    <>
      <QuotationDetailHeader quotation={quotation} />
      <StatusProgress
        data={quotation}
        statusTypes={quotationStatusTypes}
        timeline={timeline}
      />
      <section aria-labelledby="products-heading" className="my-6">
        <div className="rounded-lg border-t border-b border-slate-200 dark:border-slate-800 bg-white shadow-sm sm:border">
          <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
            <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
              <div className="m:col-span-4 rounded-lg bg-slate-50 md:col-span-5 md:row-span-2 md:row-end-2">
                <Image
                  loader={defaultNextImageLoader}
                  src={quotation.product?.media[0]?.file?.url}
                  layout="responsive"
                  width="100"
                  height={100}
                  placeholder="blur"
                  blurDataURL="/no-image.jpg"
                />
              </div>
            </div>
            <div className="pt-6 pl-4 sm:col-span-7 md:row-end-1">
              <h3 className="text-lg font-medium text-slate-900">
                <Link href={`/products/${generateUniqueId(quotation.product)}`}>
                  <a href="#">{quotation.product?.texts?.title}</a>
                </Link>
              </h3>
              <p className="mt-3 text-slate-500">
                {quotation.product?.description}
              </p>

              <JSONView
                disabled
                value={JSON.stringify(
                  (quotation.configuration || []).map(
                    ({ __typename, ...rest }) => rest,
                  ),
                  null,
                  2,
                )}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuotationDetail;
