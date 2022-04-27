import TangleTree from '../../common/components/TangleTree';

const getAssortmentTree = (assortments) => {
  let cleanedAssortmentData = assortments?.map((assortment) => ({
    id: assortment?._id,
    slug: assortment?.texts.slug,
    title: assortment?.texts.title,
    subtitle: assortment?.texts.subtitle,
  }));

  cleanedAssortmentData = [
    cleanedAssortmentData,
    assortments
      ?.map((assortment) =>
        assortment?.children?.map((child) => ({
          id: child?._id,
          slug: child?.texts.slug,
          title: child?.texts.title,
          subtitle: child?.texts.subtitle,
          childCount: child?.childrenCount,
          parents: [assortment?._id],
        })),
      )
      ?.flat(),
  ];

  // cleanedAssortmentData = [
  //   ...cleanedAssortmentData,
  //   assortments
  //     ?.map((assortment) => {
  //       return assortment?.children
  //         ?.map((child) =>
  //           child?.children?.map((chi) => ({
  //             id: chi?._id,
  //             slug: chi?.texts.slug,
  //             title: chi?.texts.title,
  //             subtitle: chi?.texts.subtitle,
  //             parents: [child?._id],
  //           })),
  //         )
  //         ?.flat();
  //     })
  //     ?.flat(),
  // ];

  return cleanedAssortmentData.filter(Boolean);
};

const AssortmentGraph = ({ assortments }) => {
  return (
    <div className="relative inline-block align-middle overflow-visible w-full mx-auto pb-[100%] rounded-lg bg-white shadow dark:shadow-white dark:bg-slate-600 text-slate-900 dark:text-white">
      <TangleTree data={getAssortmentTree(assortments)} />
    </div>
  );
};

export default AssortmentGraph;
