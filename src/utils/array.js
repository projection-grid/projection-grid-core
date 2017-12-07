export const pluck = (arr, key) => arr.map(item => item[key]);

export const isArray = arr => Array.isArray(arr);

export const flatten = list => list.reduce((a, b) => a.concat(isArray(b) ? flatten(b) : b), []);

export const uniq = list => list.filter((val, index) => list.indexOf(val) === index);
