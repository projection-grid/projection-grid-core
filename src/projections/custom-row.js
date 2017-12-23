import { assign } from '../utils';

export default function ({
  composeTrs,
}) {
  return {
    composeTrs(tr) {
      const { tds = [], content } = tr;
      return composeTrs(assign({}, tr, {
        tds: content ? tds.concat({
          content,
          props: {
            colspan: 0,
          },
        }) : tds,
      }));
    },
  };
}
