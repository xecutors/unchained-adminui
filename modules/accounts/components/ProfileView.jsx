const ProfileView = ({
  profile,
  avatar,
  username,
  isEmailVerified,
  isGuest,
  isInitialPassword,
  name,
  onUpdate,
  onUpdateAvatar,
}) => {
  const { address } = profile;
  return (
    <>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
          <button
            onClick={onUpdate}
            type="button"
            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Update
          </button>
        </span>
      </div>
      <div className="mt-6">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">Photo</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                {avatar ? (
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={avatar?.url}
                    alt=""
                  />
                ) : (
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
              </span>
              <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                <button
                  onClick={onUpdateAvatar}
                  type="button"
                  className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{name}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Username</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{username}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Gender</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{profile?.gender}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Birthday</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{profile?.birthday}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{profile?.phoneMobile}</span>
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Address
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">
          <div className="py-4 sm:py-5 grid-cols-3">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                {address?.firstName} {address?.lastName}{' '}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium text-gray-500">Company</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{address?.company}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">
              Address line 1 (Street, House no)
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{address?.addressLine}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">
              Address line 2
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{address?.addressLine}</span>
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Region</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {address?.regionCode}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Postal/ZIP code
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {address?.postalCode}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">City</dt>
            <dd className="mt-1 text-sm text-gray-900">{address?.city}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Country code</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {address?.countryCode}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default ProfileView;
