import { isArray } from './array';
import { isEmpty } from './object';

export function convert(converter, value) {
  if (isArray(value)) {
    return value.map(converter);
  }
  const model = converter(value || {});
  if (isEmpty(model)) {
    return null;
  }
  return model;
}
