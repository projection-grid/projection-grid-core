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
      const deco = Decorator.create(col.column.col, [COMMON_PROPS, 'key', 'content']);
      const model = _.map(composeCols(col), m => deco(m, col));

      return model;
    },
    composeHeaderThs(th) {
      const deco = Decorator.create(th.column.th, [COMMON_PROPS, 'key', 'content']);
      const model = _.map(composeHeaderThs(th), m => deco(m, th));

      return model;
    },
    composeDataTds(td) {
      const deco = Decorator.create(td.column.td, [COMMON_PROPS, 'key', 'content']);
      const model = _.map(composeDataTds(td), m => deco(m, td));

      return model;
    },
  };
}
