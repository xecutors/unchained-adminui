import DeleteButton from '../../common/components/DeleteButton';
import { stopPropagation } from '../../common/data/miscellaneous';

const ProductVariationOptionItem = ({ option, onDelete }) => {
  return (
    <div>
      <span> {option.value}</span>
      <span> {option.texts?.title}</span>
      <span> {option.texts?.subtitle}</span>
      <DeleteButton
        onClick={(e) => {
          stopPropagation(e);
          onDelete(option.value);
        }}
        className="ml-1 mr-1 border-white text-red-600 hover:text-red-900 cursor-pointer"
      />
    </div>
  );
};

export default ProductVariationOptionItem;
