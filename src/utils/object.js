export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

export const compactObject = (obj) => {
  if (!isObject(obj)) {
    throw new TypeError(`${obj} is not an Object`);
  }

  return Object.keys(obj).reduce((memo, key) => {
    if (obj[key]) {
      return Object.assign(memo, { [key]: obj[key] });
    }

    return memo;
  }, {});
};

export const mapObject = (obj, iteratee) =>
  Object.keys(obj).reduce((memo, key) => ({
    [key]: iteratee(obj[key], key),
  }), {});
