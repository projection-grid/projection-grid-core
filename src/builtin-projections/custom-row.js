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
    return _.flatten(_.compact(trs));
  }

  function customHeadFoot({
    model = {},
    config = {},
  }) {
    const beforeTrs = convertCustomRows(config.BeforeRows, 'custom-before-rows');
    const afterTrs = convertCustomRows(config.AfterRows, 'custom-after-rows');
    const trs = []
      .concat(beforeTrs)
      .concat((model && model.trs) || [])
      .concat(afterTrs);
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
      const beforeTrs = convertCustomRows(tbody.BeforeRows, 'tbody-before-rows');
      const afterTrs = convertCustomRows(tbody.AfterRows, 'tbody-after-rows');
      const convert2Tbodies = (trs, key) => (trs.length > 0 ? [{ key, trs }] : []);
      return []
        .concat(convert2Tbodies(beforeTrs, 'tbody-before-rows'))
        .concat(composeTbodies(tbody))
        .concat(convert2Tbodies(afterTrs, 'tbody-after-rows'));
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
