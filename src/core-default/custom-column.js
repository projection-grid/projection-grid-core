import _ from 'underscore';

export function customColumn(config) {
  const configNew = _.defaults({
    composeTds(options) {
      return _.chain(config.composeTds(options))
        .map((td) => {
          const { attributes, content } = td;
          const { events } = content;
          const { column } = options;
          const { Component } = column;

          return _.defaults({
            attributes: _.chain(column)
              .result('attributes')
              .mapObject(attr => attr(options))
              .defaults(attributes)
              .value(),
            content: Component ? {
              Component,
              props: _.defaults({ content }, options),
              events: _.chain(column)
                .result('events')
                .mapObject(handler => (...args) => handler(options, ...args))
                .defaults(events)
                .value(),
            } : content,
          }, td);
        })
        .flatten()
        .compact()
        .value();
    },
  }, config);

  return configNew;
}
