import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentFilter from '../hooks/useAddAssortmentFilter';

import FormErrors from '../../forms/components/FormErrors';
import FilterableDropdown from '../../common/components/FilterableDropdown';
import useFiltersList from '../../filter/hooks/useFiltersList';

const normalizeFilters = (filterList) => {
  return filterList?.map(({ _id, texts, key }) => ({
    id: _id,
    title: ` (${key})-${texts?.title}`,
  }));
};

const AssortmentFiltersForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentFilter } = useAddAssortmentFilter();
  const { filters } = useFiltersList({ limit: 300 });

  const [filteredFilters, setFilteredFilters] = useState(() =>
    normalizeFilters(filters),
  );

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const onSubmit = async ({ filterId }) => {
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
    <Form form={form}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="grid gap-6 px-4 py-5 bg-white sm:p-6">
          <div className="col-span-12">
            <TagInput
              name="tags"
              id="tags"
              label={formatMessage({
                id: 'tags',
                defaultMessage: 'Tags',
              })}
              onChange={(newTags) => setTags(newTags)}
              autoComplete="on"
              options={{}}
              className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
            />
          </div>
          <div className="col-span-12">
            <FilterableDropdown
              name="filterId"
              required
              label={formatMessage({
                id: 'filter',
                defaultMessage: 'Filter',
              })}
              data={filteredFilters}
              onFilter={(val) => {
                setFilteredFilters(
                  normalizeFilters(filters).filter((item) => {
                    return (
                      item?.title?.toLowerCase().includes(val?.toLowerCase()) ||
                      item?.subtitle?.toLowerCase() === val?.toLowerCase() ||
                      !val
                    );
                  }),
                );
              }}
              className="text-sm font-medium text-gray-500 py-2   mt-1 w-full"
            />
          </div>
        </div>
        <FormErrors />

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <SubmitButton
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          />
        </div>
      </div>
    </Form>
  );
};

export default AssortmentFiltersForm;
