import { decorate } from '../utils';

export default function sorting({
  composeTds,
}, { state, dispatch }) {
  return {
    composeTds(td) {
      const { col, isHeader, tr: { section: { table } } } = td;
      const decorators = [];

      if (col) {
        const {
          sorting: {
            $td = null,
            onSort = () => {},
            reducer = (s, { key }) => (s === key ? null : key),
            isSorting = ({ key }) => state === key,
          } = {},
        } = table;

        if (isSorting(col)) {
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
