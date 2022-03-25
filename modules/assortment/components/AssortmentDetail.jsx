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
import AssortmentLinks from './AssortmentLinks';
import AssortmentProducts from './AssortmentProducts';
import AssortmentFilters from './AssortmentFilters';
import useUpdateAssortment from '../hooks/useUpdateAssortment';
import TabComponent from '../../common/components/TabComponent';
import TagList from '../../common/components/TagList';

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
    return true;
  };

  const updateAssortmentTags = async ({ tags }) => {
    await updateAssortment({
      assortmentId: assortment?._id,
      assortment: { tags },
    });
    return true;
  };

  const setActive = async (value) => {
    await updateAssortment({
      assortmentId: assortment?._id,
      assortment: { isActive: value },
    });
    return true;
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
        id: 'not_base',
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

  return (
    <>
      <div className="-ml-2 flex flex-wrap space-y-2 space-x-2 lg:justify-end">
        <TagList
          defaultValue={assortment?.tags}
          onSubmit={updateAssortmentTags}
        />
        <SelectOptions
          options={baseOptions}
          type={formatMessage({
            id: 'assortment',
            defaultMessage: 'Assortment',
          })}
        />
        <SelectOptions
          options={rootOptions}
          type={formatMessage({
            id: 'assortment',
            defaultMessage: 'Assortment',
          })}
        />
        <SelectOptions
          options={activeOptions}
          type={formatMessage({
            id: 'assortment',
            defaultMessage: 'Assortment',
          })}
        />
      </div>
      <TabComponent tabItems={assortmentOptions} defaultTab="texts">
        <GetCurrentTab id={assortment?._id} />
      </TabComponent>
    </>
  );
};

export default AssortmentDetail;
