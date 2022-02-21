import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import useWork from '../../modules/work/hooks/useWork';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import WorkDetail from '../../modules/work/components/WorkDetail';

const WorkDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { id } = query;
  const { work, loading } = useWork({ workId: id });

  return (
    <>
      <div className="mt-6 max-w-full">
        {console.log(work)}
        <BreadCrumbs />
        <PageHeader
          headerText={formatMessage({
            id: 'work_detail',
            defaultMessage: 'Work Detail',
          })}
        />
        {loading ? <Loading /> : <WorkDetail work={work} />}
      </div>
    </>
  );
};

export default WorkDetailPage;
