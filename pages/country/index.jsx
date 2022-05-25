import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CountryList from '../../modules/country/components/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';

import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';

const Country = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeInactive = query?.includeInactive === 'true';
  const { hasRole } = useAuth();

  const { countries, countriesCount, loading } = useCountries({
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
            formatMessage({
              id: 'country_deleted',
              defaultMessage: 'Country deleted successfully',
            }),
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

      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={hasRole(ACTION_ROLES.country.create) && '/country/new'}
        >
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleKey="includeInactive"
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
        <Pagination data={countries} total={countriesCount} />
      </div>
    </>
  );
};

export default Country;
