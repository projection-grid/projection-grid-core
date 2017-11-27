import _ from 'underscore';

export function composeTrs({ record, config }) {
  return [{
    attributes: {},
    key: record[config.primaryKey],
    tds: _.chain(config.columns)
      .map(column => config.composeTds({ column, record, config }))
      .flatten()
      .compact()
      .value(),
  }];
}
