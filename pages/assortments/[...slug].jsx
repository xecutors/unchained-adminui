import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import AssortmentDetail from '../../modules/assortment/components/AssortmentDetail';
import useAssortment from '../../modules/assortment/hooks/useAssortment';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';

const AssortmentDetailPage = () => {
  const { formatDateTime } = useFormatDateTime();
  const { query } = useRouter();
  const { slug = [] } = query || {};
  const normalizedSlug = slug?.join('/');
  const { assortment, loading } = useAssortment({
    slug: normalizedSlug,
  });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs routeName={slug.join('/')} depth={3} />
      <PageHeader
        headerText={
          <FormattedMessage
            id="assortment_detail_header"
            defaultMessage="Assortment detail <b>({id})</b>"
            values={{
              b: (chunks) => <b className="text-lg">{chunks}</b>,

              id: assortment?._id,
            }}
          />
        }
      >
        <div>
          {assortment?.created && (
            <FormattedMessage
              id="added_date"
              defaultMessage="<b>Created :</b>  {created} "
              values={{
                b: (chunks) => <b>{chunks}</b>,

                created: formatDateTime(assortment.created, {
                  dateStyle: 'long',
                  timeStyle: 'short',
                }),
              }}
              tagName="div"
            />
          )}

          {assortment?.updated && (
            <FormattedMessage
              id="updated_date"
              defaultMessage="<b>Updated :</b>  {updated} "
              values={{
                b: (chunks) => <b>{chunks}</b>,

                updated: formatDateTime(assortment.updated, {
                  dateStyle: 'long',
                  timeStyle: 'short',
                }),
              }}
              tagName="div"
            />
          )}
        </div>
      </PageHeader>
      {loading ? <Loading /> : <AssortmentDetail assortment={assortment} />}
    </div>
  );
};

export default AssortmentDetailPage;
