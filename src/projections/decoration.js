import { pluck, decorate } from '../utils';

export default function ({
  composeColgroups,
  composeCols,
  composeSections,
  composeTrs,
  composeTds,
}) {
  return {
    composeColgroups(colgroup) {
      const { table } = colgroup;
      return decorate(composeColgroups(colgroup), {
        context: colgroup,
        decorators: pluck([table], '$colgroup'),
      });
    },
    composeCols(col) {
      const { colgroup } = col;
      const { table } = colgroup;
      return decorate(composeCols(col), {
        context: col,
        decorators: pluck([table, colgroup], '$col'),
      });
    },
    composeSections(section) {
      const { table } = section;
      return decorate(composeSections(section), {
        context: section,
        decorators: pluck([table], {
          THEAD: '$thead',
          TBODY: '$tbody',
          TFOOT: '$tfoot',
        }[section.tag]),
      });
    },
    composeTrs(tr) {
      const { section } = tr;
      const { table } = section;
      return decorate(composeTrs(tr), {
        context: tr,
        decorators: pluck([table, section], '$tr'),
      });
    },
    composeTds(td) {
      const { col = {}, tr } = td;
      const { colgroup = {} } = col;
      const { section } = tr;
      const { table } = section;

      return decorate(composeTds(td), {
        context: td,
        decorators: pluck([
          table,
          colgroup,
          section,
          col,
          tr,
        ], '$td'),
        hasContent: true,
      });
    },
  };
}
