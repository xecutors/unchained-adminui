import Badge from '../../common/components/Badge';

const VariationOptionDisplay = ({ vectors }) => {
  return (
    <div className="flex flex-wrap">
      {vectors &&
        vectors.map((vector) => (
          <Badge
            key={`${vector.variation.key} ${vector.option.value}`}
            text={
              `${vector.variation.key} | ${vector.option.texts.title}`?.length >
              20
                ? `${vector.variation.key} | ${vector.option.texts.title}`
                    ?.slice(0, 20)
                    ?.concat('...')
                : `${vector.variation.key} | ${vector.option.texts.title}`
            }
            color="green"
            square
            className="px-1.5 py-0 mr-2 my-1"
          />
        ))}
    </div>
  );
};

export default VariationOptionDisplay;
