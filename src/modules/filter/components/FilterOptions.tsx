import { useIntl } from 'react-intl';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import { OnSubmitType } from '../../forms/hooks/useForm';

import useModal from '../../modal/hooks/useModal';
import useCreateFilterOption from '../hooks/useCreateFilterOption';
import useFilterOptions from '../hooks/useFilterOptions';
import FilterOptionForm from './FilterOptionForm';

import FilterOptionsList from './FilterOptionsList';
import useAuth from '../../Auth/useAuth';
import { useCallback, useEffect } from 'react';
import useTranslatedFilterTexts from '../hooks/useTranslatedFilterTexts';

const FilterOptions = ({
  filterId,
  selectedLocale = null,
  addAdditionalLocales = null,
}) => {
  const { formatMessage } = useIntl();
  const { filterOptions } = useFilterOptions({ filterId });
  const { translatedFilterTexts } = useTranslatedFilterTexts({ filterId });
  const { setModal } = useModal();

  const { createFilterOption } = useCreateFilterOption();
  const { hasRole } = useAuth();
  const onSubmit: OnSubmitType = useCallback(
    async ({ value, title }) => {
      await createFilterOption({
        filterId,
        option: value,
        texts: [{ title, locale: selectedLocale }],
      });
      setModal('');
      return { success: true };
    },
    [selectedLocale, filterId],
  );

  useEffect(() => {
    if (typeof addAdditionalLocales === 'function')
      addAdditionalLocales(translatedFilterTexts.map((l) => l.locale));
  }, [translatedFilterTexts, selectedLocale]);
  return (
    <SelfDocumentingView
      documentationLabel={formatMessage({
        id: 'filer_options',
        defaultMessage: 'Filter options',
      })}
      sideComponents={
        hasRole('addFilterOption') ? (
          <button
            type="button"
            onClick={() =>
              setModal(
                <FilterOptionForm
                  onSubmit={onSubmit}
                  onCancel={() => setModal('')}
                />,
              )
            }
            className="fixed top-0 right-0 z-10 mb-5  mt-5 mr-2 h-9 rounded-md border  border-transparent bg-indigo-500 px-3 py-1 text-sm font-medium  leading-5 text-white shadow-xs sm:fixed sm:top-auto sm:right-auto"
          >
            {formatMessage({
              id: 'add_filter_option',
              defaultMessage: 'Add option',
            })}
          </button>
        ) : null
      }
    >
      <div className="mt-8 w-full border-slate-200 dark:border-slate-800 p-3 sm:mt-0 shadow-md  bg-white dark:bg-slate-900">
        <FilterOptionsList
          filterId={filterId}
          options={filterOptions.filter(
            ({ texts: { locale } }) => locale === selectedLocale,
          )}
        />
      </div>
    </SelfDocumentingView>
  );
};

export default FilterOptions;
