import _ from 'underscore';

export function columnWidth({ composeCols }) {
  return {
    composeCols(col) {
      const columns = composeCols(col);
      return _.map(columns, (column) => {
        const widthProps = _.chain({})
          .defaults(column)
          .defaults(col.column)
          .pick('width')
          .value();

        // extend props in col to support width:100, width: "100", width: "100px"
        return _.defaults({}, {
          props: _.defaults({}, widthProps, column.props),
        }, column);
      });
    },
  };
}
