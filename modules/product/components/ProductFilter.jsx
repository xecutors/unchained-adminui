import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import TagInput from '../../common/components/TagInput';
import { isTruthy } from '../../common/utils/normalizeFilterKeys';

const ProductFilter = () => {
  const router = useRouter();

  const { formatMessage } = useIntl();

  return (
    <div className="grid grid-cols-6 gap-6  px-4 mt-4">
      <div className="col-span-6 sm:col-span-3">
        <TagInput
          buttonText={formatMessage({
            id: 'add_tag',
            defaultMessage: 'Add tag',
          })}
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

export default ProductFilter;
