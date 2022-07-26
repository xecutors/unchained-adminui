import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import NoData from '../../common/components/NoData';
import AssortmentProductListItem from './AssortmentProductListItem';

const AssortmentProductsList = ({ products, onRemoveProduct }) => {
  const { formatMessage } = useIntl();
  return products.length ? (
    <Droppable droppableId="assortment-links">
      {(provided, snapshot) => (
        <div
          className={classNames(
            'space-y-4 block py-3 rounded px-6 bg-white dark:bg-slate-800 shadow dark:shadow-none transition-[background-color] ease-in-out delay-200',
            {
              'bg-slate-100 dark:bg-slate-700': snapshot.isDraggingOver,
            },
          )}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {products.map((product, index) => (
            <AssortmentProductListItem
              key={product._id}
              link={product}
              onDelete={onRemoveProduct}
              i={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ) : (
    <NoData
      message={formatMessage({
        id: 'assigned_products',
        defaultMessage: 'Assigned Products',
      })}
    />
  );
};

export default AssortmentProductsList;
