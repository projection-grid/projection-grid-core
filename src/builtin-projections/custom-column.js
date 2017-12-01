import _ from 'underscore';
import { Decorator } from '../utils/decorator';
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
        Decorator.create(col.column.col, [COMMON_PROPS, 'key'], col)
      );

      return model;
    },
    composeHeaderThs(th) {
      const model = _.map(
        composeHeaderThs(th),
        Decorator.create(th.column.th, [COMMON_PROPS, 'key', 'content'], th)
      );

      return model;
    },
    composeDataTds(td) {
      const model = _.map(
        composeDataTds(td),
        Decorator.create(td.column.td, [COMMON_PROPS, 'key', 'content'], td)
      );

      return model;
    },
  };
}
