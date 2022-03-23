const ProductAssignmentListItem = ({ variation }) => {
  console.log(variation);
  return (
    <div>
      <tr>
        <td className="whitespace-nowrap px-6 py-4">{variation?.type}</td>
        <td className="whitespace-nowrap px-6 py-4">{variation?.key}</td>

        <td className="whitespace-nowrap px-6 py-4">
          {variation?.texts?.title}
        </td>
      </tr>
    </div>
  );
};

export default ProductAssignmentListItem;
