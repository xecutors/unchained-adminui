import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import QRCode from 'qrcode.react';
import Toggle from '../../common/components/Toggle';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useBuildTOTPAuthURL from '../hooks/useBuildTOTPAuthURL';
import useEnableTOTP from '../hooks/useEnableTOTP';

const EnableTwoFactorAuthForm = () => {
  const { enableTOTP } = useEnableTOTP();
  const { formatMessage } = useIntl();
  const [otpauthUrl, setOtpauthUrl] = useState();
  const [showEnableForm, setEnableFormVisible] = useState(false);
  const { buildTOTPAuthURL } = useBuildTOTPAuthURL();

  useEffect(() => {
    const setTotp = async () => {
      const totpUrl = await buildTOTPAuthURL();
      setOtpauthUrl(totpUrl);
    };

    if (showEnableForm) {
      setTotp();
    }
  }, [showEnableForm]);

  const onSubmit = async ({ code }) => {
    await enableTOTP({ otpauthUrl, code });
  };
  const form = useForm({
    submit: onSubmit,
    initialValues: {
      code: '',
    },
    getSubmitErrorMessage: (error) => {
      if (error.message.includes("2FA code didn't match")) {
        form.formik.setFieldError(
          'code',
          formatMessage({
            id: 'totp_code_not_match',
            defaultMessage: 'TOTP code did not match',
          }),
        );
        return formatMessage({
          id: 'two_factor_code_not_match',
          defaultMessage: 'Two factor authentication code did not match',
        });
      }

      return '';
    },
  });

  return (
    <>
      <div className="flex align-middle ">
        <Toggle
          id="totp-toggle"
          onToggle={() => setEnableFormVisible(!showEnableForm)}
          toggleText={formatMessage({
            id: 'enable_totp',
            defaultMessage: 'Enable TOTP',
          })}
          className="ml-2 my-3"
          toggleKey="totp"
          active={showEnableForm}
        />
      </div>
      {showEnableForm && (
        <Form form={form}>
          <div className="relative max-w-full p-3 sm:flex justify-between space-y-6 sm:p-6">
            <QRCode
              style={{ width: 128, margin: 'auto' }}
              value={otpauthUrl}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="Q"
            />

            <TextField
              label={formatMessage({
                id: 'totp_code',
                defaultMessage: 'TOTP code',
              })}
              placeholder={formatMessage({
                id: 'totp_code',
                defaultMessage: 'TOTP code',
              })}
              name="code"
              id="code"
              required
              className="mb-4 text-sm sm:w-1/2"
            />
          </div>
          <FormErrors />
          <div className="border-t-indigo-50 border-t dark:border-t-slate-700 space-y-6 bg-slate-50 dark:bg-slate-800 text-right sm:p-6">
            <SubmitButton
              label={formatMessage({
                id: 'enable',
                defaultMessage: 'Enable',
              })}
            />
          </div>
        </Form>
      )}
    </>
  );
};

export default EnableTwoFactorAuthForm;
