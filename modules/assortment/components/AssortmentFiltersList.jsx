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
          key={Date.now()}
          className={classNames(
            'space-y-4 py-3 px-6 bg-white rounded transition-[background-color] ease-in-out delay-200',
            {
              'bg-slate-100 rounded border-2': snapshot.isDraggingOver,
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
