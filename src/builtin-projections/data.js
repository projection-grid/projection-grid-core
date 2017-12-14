import { isArray, isObject, pluck } from '../utils';

export default function ({
  composeTable,
  composeSections,
  composeTrs,
}) {
  return {
    composeTable(table) {
      const { tbodies = [], data } = table;
      return composeTable(isArray(data) ? Object.assign({}, table, {
        tbodies: tbodies.concat([{ data }]),
      }) : table);
    },

    composeSections(section) {
      const { trs = [], data } = section;
      return composeSections(isArray(data) ? Object.assign({}, section, {
        trs: trs.concat([{ data }]),
      }) : section);
    },

    composeTrs(tr) {
      const { data, section: { table } } = tr;
      const { primaryKey } = table;
      const cols = [].concat(...pluck(table.colgroups || [], 'cols'));
      const composeDataTr = d => composeTrs(Object.assign({}, tr, {
        tds: cols.map(col => ({ data: d, col })),
      }, primaryKey ? { key: d[primaryKey] } : {}));

      if (isArray(data)) {
        return [].concat(...data.map(composeDataTr));
      }

      if (isObject(data)) {
        return composeDataTr(data);
      }

      return composeTrs(tr);
    },
  };
}
