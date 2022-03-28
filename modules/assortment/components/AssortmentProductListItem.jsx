import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const AssortmentProductListItem = ({ link, onDelete }) => {
  const { _id, product, tags } = link;

  return (
    <div className="flex items-center justify-between  border-b border-gray-200 last:border-none">
      <div className="flex items-center space-x-6 py-4">
        <div className="">
          <h3 className="text-lg text-gray-800">{product?.texts?.title}</h3>
          <p className="text-xs text-gray-600">{product?.texts?.subtitle}</p>
        </div>
      </div>
      <div>
        {(tags || [])?.map((tag) => (
          <Badge text={tag} color="cyan" key={tag} />
        ))}
      </div>
      <DeleteButton onClick={() => onDelete(_id)} />
    </div>
  );
};

export default AssortmentProductListItem;
