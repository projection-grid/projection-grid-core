import { flatten } from './array';
import { isFunction } from './function';

export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const iterateeWithCondition = (
  obj,
  condition,
  iteratee = iterateeObj => iterateeObj
) => {
  if (!isObject(obj)) {
    throw new TypeError(`${obj} is not an Object`);
  }

  if (!isFunction(condition)) {
    throw new TypeError(`${condition} is not a Function`);
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

export const pick = (obj, ...keys) => {
  const flattendKeys = flatten(keys);

  return iterateeWithCondition(obj, (item, key) =>
    (searchKeys => searchKeys.indexOf(key) > -1)(flattendKeys));
};

export const isUndefined = obj => Object.prototype.toString.call(obj) === '[object Undefined]';

export const isNull = obj => Object.prototype.toString.call(obj) === '[object Null]';
