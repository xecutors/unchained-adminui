import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CountryList from '../../modules/country/components/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';

const Country = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { formatMessage } = useIntl();
  const [includeInactive, setIncludeInactive] = useState(false);
  const [offset, setOffset] = useState(0);

  const onOffsetChange = (value) => {
    setOffset(value);
  };
  const { countries, countriesCount, loadMore, loading } = useCountries({
    limit,
    includeInactive,
    offset,
  });

  const { setModal } = useModal();
  const { removeCountry } = useRemoveCountry();
  const onRemoveCountry = async (countryId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_country_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this country? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeCountry({ countryId });
          toast.success(
            formatMessage(
              {
                id: 'country_deleted',
                defaultMessage: 'Country {id} deleted successfully',
              },
              {
                id: countryId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_country',
          defaultMessage: 'Delete country',
        })}
      />,
    );
  };
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'countries',
          defaultMessage: 'Countries',
        })}
      />
      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/country/new">
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleState={includeInactive}
            onToggle={setIncludeInactive}
          />
        </ListHeader>
        {loading ? (
          <Loading />
        ) : (
          <CountryList
            countries={countries}
            onRemoveCountry={onRemoveCountry}
          />
        )}
        <ListPagination
          onLoadMore={loadMore}
          data={countries}
          total={countriesCount}
          onLimitChange={setLimit}
          limit={limit}
          offset={offset}
          onOffsetChange={onOffsetChange}
        />
      </div>
    </>
  );
};

export default Country;
