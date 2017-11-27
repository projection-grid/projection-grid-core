import _ from 'underscore';

export function composeColgroups({ config }) {
  return [{
    attributes: {},
    key: 'default',
    cols: _.chain(config.columns)
      .map(column => config.composeCols({ column, config }))
      .flatten()
      .compact()
      .value(),
  }];
}
