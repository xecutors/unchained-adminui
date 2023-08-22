export const convertArrayOfObjectToObject = (arr, label, key) =>
  Object.assign({}, ...arr.map((item) => ({ [item[key]]: item[label] })));

export const normalizeVariation = (arr) =>
  Object.assign(
    {},
    ...arr.map((item) => ({
      [item.key]: `(${item?.type}) ${item.texts?.title}`,
    })),
  );

export const normalizeVariationOption = (arr) =>
  Object.assign(
    {},
    ...arr.map((item) => ({
      [item.value]: `(${item?.value}) ${item.texts?.title}`,
    })),
  );

export default convertArrayOfObjectToObject;
