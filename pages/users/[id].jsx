import { useIntl } from 'react-intl';

const UserProfile = () => {
  const { formatMessage } = useIntl();

  const userProfileSettingOptions = {
    profile: formatMessage({ id: 'profile', defaultMessage: 'Profile' }),
    account: formatMessage({ id: 'account', defaultMessage: 'Account' }),
    orders: formatMessage({ id: 'orders', defaultMessage: 'Orders' }),
    enrollment: formatMessage({
      id: 'enrollment',
      defaultMessage: 'Enrollment',
    }),
    payment_credentials: formatMessage({
      id: 'payment_credentials',
      defaultMessage: 'Payment credentials',
    }),

    logs: formatMessage({
      id: 'logs',
      defaultMessage: 'Logs',
    }),
  };

  return (
    <main>
      <div className="relative max-w-4xl md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0">
            <div className="py-6">
              <div className="lg:hidden">
                <label htmlFor="selected-tab" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="selected-tab"
                  name="selected-tab"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  {Object.entries(userProfileSettingOptions).map(
                    ([key, value]) => (
                      <option key={`mobile-${key}`} value={key}>
                        {value}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="hidden lg:block">
                <div className="border-b border-gray-200 al">
                  <nav className="-mb-px flex space-x-8">
                    {Object.entries(userProfileSettingOptions).map(
                      ([key, value]) => (
                        <a
                          key={key}
                          href="#"
                          className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        >
                          {value}
                        </a>
                      ),
                    )}
                  </nav>
                </div>
              </div>

              <div className="mt-10 divide-y divide-gray-200">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Profile
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>
                  <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                    <button
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
                      <dt className="text-sm font-medium text-gray-500">
                        Photo
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </span>
                        <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                          <button
                            type="button"
                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Name
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">Chelsea Hagon</span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Gender
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">Chelsea Hagon</span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Birthday
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">Chelsea Hagon</span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">Chelsea Hagon</span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-10 divide-y divide-gray-200">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Address
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>
                  <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                    <button
                      type="button"
                      className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Update
                    </button>
                  </span>
                </div>
                <div className="mt-6">
                  <dl className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">
                    <div className="py-4 sm:py-5 grid-cols-3">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">John Doe</span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Company
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">Unchained Commerce</span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:pt-5">
                      <dt className="text-sm font-medium text-gray-500">
                        Address line 1 (Street, House no)
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                          Bole, Addis Ababa (2016)
                        </span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:pt-5">
                      <dt className="text-sm font-medium text-gray-500">
                        Address line 2
                      </dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">
                          Bole, Addis Ababa (2016)
                        </span>
                      </dd>
                    </div>

                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Region
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">ET</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Postal/ZIP code
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">30000</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        City
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Addis Ababa
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
