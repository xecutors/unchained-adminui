import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import AssortmentDetail from '../../modules/assortment/components/AssortmentDetail';
import useAssortment from '../../modules/assortment/hooks/useAssortment';
import Badge from '../../modules/common/components/Badge';

const AssortmentDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { slug = '' } = query || {};
  const { assortment, loading } = useAssortment({ slug });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'assortment_detail',
            defaultMessage: 'Assortment Detail',
          })}
        />
        <span className="self-end my-2 mr-auto">
          <Badge
            text={formatMessage({
              id: 'id',
              defaultMessage: `ID: ${assortment?._id}`,
            })}
            color="indigo"
          />
          {}
          {}
        </span>
      </div>
      {loading ? <Loading /> : <AssortmentDetail assortment={assortment} />}
    </div>
  );
};

export default AssortmentDetailPage;
