import _ from 'underscore';

export function convert(converter, value) {
  if (_.isArray(value)) {
    return _.map(value, converter);
  }
  if (_.isNull(value) || _.isUndefined(value)) {
    return null;
  }
  return converter(value);
}
