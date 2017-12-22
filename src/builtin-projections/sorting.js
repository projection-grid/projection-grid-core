import { decorate } from '../utils';

export default function sorting({ composeTds }) {
  return {
    composeTds(td) {
      const { col, isHeader, tr: { section: { table } } } = td;
      const decorators = [];

      if (col) {
        const {
          sorting: {
            $td = null,
            onSort = () => {},
            next = ({ sorting: s }) => !s,
          } = {},
        } = table;

        if (col.sorting) {
          decorators.push($td);
        }

        if (isHeader) {
          decorators.push({
            events: {
              click: () => {
                onSort({
                  ...col,
                  sorting: next(col),
                });
              },
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
