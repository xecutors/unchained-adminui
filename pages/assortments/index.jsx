import AssortmentList from '../../modules/asssortment/AssortmentList';

const index = () => {
  const { assortments } = useAssortments();

  return (
    <div>{assortments && <AssortmentList assortments={assortments} />}</div>
  );
};

export default index;
