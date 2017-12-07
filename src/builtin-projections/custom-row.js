import { Decorator } from '../utils/decorator';
import { COMMON_PROPS } from '../constants';
import { applyValue } from '../utils';

function composeCustomRow(tr) {
  if (tr.content) {
    return {
      key: tr.key || 'custom-row',
      tds: [applyValue({
        key: 'custom-row-td',
        props: { colSpan: '100%' },
        content: tr.content,
      }, tr.td)],
    };
  }
  return null;
}

export function customRow({
  composeTrs,
}) {
  return {
    composeTrs(tr) {
      if (tr.content) {
        const deco = Decorator.create(tr, COMMON_PROPS);
        return deco(tr, composeCustomRow(tr));
      }
      return composeTrs(tr);
    },
  };
}
