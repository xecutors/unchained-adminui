const sortArrayAlphabetically = (arr, key, capitalize = false) => {
  const dictionary = {};

  (arr || [])?.forEach((item) => {
    let [initial] = item[key];

    initial = capitalize
      ? initial?.toString()?.toUpperCase()
      : initial.toString();
    if (dictionary[initial]) dictionary[initial].push(item);
    else dictionary[initial] = [item];
  });
  return dictionary;
};

export default sortArrayAlphabetically;
