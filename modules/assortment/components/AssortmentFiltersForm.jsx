import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import SelectField from '../../forms/components/SelectField';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentFilter from '../hooks/useAddAssortmentFilter';
import useFilters from '../../filter/hooks/useFilters';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import FormErrors from '../../forms/components/FormErrors';

const normalizeFilters = (filterList) => {
  return filterList?.map(({ _id, texts, key }) => ({
    _id,
    title: ` (${key})-${texts?.title}`,
  }));
};

const AssortmentFiltersForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentFilter } = useAddAssortmentFilter();
  const { filters } = useFilters();

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
      <div className="w-full  justify-between1 1align-baseline">
        <TagInput
          name="tags"
          id="tags"
          label={formatMessage({
            id: 'tags',
            defaultMessage: 'tags',
          })}
          onChange={(newTags) => setTags(newTags)}
          autoComplete="on"
          options={{}}
          className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
        />

        <SelectField
          name="filterId"
          required
          label={formatMessage({
            id: 'filter',
            defaultMessage: 'Filter',
          })}
          options={convertArrayOfObjectToObject(
            normalizeFilters(filters),
            'title',
            '_id',
          )}
          className="text-sm font-medium text-gray-500 py-2   mt-1 w-full"
        />
      </div>
      <FormErrors />

      <SubmitButton
        label={formatMessage({
          id: 'save',
          defaultMessage: 'Save',
        })}
      />
    </Form>
  );
};

export default AssortmentFiltersForm;
