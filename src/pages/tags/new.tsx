import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import TagForm from '../../modules/tags/components/TagForm';
import useCreateTag from '../../modules/tags/hooks/useCreateTag';

const NewTag = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { createTag } = useCreateTag();

  const handleSubmit = async (tagData: { name: string; description?: string; category?: string }) => {
    try {
      await createTag(tagData);
      toast.success(
        formatMessage({
          id: 'tag_created_successfully',
          defaultMessage: 'Tag created successfully',
        }),
      );
      router.push('/tags');
    } catch (error) {
      toast.error(
        formatMessage({
          id: 'tag_creation_failed',
          defaultMessage: 'Failed to create tag',
        }),
      );
    }
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'add_new_tag',
          defaultMessage: 'Add New Tag',
        })}
      />
      <div className="max-w-2xl mx-auto p-6">
        <TagForm
          onSubmit={handleSubmit}
          submitButtonText={formatMessage({
            id: 'create_tag',
            defaultMessage: 'Create Tag',
          })}
        />
      </div>
    </>
  );
};

export default NewTag;