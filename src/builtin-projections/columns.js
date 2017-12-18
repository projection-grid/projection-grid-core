import { isArray } from '../utils';

export default function ({
  composeTable,
}) {
  return {
    composeTable(table) {
      const { colgroups: cg = [], cols } = table;
      const colgroups = isArray(cols) ? cg.concat([{ cols }]) : cg;

      return composeTable({ ...table, colgroups });
    },
  };
}
