import { pluck } from '../utils';

export default function ({
  composeTable,
  composeSections,
  composeTrs,
}) {
  return {
    composeTable(table) {
      return composeTable({
        ...table,
        thead: { hasHeader: true },
      });
    },

    composeSections(section) {
      const { trs = [], hasHeader } = section;

      if (hasHeader) {
        return composeSections({
          ...section,
          trs: [{ key: '@header', isHeader: true }, ...trs],
        });
      }
      return composeSections(section);
    },

    composeTrs(tr) {
      const { isHeader, section: { table } } = tr;
      const { colgroups = [] } = table;
      const cols = [].concat(...pluck(colgroups, 'cols'));

      if (isHeader) {
        return composeTrs({
          ...tr,
          tds: cols.map(col => ({ tag: 'TH', isHeader: true, col })),
        });
      }
      return composeTrs(tr);
    },
  };
}
