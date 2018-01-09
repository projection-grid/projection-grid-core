import { isArray, isObject, colsOfTable, assign } from '../utils';

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
      const { section: { table } } = tr;
      const { data, ...trOthers } = tr;
      const cols = colsOfTable(table);

      if (isArray(data)) {
        return [].concat(...data.map(d => ({ data: d, ...trOthers })).map(this.composeTrs));
      }

      if (isObject(data)) {
        return composeTrs({
          ...trOthers,
          tds: cols.map(col => ({ data, col, key: col.key })),
        });
      }

      return composeTrs(tr);
    },
  };
}
