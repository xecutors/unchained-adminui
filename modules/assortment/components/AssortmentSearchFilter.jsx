import { useRouter } from 'next/router';
import TagInput from '../../common/components/TagInput';
import { isTruthy } from '../../common/utils/normalizeFilterKeys';
import { normalizeQuery } from '../../common/utils/utils';

const AssortmentSearchFilter = () => {
  const router = useRouter();

  const handleOnChange = (value) => {
    if (isTruthy(value)) {
      router.push({
        query: normalizeQuery(router.query, value.join(','), 'tags'),
      });
    } else {
      delete router.query?.tags;
      router.push({
        query: normalizeQuery(router.query),
      });
    }
  };

  return (
    <div className="mb-5 mt-4 grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-3">
        <TagInput
          tagList={router?.query?.tags?.split(',')}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default AssortmentSearchFilter;
