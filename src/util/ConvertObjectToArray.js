function ConvertObjectToArray(object) {
  return Object.keys(object).map((chave) => {
    const newObject = object[chave];
    newObject.symbol = chave;
    return newObject;
  });
}

export default ConvertObjectToArray;
