import _ from 'underscore';
import { Decorator } from '../utils/decorator';
import { COMMON_PROPS } from '../constants';

export function customRow({
  composeThead,
  composeTbodies,
  composeTfoot,
  composeDataTrs,
}) {
  function convertCustomRows(rows, key) {
    if (!rows) {
      return [];
    }
    const trs = rows.map((row, index) => {
      if (row.records) {
        const dataTbody = composeTbodies(row);
        return _.pluck(dataTbody, 'trs');
      }

      if (row.content) {
        const td = _.defaults({}, {
          props: _.defaults(row.props, { colSpan: '100%' }),
        }, row);
        return {
          key: `${key}-${index}`,
          tds: [_.defaults({}, { key: 'custom-row' }, td)],
        };
      }
      return null;
    });
    return [{
      key,
      trs: _.flatten(_.compact(trs)),
    }];
  }

  function customHeadFoot({
    model = {},
    config = {},
  }) {
    const beforeTrs = _.pluck(convertCustomRows(config.BeforeRows, 'custom-before-rows'));
    const afterTrs = _.pluck(convertCustomRows(config.AfterRows, 'custom-after-rows'));
    const trs = []
      .concat(_.flatten(beforeTrs))
      .concat((model && model.trs) || [])
      .concat(_.flatten(afterTrs));
    if (trs.length === 0) {
      return null;
    }
    return _.defaults({}, {
      trs,
    }, model);
  }

  return {
    composeThead(thead) {
      return customHeadFoot({
        model: composeThead(thead),
        config: thead,
      });
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
      const model = deco(tr, composeDataTrs(tr));
      return model;
    },

    composeTfoot(tfoot) {
      return customHeadFoot({
        model: composeTfoot(tfoot),
        config: tfoot,
      });
    },
  };
}
