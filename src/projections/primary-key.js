import { isObject } from '../utils';

export default function ({
  composeTrs,
}) {
  return {
    composeTrs(tr) {
      const { primaryKey } = tr.section.table;
      const { key, ...trOther } = tr;

      return composeTrs(isObject(tr.data) && key == null ? {
        key: tr.data[primaryKey],
        ...trOther,
      } : tr);
    },
  };
}
