import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import SelectField from '../../forms/components/SelectField';
import useForm from '../../forms/hooks/useForm';

import useModal from '../../modal/hooks/useModal';
import useRemoveAssortmentFilter from '../hooks/useRemoveAssortmentFilter';
import useAddAssortmentFilter from '../hooks/useAddAssortmentFilter';
import DangerMessage from '../../modal/components/DangerMessage';
import AssortmentFiltersList from './AssortmentFiltersList';

const AssortmentFiltersForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentFilter } = useAddAssortmentFilter();

  const filterSampleData = [
    {
      id: 1,
      title: 'Product title',
      desc: 'product description placeholder',
    },
    {
      id: 2,
      title: 'Product title',
      desc: 'product description placeholder',
    },
    {
      id: 2,
      title: 'Product title',
      desc: 'product description placeholder',
    },
  ];

  const { setModal } = useModal();
  const { removeProduct } = useRemoveAssortmentFilter();

  const onRemoveFilter = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProduct({ assortmentId });
          toast.success(
            formatMessage(
              {
                id: 'filter_deleted',
                defaultMessage: 'filter {id} deleted successfully',
              },
              {
                id: assortmentId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_filter',
          defaultMessage: 'Delete Filter',
        })}
      />,
    );
  };

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const onSubmit = async ({ productId }) => {
    await addAssortmentFilter({ productId, assortmentId, tags });
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
    <div className=" mt-5 sm:max-w-full">
      <div className="px-2 lg:px-6 shadow sm:rounded-t sm:px-15 border-b pb-8">
        <Form form={form}>
          <div className=" sm:p-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3 px-8">
            <div className="pb-2 pt-4 mb-7 border-gray-200 sm:flex  col-span-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'filter',
                  defaultMessage: 'Filter',
                })}
              </h3>
            </div>
            <div className="col-span-2 py-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white sm:px-8">
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
                  label={formatMessage({
                    id: 'filter',
                    defaultMessage: 'Filter',
                  })}
                  autoComplete="on"
                  options={{}}
                  className="text-sm font-medium text-gray-500 py-2   mt-1 w-full"
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
        <div className="lg:grid lg:grid-cols-3 px-6 border-gray-200 ">
          <div className="pb-2 pt-4 mb-7 border-gray-200 sm:flex  col-span-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {formatMessage({
                id: 'assigned_filters',
                defaultMessage: 'Assigned filters',
              })}
            </h3>
          </div>
          <div className="space-y-4 col-span-2 w-full ml-auto shadow-md border-gray-200  bg-white py-6 px-6">
            <AssortmentFiltersList
              filters={filterSampleData}
              onRemoveFilter={onRemoveFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssortmentFiltersForm;
