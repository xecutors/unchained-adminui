function uniqueArrayObjects(data) {
  return [...new Map(data?.map((item) => [item._id, item])).values()];
}

export default uniqueArrayObjects;
