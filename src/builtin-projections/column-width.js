import _ from 'underscore';

export default function columnWidth({ composerCols }) {
  return {
    composerCols(col) {
      const column = composerCols(col);
      _.extend(column.props, _.pick(col, 'width')); // extend props in col to support width:100, width: "100", width: "100px"
      return column;
    },
  };
}
