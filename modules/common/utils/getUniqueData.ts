function uniqueData(data) {
  return [...new Map(data?.map((item) => [item._id, item])).values()];
}

export default uniqueData;
