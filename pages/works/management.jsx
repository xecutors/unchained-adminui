import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import AllocateWorkForm from '../../modules/work/components/AllocateWorkForm';
import DoWorkForm from '../../modules/work/components/DoWorkForm';
import WorkForm from '../../modules/work/components/WorkForm';

const getCurrentTab = (current) => {
  if (current === 'add_work') return <WorkForm />;
  if (current === 'do_work') return <DoWorkForm />;
  if (current === 'allocate_work') return <AllocateWorkForm />;
  return <></>;
};
const WorkManagement = () => {
  const { formatMessage } = useIntl();
  const [activeTab, setActiveTab] = useState('add_work');

  const workSettingOptions = {
    add_work: formatMessage({ id: 'add_work', defaultMessage: 'Add Work' }),
    do_work: formatMessage({ id: 'do_work', defaultMessage: 'Do Work' }),
    allocate_work: formatMessage({
      id: 'allocate_work',
      defaultMessage: 'Allocate Work',
    }),
  };

  return (
    <div className="mt-6 max-w-4xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'work_management_setting_list_header',
          defaultMessage: 'Work Management setting',
        })}
      />
      <div className=" sm:px-6 md:px-0">
        <div className="py-6">
          <div className="lg:hidden">
            <label htmlFor="selected-tab" className="sr-only">
              {formatMessage({
                id: 'select_tab',
                defaultMessage: 'Select a tab',
              })}
            </label>

            <select
              onChange={(e) => setActiveTab(e.target.value)}
              id="selected-tab"
              name="selected-tab"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              value={activeTab}
            >
              {Object.entries(workSettingOptions).map(([key, value]) => (
                <option key={`mobile-${key}`} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden lg:block">
            <div className="border-b border-gray-200 al">
              <nav className="-mb-px flex space-x-8">
                {Object.entries(workSettingOptions).map(([key, value]) => (
                  <a
                    onClick={() => setActiveTab(key)}
                    key={key}
                    className={` ${
                      activeTab === key && 'border-purple-500 text-purple-600'
                    }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {value}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="mt-5">{getCurrentTab(activeTab)}</div>
        </div>
      </div>
    </div>
  );
};

export default WorkManagement;
