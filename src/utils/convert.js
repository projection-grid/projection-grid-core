import { isArray } from './array';
import { isNull, isUndefined } from './object';

export function convert(converter, value) {
  if (isArray(value)) {
    return value.map(converter);
  }
  if (isNull(value) || isUndefined(value)) {
    return null;
  }
  return converter(value);
}
