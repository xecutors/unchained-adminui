import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import AllocateWorkForm from '../../modules/work/components/AllocateWorkForm';
import useWorkQueue from '../../modules/work/hooks/useWorkQueue';

const AllocateWork = () => {
  const { push: routerPush, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { workQueue } = useWorkQueue({
    workQueueId: id,
  });
  const onSubmit = async () => {
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/allocatework');
  };
  return (
    <div className="mt-6 max-w-4xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_allocate_work_header',
          defaultMessage: 'Allocate Work',
        })}
      />
      <FormHeader
        headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
      >
        <AllocateWorkForm defaultValue={workQueue?.input || []} />
      </FormHeader>
    </div>
  );
};

export default AllocateWork;
