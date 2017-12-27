import { flatten } from './array';

export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
export const isFunction = func => Object.prototype.toString.call(func) === '[object Function]';
export const isString = obj => Object.prototype.toString.call(obj) === '[object String]';
export const isUndefined = obj => Object.prototype.toString.call(obj) === '[object Undefined]';

export const ponyfill = (native, replacement) => (isUndefined(native) ? replacement : native);
export const assignPonyfill = (target, ...source) => {
  source.forEach(src => Object.keys(src).forEach((value, key) => {
    target[key] = value; // eslint-disable-line
  }));
  return target;
};

export const assign = ponyfill(Object.assign, assignPonyfill);

const iterateeWithCondition = (
  obj,
  condition,
  iteratee = iterateeObj => iterateeObj
) => Object.keys(obj).reduce((memo, key) => {
  if (condition(obj, key)) {
    return assign(memo, { [key]: iteratee(obj[key], key) });
  }
  return memo;
}, {});

export const compactObject = obj => iterateeWithCondition(obj, (item, key) => !!item[key]);

export const mapObject = (obj, iteratee) => iterateeWithCondition(obj, () => true, iteratee);

export const pick = (obj, ...keys) => {
  const flattendKeys = flatten(keys);

  return iterateeWithCondition(obj, (item, key) =>
    (searchKeys => searchKeys.indexOf(key) > -1)(flattendKeys));
};

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
