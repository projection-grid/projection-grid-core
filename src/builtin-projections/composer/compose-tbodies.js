import _ from 'underscore';

export function composeTbodies({ config }) {
  return [{
    key: 'default',
    props: {},
    events: {},
    trs: _.chain(config.records)
      .map(record => config.composeTrs({ record, config }))
      .flatten()
      .compact()
      .value(),
  }];
}
