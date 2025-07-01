const hasOperationName = (req, operationName) => {
  const { body } = req;
  console.log(body?.operationName, operationName)
  return body?.operationName && body.operationName === operationName;
};

export default hasOperationName;
