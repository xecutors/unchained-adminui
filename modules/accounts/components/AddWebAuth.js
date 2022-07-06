import { useIntl } from 'react-intl';
import useAddWebAuth from '../hooks/useAddWebAuth';
import useWebAuth from '../hooks/useWebAuth';

const base64ToArrayBuffer = (b64) => {
  const binaryString = window.atob(b64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const AddWebAuth = ({ currentUser }) => {
  const { formatMessage } = useIntl();
  const { createWebAuth } = useWebAuth();
  const { addWebAuth } = useAddWebAuth();

  const handleOnClick = async () => {
    const { data } = await createWebAuth({
      username: currentUser?.email,
    });

    const { createWebAuthnCredentialCreationOptions: publicKey } = data;

    const textEncoder = new TextEncoder('utf-8');
    publicKey.challenge = base64ToArrayBuffer(publicKey.challenge);
    publicKey.user = {
      id: textEncoder.encode(currentUser?.email),
      name: currentUser?.name,
      displayName: currentUser?.profile?.displayName,
    };

    const publicKeyCredentials = await navigator.credentials.create({
      publicKey,
    });

    console.log('publicKeyCredentials: ', publicKeyCredentials);

    // const attestationObject = window.btoa(
    //   String.fromCharCode(
    //     ...new Uint8Array(publicKeyCredentials.response.attestationObject),
    //   ),
    // );
    // const clientDataJSON = window.btoa(
    //   String.fromCharCode(
    //     ...new Uint8Array(publicKeyCredentials.response.clientDataJSON),
    //   ),
    // );
    // const rawId = window.btoa(
    //   String.fromCharCode(...new Uint8Array(publicKeyCredentials.rawId)),
    // );

    // const webAuthnPublicKeyCredentials = {
    //   id: rawId,
    //   response: {
    //     clientDataJSON,
    //     attestationObject,
    //   },
    // };

    // const result = await addWebAuth({
    //   credentials: publicKeyCredentials,
    // });

    console.log('Public Credentials: ', publicKeyCredentials);
    // console.log('new device: ', result);
  };

  return (
    <div className="overflow-hidden lg:flex">
      <div className="mb-7 border-slate-200 pb-2 sm:flex sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
          {formatMessage({
            id: 'web_authentication',
            defaultMessage: 'Web Authentication',
          })}
        </h3>
      </div>
      <div className="w-full border-b border-slate-200 bg-white dark:border-2 dark:bg-slate-600 rounded-md lg:ml-auto lg:w-4/6">
        <button
          type="button"
          className="inline-flex cursor-pointer my-4 ml-4 justify-center rounded-md border border-transparent px-4 py-2 text-center text-sm font-medium leading-5 text-white shadow-sm focus:ring-indigo-400 bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={handleOnClick}
        >
          {formatMessage({
            id: 'add_web_auth',
            defaultMessage: 'Add WebAuth',
          })}
        </button>
      </div>
    </div>
  );
};

export default AddWebAuth;
