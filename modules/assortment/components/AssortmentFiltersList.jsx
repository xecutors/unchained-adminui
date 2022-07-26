import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';

import classNames from 'classnames';
import NoData from '../../common/components/NoData';
import AssortmentFiltersListItem from './AssortmentFiltersListItem';

const AssortmentFiltersList = ({ filters, onRemoveFilter }) => {
  const { formatMessage } = useIntl();
  return filters?.length ? (
    <Droppable droppableId="assortment-links">
      {(provided, snapshot) => (
        <div
          className={classNames(
            'space-y-4 py-3 px-6 rounded transition-[background-color] ease-in-out delay-200',
            {
              'bg-slate-100 dark:bg-slate-700': snapshot.isDraggingOver,
            },
          )}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {filters.map((filter, index) => (
            <AssortmentFiltersListItem
              key={filter._id}
              link={filter}
              onDelete={onRemoveFilter}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ) : (
    <NoData
      message={formatMessage({
        id: 'filters',
        defaultMessage: 'Filters',
      })}
    />
  );
};

export default AssortmentFiltersList;
