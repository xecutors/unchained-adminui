import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import TabComponent from '../../modules/common/components/TabComponent';
import AllocateWorkForm from '../../modules/work/components/AllocateWorkForm';
import DoWorkForm from '../../modules/work/components/DoWorkForm';
import WorkForm from '../../modules/work/components/WorkForm';

const GetCurrentTab = ({ selectedView }) => {
  if (selectedView === 'add_work') return <WorkForm />;
  if (selectedView === 'do_work') return <DoWorkForm />;
  if (selectedView === 'allocate_work') return <AllocateWorkForm />;
  return <></>;
};
const WorkManagement = () => {
  const { formatMessage } = useIntl();

  const workSettingOptions = [
    {
      id: 'add_work',
      title: formatMessage({ id: 'add_work', defaultMessage: 'Add Work' }),
    },
    {
      id: 'do_work',
      title: formatMessage({ id: 'do_work', defaultMessage: 'Do Work' }),
    },
    {
      id: 'allocate_work',
      title: formatMessage({
        id: 'allocate_work',
        defaultMessage: 'Allocate Work',
      }),
    },
  ];

  return (
    <div className="mt-6 max-w-4xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'work_management_setting_list_header',
          defaultMessage: 'Work Management Settings',
        })}
      />
      <TabComponent tabItems={workSettingOptions} defaultTab="add_work">
        <GetCurrentTab />
      </TabComponent>
    </div>
  );
};

export default WorkManagement;
