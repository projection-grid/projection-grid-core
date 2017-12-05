const partialApply = (fn, args) => fn.bind(null, ...args);

export const isFunction = func =>
  func && Object.prototype.toString.call(func) === '[object Function]';

export const partial = (fn, ...args) => partialApply(fn, args);
