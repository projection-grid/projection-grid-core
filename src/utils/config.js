import { pluck } from './array';

export function colsOfTable(table) {
  const { colgroups = [] } = table;
  return [].concat(...pluck(colgroups, 'cols'));
}
