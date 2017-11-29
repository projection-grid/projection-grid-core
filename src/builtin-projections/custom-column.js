import _ from 'underscore';

/*
Configuration added by custom-column projection

  column.Component
  column.attributes
  column.events
*/

export default function customColumn(config) {
  const configNew = _.defaults({
    composeTds(options) {
      const { column } = options;
      const customAttributes = _.mapObject(
        column.attribute || {},
        attr => (_.isFunction(attr) ? attr(options) : attr)
      );
      const customEvents = _.mapObject(
        column.events || {},
        handler => (...args) => handler(options, ...args)
      );
      const wrapContent = column.Component ?
        // If the custom Component is provided, wrap the content with it.
        // The custom events is for the custom Component
        content => ({
          Component: column.Component,
          props: _.defaults({ content }, options),
          events: customEvents,
        }) :
        // Otherwise the events is for the original component
        content => _.defaults({
          events: _.defaults({}, customEvents, content.events),
        }, content);

      return _.map(config.composeTds(options), td => _.defaults({
        attributes: _.defaults({}, customAttributes, td.attributes),
        content: wrapContent(td.content),
      }, td));
    },
  }, config);

  return configNew;
}
