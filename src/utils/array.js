export const pluck = (arr, key) => arr.map(item => item[key]);

export const isArray = arr => Array.isArray(arr);

export const flatten = list => list.reduce((a, b) => a.concat(isArray(b) ? flatten(b) : b), []);

export const compact = list => list.filter(v => v);

export const last = arr => (isArray(arr) ? arr[arr.length - 1] : arr);
