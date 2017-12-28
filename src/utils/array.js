export const pluck = (arr, key) => arr.map(item => item[key]);

export const isArray = arr => Array.isArray(arr);

export const flatten = list => list.reduce((a, b) => a.concat(isArray(b) ? flatten(b) : b), []);

export const compact = list => list.filter(v => v);

export const last = arr => (isArray(arr) ? arr[arr.length - 1] : arr);

export const find = (list, predicate, context) => {
  if (!isArray(list)) {
    throw new TypeError('find called on a non-array variable');
  }

  for (let i = 0; i < list.length; i += 1) {
    const element = list[i];

    if (predicate.call(context, element, i, list)) {
      return element;
    }
  }

  return undefined;
};
