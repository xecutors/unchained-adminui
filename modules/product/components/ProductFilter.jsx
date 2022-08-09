import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import TagInput from '../../common/components/TagInput';
import { isTruthy } from '../../common/utils/normalizeFilterKeys';
import { normalizeQuery } from '../../common/utils/utils';

const ProductFilter = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const handleOnChange = (value) => {
    if (isTruthy(value)) {
      router.push({
        query: normalizeQuery(router.query, value?.join(','), 'tags'),
      });
    } else {
      delete router.query?.tags;
      router.push({
        query: normalizeQuery(router.query),
      });
    }
  };

  return (
    <div className="mt-4 grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-3">
        <TagInput
          buttonText={formatMessage({
            id: 'add',
            defaultMessage: 'Add',
          })}
          tagList={router?.query?.tags?.split(',')}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
