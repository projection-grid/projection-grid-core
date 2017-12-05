import { applyValue } from '../utils';

export default function columnWidth({ composeCols }) {
  return {
    composeCols(col) {
      const columns = composeCols(col);
      return columns.map((column) => {
        const widthProps = Object.assign({}, column, col);

        return applyValue(column, {
          props: widthProps,
        });
      });
    },
  };
}
