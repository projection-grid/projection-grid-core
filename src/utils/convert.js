import { isArray } from './array';

export function convert(converter, value) {
  if (isArray(value)) {
    return value.map(converter);
  }
  if (!value) {
    return null;
  }
  return converter(value);
}
