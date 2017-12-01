import _ from 'underscore';
import { decorator } from '../utils/decorator';
import { COMMON_PROPS } from '../constants';

export function customColumn({
  composeCols,
  composeHeaderThs,
  composeDataTds,
}) {
  return {
    composeCols(col) {
      const model = _.map(
        composeCols(col),
        decorator(col.column.col, COMMON_PROPS, col)
      );

      return model;
    },
    composeHeaderThs(th) {
      const model = _.map(
        composeHeaderThs(th),
        decorator(th.column.th, [COMMON_PROPS, 'content'], th)
      );

      return model;
    },
    composeDataTds(td) {
      const model = _.map(
        composeDataTds(td),
        decorator(td.column.td, [COMMON_PROPS, 'content'], td)
      );

      return model;
    },
  };
}
