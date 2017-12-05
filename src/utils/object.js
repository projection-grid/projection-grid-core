export const isObject = obj => toString.call(obj) === '[object Object]';

export const compactObject = (obj) => {
  if (!isObject(obj)) {
    throw new Error(`${obj} is not an Object`);
  }

  return Object.keys(obj).reduce((memo, key) => {
    if (obj[key]) {
      return Object.assign(memo, { [key]: obj[key] });
    }

    return memo;
  }, {});
};
