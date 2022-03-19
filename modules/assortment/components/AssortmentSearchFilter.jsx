import { useRouter } from 'next/router';
import TagInput from '../../common/components/TagInput';
import { isTruthy } from '../../common/utils/normalizeFilterKeys';

const AssortmentSearchFilter = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-6 gap-6 mb-5 px-4 mt-4">
      <div className="col-span-6 sm:col-span-3">
        <TagInput
          tagList={router?.query?.tags?.split(',')}
          onChange={(value) => {
            if (isTruthy(value))
              router.push({
                query: {
                  ...router.query,
                  tags: value?.join(','),
                },
              });
            else {
              delete router.query?.tags;
              router.push({
                query: {
                  ...router.query,
                },
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default AssortmentSearchFilter;
