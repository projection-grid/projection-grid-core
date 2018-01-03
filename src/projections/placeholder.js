import { find, pluck, isArray } from '../utils';

export default function ({
  composeTrs,
}) {
  return {
    composeTrs(tr) {
      const { data, ...trOthers } = tr;
      const {
        section: {
          table,
        },
        section,
      } = trOthers;
      const placeholders = pluck([tr, section, table], 'placeholder');
      const content = find(placeholders, v => v !== undefined);
      if (isArray(data) && data.length === 0 && content) {
        return composeTrs({
          ...trOthers,
          content,
        });
      }
      return composeTrs(tr);
    },
  };
}
