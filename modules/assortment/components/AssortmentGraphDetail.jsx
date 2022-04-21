import RenderChart from '../../common/components/TangleTree';

const getAssortmentTree = (assortment) => {
  let cleanedAssortmentData = [
    {
      id: assortment._id,
      slug: assortment.texts.slug,
      title: assortment.texts.title,
      subtitle: assortment.texts.subtitle,
    },
  ];

  cleanedAssortmentData = [
    cleanedAssortmentData,
    assortment.children
      .map((child) => ({
        id: child._id,
        slug: child.texts.slug,
        title: child.texts.title,
        subtitle: child.texts.subtitle,
        parents: [assortment._id],
      }))
      .flat(),
  ];

  cleanedAssortmentData = [
    ...cleanedAssortmentData,
    assortment.children
      .map((child) =>
        child.children.map((chi) => ({
          id: chi._id,
          slug: chi.texts.slug,
          title: chi.texts.title,
          subtitle: chi.texts.subtitle,
          parents: [child._id],
        })),
      )
      .flat(),
  ];

  cleanedAssortmentData = [
    ...cleanedAssortmentData,
    assortment.children
      .map((child) => {
        return child.children
          .map((chi) => {
            return chi.children.map((ch) => ({
              id: ch._id,
              slug: ch.texts.slug,
              title: ch.texts.title,
              subtitle: ch.texts.subtitle,
              parents: [chi._id],
            }));
          })
          .flat();
      })
      .flat(),
  ];

  return cleanedAssortmentData.filter(Boolean);
};

const AssortmentGraphDetail = ({ assortment }) => {
  return (
    <div className="w-full h-fit rounded-lg bg-white shadow dark:shadow-white dark:bg-slate-600 text-slate-900 dark:text-white">
      <h2>Assortment Graph Detail for {assortment.texts.slug}</h2>
      <RenderChart data={getAssortmentTree(assortment)} />
    </div>
  );
};

export default AssortmentGraphDetail;
