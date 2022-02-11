import { useIntl } from 'react-intl';
import {
  DocumentTextIcon,
  LinkIcon,
  FilmIcon,
  ViewGridIcon,
  FilterIcon,
} from '@heroicons/react/solid';

import LocaleWrapper from '../../common/components/LocaleWrapper';
import SelectOptions from '../../common/components/SelectOptions';

import AssortmentTextForm from './AssortmentTextForm';
import AssortmentMediaForm from './AssortmentMediaForm';

import { stopPropagation } from '../../common/data/miscellaneous';
import AssortmentLinks from './AssortmentLinks';
import AssortmentProducts from './AssortmentProducts';
import AssortmentFilters from './AssortmentFilters';
import useUpdateAssortment from '../hooks/useUpdateAssortment';
import TabComponent from '../../common/components/TabComponent';

const GetCurrentTab = ({ id, selectedView }) => {
  if (selectedView === 'texts')
    return (
      <LocaleWrapper>
        <AssortmentTextForm assortmentId={id} />
      </LocaleWrapper>
    );
  if (selectedView === 'links') return <AssortmentLinks assortmentId={id} />;

  if (selectedView === 'media')
    return (
      <LocaleWrapper>
        <AssortmentMediaForm assortmentId={id} />
      </LocaleWrapper>
    );
  if (selectedView === 'products')
    return <AssortmentProducts assortmentId={id} />;
  if (selectedView === 'filters')
    return <AssortmentFilters assortmentId={id} />;
  return (
    <LocaleWrapper>
      <AssortmentTextForm assortmentId={id} />
    </LocaleWrapper>
  );
};
const AssortmentDetail = ({ assortment }) => {
  const { isActive, isBase, isRoot } = assortment;
  const { formatMessage } = useIntl();
  const { updateAssortment } = useUpdateAssortment();

  const assortmentOptions = [
    {
      id: 'texts',
      title: formatMessage({
        id: 'texts',
        defaultMessage: 'Texts',
      }),
      Icon: <DocumentTextIcon className="h-4 w-5" />,
    },

    {
      id: 'links',
      title: formatMessage({
        id: 'links',
        defaultMessage: 'Links',
      }),
      Icon: <LinkIcon className="h-4 w-5" />,
    },
    {
      id: 'media',
      title: formatMessage({
        id: 'media',
        defaultMessage: 'Media',
      }),
      Icon: <FilmIcon className="h-4 w-5" />,
    },
    {
      id: 'products',
      title: formatMessage({
        id: 'products',
        defaultMessage: 'Products',
      }),
      Icon: <ViewGridIcon className="h-4 w-5" />,
    },
    {
      id: 'filters',
      title: formatMessage({
        id: 'filters',
        defaultMessage: 'Filters',
      }),
      Icon: <FilterIcon className="h-4 w-5" />,
    },
  ];

  const setIsRoot = async (value) => {
    await updateAssortment({
      assortmentId: assortment?._id,
      assortment: { isRoot: value },
    });
  };

  const setActive = async (value) => {
    await updateAssortment({
      assortmentId: assortment?._id,
      assortment: { isActive: value },
    });
  };

  const activeOptions = [
    {
      id: 'active',
      title: formatMessage({
        id: 'activate',
        defaultMessage: 'Activate',
      }),
      selectedTitle: formatMessage({
        id: 'activated',
        defaultMessage: 'Activated',
      }),
      description: 'Some description',
      current: isActive,
      bgColor: 'green',
      onClick: async () => setActive(true),
    },
    {
      id: 'in-active',
      title: formatMessage({
        id: 'deactivate',
        defaultMessage: 'Deactivate',
      }),
      selectedTitle: formatMessage({
        id: 'deactivated',
        defaultMessage: 'Deactivated',
      }),
      description: '',
      current: !isActive,
      bgColor: 'gray',
      onClick: async () => setActive(false),
    },
  ];

  const baseOptions = [
    {
      id: 'base',
      title: formatMessage({
        id: 'base',
        defaultMessage: 'Base',
      }),
      description: '',
      current: isBase,
      bgColor: 'green',
    },
    {
      id: 'not_base',
      title: formatMessage({
        id: 'root',
        defaultMessage: 'Not Base',
      }),
      description: '',
      current: !isBase,
      bgColor: 'gray',
    },
  ];

  const rootOptions = [
    {
      id: 'root',
      title: formatMessage({
        id: 'make_root',
        defaultMessage: 'Make root',
      }),
      selectedTitle: formatMessage({
        id: 'root',
        defaultMessage: 'Root',
      }),
      description: '',
      current: isRoot,
      bgColor: 'green',
      onClick: async () => setIsRoot(true),
    },
    {
      id: 'leaf',
      selectedTitle: formatMessage({
        id: 'leaf',
        defaultMessage: 'Leaf',
      }),
      title: formatMessage({
        id: 'make_leaf',
        defaultMessage: 'Make leaf',
      }),
      description: '',
      current: !isRoot,
      bgColor: 'gray',
      onClick: async () => setIsRoot(false),
    },
  ];

  const handlePublishOptions = (event) => {
    stopPropagation(event);
  };

  return (
    <>
      <div className="flex space-x-2 justify-end">
        <SelectOptions
          publishingOptions={baseOptions}
          onChange={handlePublishOptions}
        />
        <SelectOptions
          publishingOptions={rootOptions}
          onChange={handlePublishOptions}
        />
        <SelectOptions
          publishingOptions={activeOptions}
          onChange={handlePublishOptions}
        />
      </div>
      <TabComponent tabItems={assortmentOptions} defaultTab="texts">
        <GetCurrentTab id={assortment?._id} />
      </TabComponent>
    </>
  );
};

export default AssortmentDetail;
