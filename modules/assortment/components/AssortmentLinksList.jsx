import AssortmentLinksListItem from './AssortmentLinksListItem';

const AssortmentLinksList = ({ currentAssortmentId, links, onRemoveLink }) => {
  return links.map((link) => {
    const { child, parent, _id } = link;
    const comp = [];
    if (parent && parent._id !== currentAssortmentId)
      comp.push(
        <AssortmentLinksListItem
          key={parent._id}
          link={parent}
          isParent={parent._id === currentAssortmentId}
          linkId={_id}
          onDelete={onRemoveLink}
        />,
      );
    if (child && child._id !== currentAssortmentId)
      comp.push(
        <AssortmentLinksListItem
          key={child._id}
          link={child}
          isParent={child._id !== currentAssortmentId}
          onDelete={onRemoveLink}
        />,
      );

    return comp;
  });
};

export default AssortmentLinksList;
