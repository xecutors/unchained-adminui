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
        <span
          key={Date.now()}
          className={classNames('space-y-4', {
            'bg-slate-100': snapshot.isDraggingOver,
          })}
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
        </span>
      )}
    </Droppable>
  ) : (
    <NoData
      message={formatMessage({
        id: 'message_product',
        defaultMessage: 'Assigned Products',
      })}
    />
  );
};

export default AssortmentProductsList;
