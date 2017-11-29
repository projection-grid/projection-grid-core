import _ from 'underscore';

export function composeColgroups({ config }) {
  return [{
    key: 'default',
    props: {},
    classes: [],
    styles: {},
    events: {},
    cols: _.chain(config.columns)
      .map(column => config.composeCols({ column, config }))
      .flatten()
      .compact()
      .value(),
  }];
}
