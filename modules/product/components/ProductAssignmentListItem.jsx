const ProductAssignmentListItem = ({ variation }) => {
  console.log(variation);
  return (
    <div>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">{variation?.type}</td>
        <td className="px-6 py-4 whitespace-nowrap">{variation?.key}</td>

        <td className="px-6 py-4 whitespace-nowrap">
          {variation?.texts?.title}
        </td>
      </tr>
    </div>
  );
};

export default ProductAssignmentListItem;
