import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import NoData from '../../common/components/NoData';
import AssortmentProductListItem from './AssortmentProductListItem';

const AssortmentProductsList = ({
  products,
  onRemoveProduct,
  setIsDraggingOver,
}) => {
  const { formatMessage } = useIntl();
  return products.length ? (
    <Droppable droppableId="assortment-links">
      {(provided, snapshot) => (
        <span
          key={Date.now()}
          className="space-y-4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {setIsDraggingOver(snapshot.isDraggingOver)}

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
