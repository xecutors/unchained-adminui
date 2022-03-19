import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import TagInput from '../../common/components/TagInput';
import normalizeFilterKeys, {
  extractQuery,
} from '../../common/utils/normalizeFilterKeys';

const ProductFilter = () => {
  const router = useRouter();
  const [tags, setTags] = useState(extractQuery(router.query?.tags));
  const { formatMessage } = useIntl();
  useEffect(() => {
    const filterQuery = normalizeFilterKeys({ tags });
    router.push(`${router.pathname}?${filterQuery}`);
  }, [tags]);
  return (
    <div className="grid grid-cols-6 gap-6  px-4 mt-4">
      <div className="col-span-6 sm:col-span-3">
        <TagInput
          buttonText={formatMessage({
            id: 'add_tag',
            defaultMessage: 'Add tag',
          })}
          onChange={(value) => {
            setTags(value);
          }}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
