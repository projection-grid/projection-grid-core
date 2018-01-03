import { last, pluck, isArray, assign } from '../utils';

export default function ({
  composeTrs,
}) {
  return {
    composeTrs(tr) {
      const {
        data,
        section: {
          table,
        },
        section,
      } = tr;
      let placeholders = pluck([table, section, tr], 'placeholder');
      placeholders = placeholders.filter(v => v !== undefined);
      const placeholder = last(placeholders);
      if (isArray(data) && data.length === 0 && placeholder) {
        const { data: orignData, ...obj } = assign({}, tr, {
          content: placeholder,
        });
        return composeTrs(obj);
      }
      return composeTrs(tr);
    },
  };
}
