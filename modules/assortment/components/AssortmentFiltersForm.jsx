import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentFilter from '../hooks/useAddAssortmentFilter';

import FilterableDropdown from '../../common/components/FilterableDropdown';
import useFiltersList from '../../filter/hooks/useFiltersList';
import TagInputField from '../../forms/components/TagInputField';
import ACTION_ROLES from '../../common/data/roles';

import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import FormErrors from '../../forms/components/FormErrors';

const normalizeFilters = (filterList) => {
  return filterList?.map(({ _id, texts, key }) => ({
    id: _id,
    title: ` (${key})-${texts?.title}`,
  }));
};

const AssortmentFiltersForm = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { addAssortmentFilter } = useAddAssortmentFilter();
  const { hasRole } = useAuth();
  const { filters } = useFiltersList({ limit: 300 });

  const [queryString, setQueryString] = useState('');
  const [filteredFilters, setFilteredFilters] = useState(() =>
    normalizeFilters(filters),
  );

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const onSubmit = async ({ filterId, tags }) => {
    await addAssortmentFilter({ filterId, assortmentId, tags });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      filterId: '',
      tags: '',
    },
  });

  return (
    <FormWrapper>
      <Form form={form} id="assortment_filter_form">
        <div className="shadow dark:shadow-none sm:rounded-md">
          <div className="grid gap-6 px-4 py-5 sm:p-6">
            <div className="col-span-12">
              <TagInputField
                name="tags"
                id="tags"
                label={formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
                className="mt-1 w-full py-2 text-sm font-medium text-slate-500 sm:ml-1"
              />
              <FilterableDropdown
                name="filterId"
                required
                label={formatMessage({
                  id: 'filter',
                  defaultMessage: 'Filter',
                })}
                data={filteredFilters}
                queryString={queryString}
                onFilter={(val) => {
                  setQueryString(val);
                  setFilteredFilters(
                    normalizeFilters(filters).filter((item) => {
                      return (
                        item?.title
                          ?.toLowerCase()
                          .includes(val?.toLowerCase()) ||
                        item?.subtitle?.toLowerCase() === val?.toLowerCase() ||
                        !val
                      );
                    }),
                  );
                }}
                className="mt-1 w-full py-2 text-sm font-medium text-slate-500"
              />
            </div>
          </div>
          <FormErrors />
          <div className="border-t-indigo-50 border-t dark:border-t-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-5 text-right sm:px-6">
            <SubmitButton
              hidden={!hasRole(ACTION_ROLES.assortments.addFilter)}
              label={formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            />
          </div>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default AssortmentFiltersForm;
