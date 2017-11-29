import _ from 'underscore';

export function composeTrs({ record, config }) {
  return [{
    key: `@${record[config.primaryKey]}`,
    props: {},
    events: {},
    tds: _.chain(config.columns)
      .map(column => config.composeTds({ column, record, config }))
      .flatten()
      .compact()
      .value(),
  }];
}
