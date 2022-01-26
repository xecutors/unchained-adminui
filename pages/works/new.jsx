import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import WorkForm from '../../modules/work/components/WorkForm';
import useAddWork from '../../modules/work/hooks/useAddWork';

const AddWork = () => {
  const { push: routerPush, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { addWork } = useAddWork();

  const onSubmit = async ({ input }) => {
    await addWork({
      input,
      workQueueId: id,
    });
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
          id: 'add_work_header',
          defaultMessage: 'Add Work',
        })}
      />
      <FormHeader>
        <WorkForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
      </FormHeader>
    </div>
  );
};
export default AddWork;
