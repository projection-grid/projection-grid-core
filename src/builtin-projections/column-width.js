import _ from 'underscore';

export default function columnWidth({ composerCols }) {
  return {
    composerCols(col) {
      const columns = composerCols(col);
      return _.map(columns, (column) => {
        const widthProps = _.chain({})
          .defaults(column)
          .defaults(col)
          .pick('width')
          .value();

        // extend props in col to support width:100, width: "100", width: "100px"
        _.extend(column.props, widthProps);
        return column;
      });
    },
  };
}
