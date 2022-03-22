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
      <div className="shadow sm:rounded-md">
        <div className="grid gap-6 bg-white px-4 py-5 sm:p-6">
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
              className="mt-1 w-full py-2 text-sm font-medium   text-gray-500 sm:ml-1"
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

        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
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
