import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import WorkForm from '../../modules/work/components/WorkForm';
import useWorkQueue from '../../modules/work/hooks/useWorkQueue';

const AddWork = () => {
  const { push: routerPush, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { workQueue } = useWorkQueue({
    workQueueId: id,
  });

  const onSubmit = async ({ input }) => {
    // await ({
    // input,
    // workQueueId: id,
    // });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/works');
  };
  return (
    <div className="mt-6 max-w-4xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_filter_header',
          defaultMessage: 'New Work',
        })}
      />
      <FormHeader
        headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
      >
        <WorkForm
          // onSubmit={onSubmit}
          // onSubmitSuccess={onSubmitSuccess}
          defaultValue={workQueue?.input || []}
        />
      </FormHeader>
    </div>
  );
};
export default AddWork;
