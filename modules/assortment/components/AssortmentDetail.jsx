import React from 'react';
import { useIntl } from 'react-intl';
import {
  DocumentTextIcon,
  LinkIcon,
  FilmIcon,
  ViewGridIcon,
  FilterIcon,
} from '@heroicons/react/solid';

import { toast } from 'react-toastify';
import LocaleWrapper from '../../common/components/LocaleWrapper';
import SelectOptions from '../../common/components/SelectOptions';
import AssortmentTextForm from './AssortmentTextForm';
import AssortmentMediaForm from './AssortmentMediaForm';
import AssortmentLinks from './AssortmentLinks';
import AssortmentProducts from './AssortmentProducts';
import AssortmentFilters from './AssortmentFilters';
import useUpdateAssortment from '../hooks/useUpdateAssortment';
import Tab from '../../common/components/Tab';
import TagList from '../../common/components/TagList';
import useSetBaseAssortment from '../hooks/useSetBaseAssortment';
import ACTION_ROLES from '../../common/data/roles';
import useAuth from '../../Auth/useAuth';
import Button from '../../common/components/Button';
import useModal from '../../modal/hooks/useModal';
import AlertMessage from '../../modal/components/AlertMessage';

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
  const { hasRole } = useAuth();
  const { formatMessage } = useIntl();
  const { updateAssortment } = useUpdateAssortment();
  const { setBaseAssortment } = useSetBaseAssortment();
  const { setModal } = useModal();

  const updateAssortmentSequence = async (e) => {
    if (e.target.value) {
      await updateAssortment({
        assortmentId: assortment?._id,
        sequence: parseInt(e.target.value, 10),
      });
    }
  };
  const setAsBase = async () => {
    await setModal(
      <AlertMessage
        buttonText={formatMessage({
          id: 'mark_as_base',
          defaultMessage: 'Mark as Base',
        })}
        headerText={formatMessage({
          id: 'header_title',
          defaultMessage: 'Assortment base change.',
        })}
        message={formatMessage({
          id: 'header_conformation',
          defaultMessage:
            'This action is nonreversible, are you sure you want to change it to base?',
        })}
        onOkClick={async () => {
          setModal('');
          await setBaseAssortment({ assortmentId: assortment?._id });
          toast.success(
            formatMessage({
              id: 'assortment_made_base',
              defaultMessage: 'Assortment changed to base',
            }),
          );
        }}
      />,
    );
  };

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
      isRoot: value,
    });
    return true;
  };

  const updateAssortmentTags = async ({ tags }) => {
    await updateAssortment({
      assortmentId: assortment?._id,
      tags,
    });
    return true;
  };

  const setActive = async (value) => {
    await updateAssortment({
      assortmentId: assortment?._id,
      isActive: value,
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
      description: formatMessage({
        id: 'activate_assortment_description',
        defaultMessage: 'Will be visible on search',
      }),
      current: isActive,
      bgColor: 'green',
      onClick: async () => {
        await setActive(true);
        toast.success(
          formatMessage({
            id: 'assortment_activated',
            defaultMessage: 'Assortment activated successfully',
          }),
        );
      },
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
      description: formatMessage({
        id: 'deactivate_assortment_description',
        defaultMessage: 'Will not be visible on search',
      }),
      current: !isActive,
      bgColor: 'slate',
      onClick: async () => {
        await setActive(false);
        toast.success(
          formatMessage({
            id: 'assortment_deactivated',
            defaultMessage: 'Assortment deactivated successfully',
          }),
        );
      },
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
      description: formatMessage({
        id: 'root_assortment_description',
        defaultMessage: 'Can not be assigned as a child of another assortment ',
      }),
      current: isRoot,
      bgColor: 'green',
      onClick: async () => {
        await setIsRoot(true);
        toast.success(
          formatMessage({
            id: 'assortment_changed_to_root',
            defaultMessage: 'Assortment changed to root',
          }),
        );
      },
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
      description: formatMessage({
        id: 'leaf_assortment_description',
        defaultMessage: 'Can be assigned as a child of another assortment ',
      }),
      current: !isRoot,
      bgColor: 'slate',
      onClick: async () => {
        await setIsRoot(false);
        toast.success(
          formatMessage({
            id: 'assortment_changed_to_leaf',
            defaultMessage: 'Assortment changed to leaf',
          }),
        );
      },
    },
  ];

  return (
    <>
      <div className="-ml-2 flex flex-wrap gap-2 lg:justify-end">
        <TagList
          defaultValue={assortment?.tags}
          onSubmit={updateAssortmentTags}
          enableEdit={hasRole(ACTION_ROLES.assortments.update)}
        />
        <input
          id="sequence"
          type="number"
          className="w-24 shadow-sm focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 focus:border-indigo-500 block text-sm  border-gray-300 rounded-full mr-2 font-bold text-indigo-500"
          defaultValue={assortment?.sequence}
          onBlur={updateAssortmentSequence}
        />
        <div>
          {isBase ? (
            <span
              id="is_base"
              className="py-2.5 px-8 text-sm font-medium text-white bg-green-500 white inline-flex items-center shadow-md border rounded-md"
            >
              {formatMessage({
                id: 'base',
                defaultMessage: 'Base',
              })}
            </span>
          ) : (
            <Button
              id="not_base"
              text={formatMessage({
                id: 'not_base',
                defaultMessage: 'Mark as Base',
              })}
              className="py-2.5"
              onClick={setAsBase}
            />
          )}
        </div>
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
      <Tab tabItems={assortmentOptions} defaultTab="texts">
        <GetCurrentTab id={assortment?._id} />
      </Tab>
    </>
  );
};

export default AssortmentDetail;
