import { find, isArray } from '../utils';

export default function ({
  composeTrs,
}) {
  return {
    composeTrs(tr) {
      const { data, placeholder, ...trOthers } = tr;
      const { section } = trOthers;
      const { table } = section;
      const content = find(
        [placeholder, section.placeholder, table.placeholder],
        v => v !== undefined
      );
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
