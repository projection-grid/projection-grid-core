import _ from 'underscore';

const DEFAULT_PRIMARY_KEY = '@id';

function defaultRecords(config) {
  return _.extend({ rows: [] }, config);
}

function defaultPrimaryKey(config) {
  if (_.has(config, 'primaryKey')) {
    return config;
  }

  return _.defaults({
    primaryKey: DEFAULT_PRIMARY_KEY,
    records: _.map(config.records, (record, index) => _.defaults({
      [DEFAULT_PRIMARY_KEY]: index,
    }, record)),
  }, config);
}

function defaultColumns(config) {
  const { records, columns } = config;

  return _.defaults({
    columns: _.map(
      columns || _.keys(_.first(records)),
      col => (_.isString(col) ? { name: col } : col)
    ),
  }, config);
}

export default [
  defaultRecords,
  defaultColumns,
  defaultPrimaryKey,
];
