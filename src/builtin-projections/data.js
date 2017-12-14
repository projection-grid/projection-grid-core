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

      if (isArray(data)) {
        const trs = data.map(d => Object.assign({}, tr, { data: d }));
        return [].concat(...trs.map(this.composeTrs));
      }

      if (isObject(data)) {
        return composeTrs(Object.assign({}, tr, {
          tds: cols.map(col => ({ data, col })),
        }, primaryKey ? { key: data[primaryKey] } : {}));
      }

      return composeTrs(tr);
    },
  };
}