function convertKeysToCamelCase(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  }

  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
        letter.toUpperCase()
      );
      newObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
    }
  }
  return newObj;
}

export default convertKeysToCamelCase;
