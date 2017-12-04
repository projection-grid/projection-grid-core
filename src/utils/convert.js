import _ from 'underscore';

export function convert(converter, value) {
  if (_.isArray(value)) {
    return _.map(value, converter);
  }
  const model = converter(value || {});
  if (_.isEmpty(model)) {
    return null;
  }
  return model;
}
