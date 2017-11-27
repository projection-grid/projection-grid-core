import _ from 'underscore';
import { composer } from './composer';
import { customColumn } from './custom-column';

function defaultColumns({ records, columns }) {
  return _.map(columns || _.keys(_.first(records)), (col) => {
    if (_.isString(col)) {
      return { name: col };
    }
    return col;
  });
}

export const coreDefault = [
  config => _.defaults({
    columns: defaultColumns(config),
  }, config),
  composer,
  customColumn,
];
