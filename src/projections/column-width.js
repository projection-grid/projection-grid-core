import { isUndefined, decorate } from '../utils';

export default function ({
  composeCols,
}) {
  return {
    composeCols(col) {
      const { width } = col;
      const decorators = [];
      if (!isUndefined(width)) {
        decorators.push({
          props: { width },
        });
      }

      return decorate(composeCols(col), {
        context: col,
        decorators,
      });
    },
  };
}
