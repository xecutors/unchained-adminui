import { useIntl } from 'react-intl';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { InboxIcon } from '@heroicons/react/solid';
import LogList from '../../order/components/LogList';
import useEnrollmentStatusTypes from '../hooks/useEnrollmentStatusTypes';
import Header from '../../common/components/Header';
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
          defaultMessage: 'Activate subscritpion.',
        })}
        message={formatMessage({
          id: 'activate_header_conformation',
          defaultMessage: 'Are you sure you want to this subscritpion?',
        })}
        onOkClick={async () => {
          setModal('');
          await activateEnrollment();
          toast.success(
            formatMessage({
              id: 'success_message',
              defaultMessage: 'Subscritpion successfully activated.',
            }),
          );
        }}
      />,
    );
  };

  const EmailIcon = (
    <div className="flex justify-center items-center w-full">
      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
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
          id: 'activate_header',
          defaultMessage: 'Send Email.',
        })}
        message={formatMessage({
          id: 'activate_header',
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
          className="text-base rounded-md"
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
          className="text-base rounded-md border-red-500 bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-red-500 focus:border-red-500"
        />
      ),
    },
  };

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-t-md border border-gray-300 bg-grey-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500';

  const logs = {
    header: (
      <span className="flex">
        {formatMessage({
          id: 'logs',
          defaultMessage: 'Logs',
        })}
      </span>
    ),
    body: <LogList logs={enrollment.logs} user={enrollment.user} />,
  };

  const periods = {
    header: (
      <span className="flex">
        {formatMessage({
          id: 'subscription',
          defaultMessage: 'Subscription',
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
    },
  });

  return (
    <>
      <Header name="enrollment" data={enrollment} />
      <StatusProgress
        data={enrollment}
        statusTypes={enrollmentStatusTypes}
        timeline={timeline}
      />

      <section className="bg-white rounded-md border border-gray-300">
        <div className="-mt-12 max-w-7xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
          <dl className="mt-16 max-w-2xl mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
            <div className="sm:col-span-2 lg:col-span-3 grid lg:grid-cols-12 gap-y-10 sm:gap-y-16">
              <div className="pt-4 flex gap-x-12 lg:col-span-6">
                <Image
                  loader={defaultNextImageLoader}
                  src={enrollment.plan.product.media.file.url}
                  alt={enrollment?.plan?.product?.text?.title}
                  width={200}
                  height={200}
                />
                <div className="flex flex-col justify-evenly">
                  <dt className="font-medium text-gray-900">
                    {formatMessage({
                      id: 'payment_provider',
                      defaultMessage: 'Product',
                    })}
                  </dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {enrollment.plan.product.texts.title}
                  </dd>
                  <dt className="font-medium text-gray-900">
                    {formatMessage({
                      id: 'product_quantity',
                      defaultMessage: 'Quantity',
                    })}
                  </dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {enrollment?.plan?.quantity}
                  </dd>
                </div>
              </div>

              <div className="border-t border-gray-200 lg:border-0 pt-4 lg:col-span-6">
                <Form form={form}>
                  <label
                    htmlFor="configuration"
                    className="block text-lg font-medium text-gray-900"
                  >
                    {formatMessage({
                      id: 'configuration',
                      defaultMessage: 'Configuration',
                    })}
                  </label>
                  <JSONAreaField
                    disabled
                    className="mt-2 text-sm text-gray-500"
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

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">
                {formatMessage({
                  id: 'payment_provider',
                  defaultMessage: 'Payment Provider',
                })}
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                <Link
                  href={`/payment-provider/${enrollment?.payment?.provider._id}`}
                >
                  <a className="text-blue-600">
                    {getInterfaceLabel(enrollment.payment.provider.interface)}
                  </a>
                </Link>
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">
                {formatMessage({
                  id: 'delivery_provider',
                  defaultMessage: 'Delivery Provider',
                })}
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                <Link
                  href={`/delivery-provider/${enrollment?.delivery?.provider._id}`}
                >
                  <a className="text-blue-600">
                    {getInterfaceLabel(enrollment.delivery.provider.interface)}
                  </a>
                </Link>
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">
                {formatMessage({
                  id: 'billing_address',
                  defaultMessage: 'Billing Address',
                })}
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                {enrollment?.billingAddress?.firstName}&nbsp;&nbsp;
                {enrollment?.billingAddress?.lastName}
              </dd>
              <dd className="mt-2 text-sm text-gray-500">
                {enrollment?.billingAddress?.company}
              </dd>
              <dd className="mt-2 text-sm text-gray-500">
                {enrollment?.billingAddress?.addressLine}
              </dd>
              <dd className="mt-2 text-sm text-gray-500">
                {enrollment?.billingAddress?.addressLine2}
              </dd>
              <dd className="mt-2 text-sm text-gray-500">
                {enrollment?.billingAddress?.postalCode}
              </dd>
              <dd className="mt-2 text-sm text-gray-500">
                {enrollment?.billingAddress?.city}&nbsp;&nbsp;
                {enrollment?.billingAddress?.regionCode}&nbsp;&nbsp;
                {enrollment?.billingAddress?.countryCode}
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4  lg:w-full lg:col-span-3 grid lg:grid-cols-12">
              <div className="lg:col-span-4">
                <dt className="font-medium text-gray-900">
                  {formatMessage({
                    id: 'billing_address',
                    defaultMessage: 'Contact',
                  })}
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {enrollment?.contact?.telNumber}
                </dd>
                <dd className="mt-2 text-sm text-gray-500">
                  {enrollment?.contact?.emailAddress}
                </dd>
                <dd className="mt-2 text-sm text-gray-500">
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
              <Accordion
                data={[periods]}
                headerCSS={headerCSS}
                containerCSS="hidden lg:block lg:col-span-8 mt-3 lg:mt-0"
              />
            </div>
          </dl>
        </div>
      </section>

      <Accordion
        data={[periods]}
        headerCSS={headerCSS}
        containerCSS="lg:hidden lg:col-span-8 mt-0 lg:mt-3"
      />

      <Accordion data={[logs]} headerCSS={headerCSS} />
    </>
  );
};

export default EnrollmentDetail;
