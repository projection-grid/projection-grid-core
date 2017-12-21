export default function ({
  composeTrs,
}) {
  return {
    composeTrs(tr) {
      const { tds = [], content } = tr;
      return composeTrs({
        ...tr,
        tds: content ? tds.concat({
          content,
          props: {
            colspan: 0,
          },
        }) : tds,
      });
    },
  };
}
