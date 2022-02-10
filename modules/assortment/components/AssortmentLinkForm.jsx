import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import SelectField from '../../forms/components/SelectField';
import useForm from '../../forms/hooks/useForm';
import useAddAssortmentLink from '../hooks/useAddAssortmentLink';

const AssortmentLinkForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentLink } = useAddAssortmentLink();

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const onSubmit = async ({ productId }) => {
    await addAssortmentLink({ productId, assortmentId, tags });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      productId: '',
      tags: '',
    },
  });

  return (
    <div className="mt-4 sm:max-w-full">
      <div className="py-2 px-5 shadow sm:rounded-t sm:px-15">
        <Form form={form}>
          <div className="space-y-2 sm:p-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3">
            <div className="pb-2 mb-7 border-gray-200 sm:flex  col-span-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'product',
                  defaultMessage: 'Product',
                })}
              </h3>
            </div>
            <div className="col-span-2 w-full ml-auto shadow-md border-gray-200  bg-white px-8">
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
                  name="productId"
                  label={formatMessage({
                    id: 'product',
                    defaultMessage: 'Product',
                  })}
                  autoComplete="on"
                  options={{}}
                  className="text-sm font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
                />
              </div>
              <div className="w-fit">
                <SubmitButton
                  label={formatMessage({
                    id: 'save',
                    defaultMessage: 'Save',
                  })}
                  className="py-6 h-9 "
                  full
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AssortmentLinkForm;
