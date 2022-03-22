import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import { stopPropagation } from '../../common/data/miscellaneous';
import Form from '../../forms/components/Form';
import useForm from '../../forms/hooks/useForm';
import useUpdateProductVariationTexts from '../hooks/useUpdateProductVariationTexts';

const ProductVariation = ({
  type,
  variationText,
  variation,
  selectedLocale,
  onDelete,
}) => {
  const { updateProductVariationTexts } = useUpdateProductVariationTexts();

  const onSubmit = async ({ title, subtitle }) => {
    await updateProductVariationTexts({
      productVariationId: variation._id,
      texts: { title, subtitle, locale: selectedLocale },
    });
  };
  const form = useForm({
    submit: onSubmit,
    initialValues: {
      title: variation,
      subtitle: '',
    },
  });

  return (
    <div>
      <Form form={form}>
        <div className="flex">
          <span>
            <Badge text={type} square />
          </span>
          <span> {variationText.title}</span>
          <span>{variation?.key}</span>

          <div>
            <DeleteButton
              onClick={(e) => {
                stopPropagation(e);
                onDelete(variation._id);
              }}
              className="ml-1 mr-1 border-white text-red-600 hover:text-red-900 cursor-pointer"
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProductVariation;
