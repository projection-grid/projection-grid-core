import { isArray, isObject, pluck, assign } from '../utils';

export default function ({
  composeTable,
  composeSections,
  composeTrs,
}) {
  return {
    composeTable(table) {
      const { tbodies: tb = [], data } = table;
      const tbodies = isArray(data) ? tb.concat([{ data }]) : tb;

      return composeTable({ ...table, tbodies });
    },

    composeSections(section) {
      const { trs = [], data } = section;
      return composeSections(isArray(data) ? assign({}, section, {
        trs: trs.concat([{ data }]),
      }) : section);
    },

    composeTrs(tr) {
      const { data, section: { table } } = tr;
      const { primaryKey, colgroups = [] } = table;
      const cols = [].concat(...pluck(colgroups, 'cols'));

      if (isArray(data)) {
        const trs = data.map(d => assign({}, tr, { data: d }));
        return [].concat(...trs.map(this.composeTrs));
      }

      if (isObject(data)) {
        return composeTrs(assign({}, tr, {
          tds: cols.map(col => ({ data, col, key: col.key })),
        }, primaryKey ? { key: data[primaryKey] } : {}));
      }

      return composeTrs(tr);
    },
  };
}
