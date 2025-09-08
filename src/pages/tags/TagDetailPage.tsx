import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import TagForm from '../../modules/tags/components/TagForm';
import useUpdateTag from '../../modules/tags/hooks/useUpdateTag';
import Loading from '../../modules/common/components/Loading';

interface TagDetailPageProps {
  tagId: string;
}

const TagDetailPage = ({ tagId }: TagDetailPageProps) => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { updateTag, loading } = useUpdateTag();
  const [tag, setTag] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Load tag data (in real implementation, this would be a GraphQL query)
    const loadTag = () => {
      try {
        const customTags = JSON.parse(
          localStorage.getItem('customTags') || '[]',
        );
        const foundTag = customTags.find((t: any) => t.id === tagId);

        if (foundTag) {
          setTag(foundTag);
        } else {
          // Sample tag for demonstration
          setTag({
            id: tagId,
            name: tagId,
            description: 'Sample tag description',
            category: 'sample',
          });
        }
      } catch (error) {
        console.error('Error loading tag:', error);
      } finally {
        setPageLoading(false);
      }
    };

    loadTag();
  }, [tagId]);

  const handleSubmit = async (tagData: {
    name: string;
    description?: string;
    category?: string;
  }) => {
    try {
      await updateTag(tagId, tagData);
      toast.success(
        formatMessage({
          id: 'tag_updated_successfully',
          defaultMessage: 'Tag updated successfully',
        }),
      );
      router.push('/tags');
    } catch (error) {
      toast.error(
        formatMessage({
          id: 'tag_update_failed',
          defaultMessage: 'Failed to update tag',
        }),
      );
    }
  };

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage(
          {
            id: 'edit_tag',
            defaultMessage: 'Edit Tag: {tagName}',
          },
          { tagName: tag?.name || tagId },
        )}
      />
      <div className="max-w-2xl mx-auto p-6">
        <TagForm
          initialValues={tag}
          onSubmit={handleSubmit}
          submitButtonText={formatMessage({
            id: 'update_tag',
            defaultMessage: 'Update Tag',
          })}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default TagDetailPage;
