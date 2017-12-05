import { flatten } from './array';

export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const iterateeWithCondition = (
  obj,
  condition = () => true,
  iteratee = iterateeObj => iterateeObj
) => {
  if (!isObject(obj)) {
    throw new TypeError(`${obj} is not an Object`);
  }

  return Object.keys(obj).reduce((memo, key) => {
    if (condition(obj, key)) {
      return Object.assign(memo, { [key]: iteratee(obj[key], key) });
    }

    return memo;
  }, {});
};

export const compactObject = obj => iterateeWithCondition(obj, (item, key) => !!item[key]);

export const mapObject = (obj, iteratee) => iterateeWithCondition(obj, () => true, iteratee);

export const pick =
  (obj, ...keys) =>
    iterateeWithCondition(obj, (item, key) => flatten(keys).indexOf(key) > -1);
