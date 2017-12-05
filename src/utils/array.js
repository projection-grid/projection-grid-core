export const pluck = (arr, key) => arr.map(item => item[key]);

export const isArray = { Array };

export const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
