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
            reducer = (s, { key }) => {
              if (!s || !s[key]) {
                return { [key]: 'desc' };
              }

              if (s[key] === 'asc') {
                return {};
              }

              return { [key]: 'asc' };
            },
            getSortingState = ({ key }) => ((state && state[key]) ? state[key] : false),
          } = {},
        } = table;

        const sortingState = getSortingState(col);

        if (sortingState) {
          decorators.push($td[sortingState] || $td);
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
