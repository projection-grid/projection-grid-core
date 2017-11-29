import _ from 'underscore';

/*
Configuration added by custom-column projection

  column.col
    column.col.props
    column.col.events
  column.td
    column.td.props
    column.td.events
    column.td.content
  column.th
    column.th.props
    column.th.events
    column.th.content
*/

function decorate(decorator, options, value) {
  if (_.isArray(value)) {
    return _.map(value, v => decorate(decorator, options, v));
  }
  if (_.isFunction(decorator)) {
    return decorator(options, value);
  }
  if (_.isObject(decorator)) {
    return _.mapObject(value, (v, key) => decorate(decorator[key], options, v));
  }
  return value;
}

export default function customColumn(config) {
  const configNew = _.defaults({
    composeTds(options) {
      const { column: { td: decorator } } = options;
      return decorate(decorator, options, config.composeTds(options));
    },
  }, config);

  return configNew;
}
