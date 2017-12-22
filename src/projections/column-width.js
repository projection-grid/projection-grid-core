import { applyValue, pick, assign } from '../utils';

export function columnWidth({ composeCols }) {
  return {
    composeCols(col) {
      const columns = composeCols(col);

      return columns.map((column) => {
        const widthProps = pick(assign({}, column, col.column), 'width');

        return applyValue(column, {
          props: widthProps,
        });
      });
    },
  };
}
