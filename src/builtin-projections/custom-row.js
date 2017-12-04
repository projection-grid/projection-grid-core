import { Decorator } from '../utils/decorator';
import { COMMON_PROPS } from '../constants';

/**
 * Custom rows define:
 * pendRows: [
 *   {
 *     props:
 *     events:
 *     classes:
 *     styles:
 *     content: {
 *       Component: XXX,
 *       props:
 *       events:
 *       class:
 *       styles:
 *     }
 *   }
 * ]
 * tbody:{tr:{classes: ()=>{}/[], props, events,styles}}
 */

export default function customRow({
  composeThead,
  composeTbodies,
  composeTfoot,
  composeDataTrs,
}) {
  function convertCustomRows(rows, key) {
    const trs = rows.map((row, index) => {
      if (row.records) {
        const dataTbody = composeTbodies(row);
        return dataTbody.trs;
      }

      if (row.content) {
        return [{
          key: `${key}-${index}`,
          tds: [row],
        }];
      }
      return [];
    });
    return {
      key,
      trs,
    };
  }

  return {
    composeThead(thead) {
      return composeThead(thead);
    },
    composeTbodies(tbody) {
      // just prepend and append tbody before and after original tbodies
      // we should not support prepand and append it in tbody
      // we cannot assumpt there is only one tbody return in composeTbodies
      return []
        .concat(convertCustomRows(tbody.BeforeRows, 'tbody-before-rows'))
        .concat(composeTbodies(tbody))
        .concat(convertCustomRows(tbody.AfterRows, 'tbody-after-rows'));
    },
    // custom tr with COMMON_PROPS in tbody.tr, which included in tr
    composeDataTrs(tr) {
      const deco = Decorator.create(tr, COMMON_PROPS);
      const model = deco(tr, composeDataTrs(tr)); // the model should be a object not array
      return model;
    },

    composeTfoot(tfoot) {
      return [].concat(composeTfoot(tfoot));
      // after foot
    },
  };
}
