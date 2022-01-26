import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import DoWorkForm from '../../modules/work/components/DoWorkForm';
import useWorkQueue from '../../modules/work/hooks/useWorkQueue';

const Dowork = () => {
  const { push: routerPush, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { workQueue } = useWorkQueue({
    workQueueId: id,
  });

  const onSubmit = async ({ input }) => {
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/dowork');
  };
  return (
    <div className="mt-6 max-w-4xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_do_work_header',
          defaultMessage: 'Do Work',
        })}
      />
      <FormHeader
        headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
      >
        <DoWorkForm
          // onSubmit={onSubmit}
          // onSubmitSuccess={onSubmitSuccess}
          defaultValue={workQueue?.input || []}
        />
      </FormHeader>
    </div>
  );
};

export default Dowork;
