import { compact, last, pluck, assign } from '../utils';

export default function ({
  composeSections,
}) {
  return {
    composeSections(section) {
      const { tag, table, trs = [] } = section;
      if (tag === 'TBODY' && trs.length === 0) {
        const placeholders = pluck([table, section], 'placeholder');
        return composeSections(assign({}, section, {
          trs: [{ content: last(compact(placeholders)) }],
        }));
      }
      return composeSections(section);
    },
  };
}
