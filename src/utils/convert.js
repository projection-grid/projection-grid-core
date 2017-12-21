import { isArray } from './array';
import { isObject, assign } from './object';

export function convert(context, converter, value) {
  function convertValue(obj) {
    if (isArray(obj)) {
      return [].concat(...obj.map(convertValue));
    }
    if (isObject(obj)) {
      return converter(assign({}, obj, context));
    }
    return null;
  }

  return convertValue(value);
}
