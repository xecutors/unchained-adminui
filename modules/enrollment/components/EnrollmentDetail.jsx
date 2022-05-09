import { useIntl } from 'react-intl';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { InboxIcon } from '@heroicons/react/solid';

import useEnrollmentStatusTypes from '../hooks/useEnrollmentStatusTypes';
import StatusProgress from '../../common/components/StatusProgress';
import Accordion from '../../common/components/Accordion';
import { getInterfaceLabel } from '../../common/utils/utils';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import Form from '../../forms/components/Form';
import JSONAreaField from '../../forms/components/JSONAreaField';
import useForm from '../../forms/hooks/useForm';
import SubscriptionList from './SubscriptionList';
import Button from '../../common/components/Button';
import useActivateEnrollment from '../hooks/useActivateEnrollment';
import useModal from '../../modal/hooks/useModal';
import AlertMessage from '../../modal/components/AlertMessage';
import useTerminateEnrollment from '../hooks/useTerminateEnrollment';
import useSendEnrollmentEmail from '../hooks/useSendEnrollmentEmail';
import DangerMessage from '../../modal/components/DangerMessage';
import EnrollmentDetailHeader from './EnrollmentDetailHeader';

const EnrollmentDetail = ({ enrollment }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();

  const { enrollmentStatusTypes } = useEnrollmentStatusTypes();
  const { activateEnrollment } = useActivateEnrollment();
  const { terminateEnrollment } = useTerminateEnrollment();
  const { sendEnrollmentEmail } = useSendEnrollmentEmail();

  const onActivateEnrollment = async () => {
    await setModal(
      <AlertMessage
        buttonText={formatMessage({
          id: 'activate_button',
          defaultMessage: 'Activate',
        })}
        headerText={formatMessage({
          id: 'activate_header_title',
          defaultMessage: 'Activate subscription.',
        })}
        message={formatMessage({
          id: 'activate_header_conformation',
          defaultMessage: 'Are you sure you want to this subscription?',
        })}
        onOkClick={async () => {
          setModal('');
          await activateEnrollment();
          toast.success(
            formatMessage({
              id: 'success_message',
              defaultMessage: 'Subscription successfully activated.',
            }),
          );
        }}
      />,
    );
  };

  const EmailIcon = (
    <div className="flex w-full items-center justify-center">
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
        <InboxIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
      </div>
    </div>
  );

  const onSendEnrollmentEmail = async () => {
    await setModal(
      <AlertMessage
        icon={EmailIcon}
        buttonText={formatMessage({
          id: 'send_button',
          defaultMessage: 'Send',
        })}
        headerText={formatMessage({
          id: 'send_activation_email_header',
          defaultMessage: 'Send Email.',
        })}
        message={formatMessage({
          id: 'send_activation_email_confirm',
          defaultMessage: 'Are you sure you want to send email?',
        })}
        onOkClick={async () => {
          setModal('');
          await sendEnrollmentEmail({ enrollmentId: enrollment._id });
          toast.success(
            formatMessage(
              {
                id: 'terminate_enrollment_success',
                defaultMessage:
                  'Subscription {enrollmentId} terminated successfully',
              },
              {
                enrollmentId: enrollment._id,
              },
            ),
          );
        }}
      />,
    );
  };

  const onTerminateEnrollment = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'terminate_enrollment_confirmation',
          defaultMessage:
            'Are you sure you want to terminate this subscription? ',
        })}
        onOkClick={async () => {
          setModal('');
          await terminateEnrollment({ enrollmentId: enrollment._id });
          toast.success(
            formatMessage(
              {
                id: 'terminate_enrollment_success',
                defaultMessage:
                  'Subscription {enrollmentId} terminated successfully',
              },
              {
                enrollmentId: enrollment._id,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'terminate_subscription',
          defaultMessage: 'Terminate subscription',
        })}
      />,
    );
  };

  const timeline = {
    INITIAL: {
      id: 1,
      content: 'created',
      visible: true,
    },
    ACTIVE: {
      id: 2,
      content: 'updated',
      visible: true,
    },
    PAUSED: {
      id: 3,
      content: 'updated',
      visible: true,
      Component: enrollment.status === 'PAUSED' && (
        <Button
          text="Activate"
          onClick={onActivateEnrollment}
          className="rounded-md text-base"
        />
      ),
    },
    TERMINATED: {
      id: 4,
      content: 'updated',
      visible: true,
      Component: enrollment.status !== 'TERMINATED' && (
        <Button
          text={formatMessage({
            id: 'terminate_enrollment',
            defaultMessage: 'Terminate Enrollment',
          })}
          onClick={onTerminateEnrollment}
          className="rounded-md border-red-500 bg-red-500 text-base hover:bg-red-700 focus:border-red-500 focus:outline-none focus:ring-0 focus:ring-red-500"
        />
      ),
    },
  };

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-t-md border border-slate-300 bg-slate-100 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400';

  const periods = {
    header: (
      <span className="flex">
        {formatMessage({
          id: 'periods',
          defaultMessage: 'Periods',
        })}
      </span>
    ),
    body: <SubscriptionList periods={enrollment.periods} />,
  };

  const form = useForm({
    initialValues: {
      configuration: JSON.stringify(
        enrollment.plan.configuration || {},
        null,
        2,
      ),
      length: enrollment.plan.configuration,
    },
  });

  return (
    <>
      <EnrollmentDetailHeader enrollment={enrollment} />
      <StatusProgress
        data={enrollment}
        statusTypes={enrollmentStatusTypes}
        timeline={timeline}
      />

      <section className="rounded-md border border-slate-300 bg-white">
        <div className="mx-auto -mt-12 max-w-7xl px-4 pb-4 sm:px-6 sm:pb-16 lg:px-8">
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-y-8 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
            <div className="w flex flex-auto flex-col gap-y-4 gap-x-8 sm:col-span-2 sm:gap-y-8 lg:col-span-3 lg:grid-cols-12 lg:flex-row">
              <div className="flex flex-auto flex-col gap-y-8 pt-4 lg:col-span-6">
                <span className="h relative h-48 w-full rounded-lg">
                  {/* <Image
                    loader={defaultNextImageLoader}
                    src={enrollment.plan.product.media.file.url}
                    alt={enrollment?.plan?.product?.text?.title}
                    layout="fill"
                    objectFit="contain"
                  /> */}
                  <Image
                    loader={defaultNextImageLoader}
                    src="https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg"
                    alt={enrollment?.plan?.product?.text?.title}
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                </span>
                <div className="flex flex-col">
                  <dt className="font-medium text-slate-900">
                    {formatMessage({
                      id: 'product_title',
                      defaultMessage: 'Product',
                    })}
                  </dt>
                  <dd className="my-2 text-sm text-slate-500">
                    {enrollment.plan.product.texts.title}
                  </dd>
                  <dt className="font-medium text-slate-900">
                    {formatMessage({
                      id: 'product_quantity',
                      defaultMessage: 'Quantity',
                    })}
                  </dt>
                  <dd className="my-2 text-sm text-slate-500">
                    {enrollment?.plan?.quantity}
                  </dd>
                </div>
              </div>

              <div className="flex-auto border-t border-slate-200 pt-4 lg:col-span-6 lg:border-0">
                <Form form={form}>
                  <JSONAreaField
                    disabled
                    className="mt-2 text-sm text-slate-500"
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

            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-8 lg:col-span-2 lg:grid-cols-2 lg:gap-x-8">
              <div className="border-t border-slate-200 pt-4">
                <dt className="font-medium text-slate-900">
                  {formatMessage({
                    id: 'payment_provider',
                    defaultMessage: 'Payment provider',
                  })}
                </dt>
                <dd className="mt-2 text-sm text-slate-500">
                  <Link
                    href={`/payment-provider/${enrollment?.payment?.provider._id}`}
                  >
                    <a className="text-blue-600 dark:text-blue-400">
                      {getInterfaceLabel(enrollment.payment.provider.interface)}
                    </a>
                  </Link>
                </dd>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <dt className="font-medium text-slate-900">
                  {formatMessage({
                    id: 'delivery_provider',
                    defaultMessage: 'Delivery Provider',
                  })}
                </dt>
                <dd className="mt-2 text-sm text-slate-500">
                  <Link
                    href={`/delivery-provider/${enrollment?.delivery?.provider._id}`}
                  >
                    <a className="text-blue-600 dark:text-blue-400">
                      {getInterfaceLabel(
                        enrollment.delivery.provider.interface,
                      )}
                    </a>
                  </Link>
                </dd>
              </div>

              <div className="col-span-1 border-t border-slate-200 pt-4">
                <dt className="font-medium text-slate-900">
                  {formatMessage({
                    id: 'contact',
                    defaultMessage: 'Contact',
                  })}
                </dt>
                <dd className="mt-2 text-sm text-slate-500">
                  {enrollment?.contact?.telNumber}
                </dd>
                <dd className="mt-2 text-sm text-slate-500">
                  {enrollment?.contact?.emailAddress}
                </dd>
                <dd className="mt-2 text-sm text-slate-500">
                  <Button
                    text={formatMessage({
                      id: 'send_email_button',
                      defaultMessage: 'Send Email',
                    })}
                    className="rounded-md"
                    onClick={onSendEnrollmentEmail}
                  />
                </dd>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <dt className="font-medium text-slate-900">
                {formatMessage({
                  id: 'billing_address',
                  defaultMessage: 'Billing address',
                })}
              </dt>
              <dd className="mt-2 text-sm text-slate-500">
                {enrollment?.billingAddress?.firstName}&nbsp;&nbsp;
                {enrollment?.billingAddress?.lastName}
              </dd>
              <dd className="mt-2 text-sm text-slate-500">
                {enrollment?.billingAddress?.company}
              </dd>
              <dd className="mt-2 text-sm text-slate-500">
                {enrollment?.billingAddress?.addressLine}
              </dd>
              <dd className="mt-2 text-sm text-slate-500">
                {enrollment?.billingAddress?.addressLine2}
              </dd>
              <dd className="mt-2 text-sm text-slate-500">
                {enrollment?.billingAddress?.postalCode}
              </dd>
              <dd className="mt-2 text-sm text-slate-500">
                {enrollment?.billingAddress?.city}&nbsp;&nbsp;
                {enrollment?.billingAddress?.regionCode}&nbsp;&nbsp;
                {enrollment?.billingAddress?.countryCode}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Accordion data={[periods]} headerCSS={headerCSS} />
    </>
  );
};

export default EnrollmentDetail;
