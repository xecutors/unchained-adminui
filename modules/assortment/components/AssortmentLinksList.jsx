import AssortmentLinksListItem from './AssortmentLinksListItem';

const AssortmentLinksList = ({ links, onRemoveLink }) => {
  return links.map((link) => (
    <AssortmentLinksListItem
      key={link._id}
      link={link}
      onDelete={onRemoveLink}
    />
  ));
};

export default AssortmentLinksList;
