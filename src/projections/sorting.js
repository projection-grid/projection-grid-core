import { assign, decorate } from '../utils';

export default function sorting({
  composeCols,
  composeTds,
}, { state, dispatch }) {
  return {
    composeCols(col) {
      return composeCols(assign({
        sorting: state === col.key,
      }, col));
    },
    composeTds(td) {
      const { col, isHeader, tr: { section: { table } } } = td;
      const decorators = [];

      if (col) {
        const {
          sorting: {
            $td = null,
            onSort = () => {},
            reducer = (s, { key }) => (s === key ? null : key),
          } = {},
        } = table;

        if (col.sorting) {
          decorators.push($td);
        }

        if (isHeader) {
          decorators.push({
            events: {
              click: () => onSort(dispatch(reducer, col)),
            },
          });
        }
      }

      return decorate(composeTds(td), {
        context: td,
        decorators,
        hasContent: true,
      });
    },
  };
}

sorting.scope = 'projection-grid-core.sorting';
