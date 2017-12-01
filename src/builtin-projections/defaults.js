import _ from 'underscore';
import { convert } from '../utils/convert';

function normalize(config) {
  const {
    caption = null,
    columns = [],
    records = [],
    thead = {},
    tfoot = {},
  } = config;

  const colgroup = _.extend({ columns }, config.colgroup);
  const tbody = _.extend({ records }, config.tbody);
  const colgroups = _.chain(config)
    .result('colgroups', [{ key: 'colgroup-default' }])
    .map(cg => (cg.key === 'colgroup-default' ? _.defaults(colgroup, cg) : cg))
    .value();
  const tbodies = _.chain(config)
    .result('tbodies', [{ key: 'tbody-default' }])
    .map(tb => (tb.key === 'tbody-default' ? _.defaults(tbody, tb) : tb))
    .value();

  return _.defaults({
    caption,
    colgroups,
    thead,
    tbodies,
    tfoot,
  }, config);
}

function decorate({ composeTable }, config, {
  DefaultCell,
  DefaultHeader,
}) {
  const table = normalize(config);
  const columns = [].concat(..._.pluck(table.colgroups, 'columns'));

  return {
    composeTable(/* table */) {
      const context = name => convert(
        obj => _.defaults({ table }, obj),
        table[name]
      );

      return _.defaults({
        caption: convert(this.composeCaption, context('caption')),
        colgroups: convert(this.composeColgroups, context('colgroups')),
        thead: convert(this.composeThead, context('thead')),
        tbodies: convert(this.composeTbodies, context('tbodies')),
        tfoot: convert(this.composeTfoot, context('tfoot')),
      }, composeTable(table));
    },

    composeCaption(/* caption */) { return null; },

    composeColgroups(colgroup) {
      const cols = _.map(
        columns,
        column => _.defaults({
          key: `@col-${column.name}`,
          column,
          colgroup,
          table: colgroup.table,
        }, colgroup.col)
      );

      return [{
        key: colgroup.key,
        cols: convert(this.composeCols, cols),
      }];
    },

    composeCols(col) { return [_.pick(col, 'key')]; },

    composeThead(thead) {
      const tr = _.defaults({
        key: 'tr-header',
        thead,
      }, _.pick(thead, 'table'), thead.tr);

      return { trs: convert(this.composeHeaderTrs, tr) };
    },

    composeTbodies(tbody) {
      const trs = _.map(tbody.records, record => _.defaults({
        key: `@tr-${record[table.primaryKey]}`,
        record,
        tbody,
      }, _.pick(tbody, 'table'), tbody.tr));

      return [{
        key: tbody.key,
        trs: convert(this.composeDataTrs, trs),
      }];
    },

    composeTfoot(/* tfoot */) { return null; },

    composeHeaderTrs(tr) {
      const ths = _.map(columns, column => _.defaults({
        key: `@th-${column.name}`,
        column,
        tr,
      }, _.pick(tr, 'table', 'thead'), tr.th));

      return [{
        key: tr.key,
        ths: convert(this.composeHeaderThs, ths),
      }];
    },

    composeDataTrs(tr) {
      const tds = _.map(columns, column => _.defaults({
        key: `@td-${column.name}`,
        column,
        tr,
      }, _.pick(tr, 'table', 'thead', 'tbody', 'tfoot', 'record'), tr.td));

      return [{
        key: tr.key,
        tds: convert(this.composeDataTds, tds),
      }];
    },

    composeHeaderThs(th) {
      return [{
        key: th.key,
        content: _.defaults({
          Component: DefaultHeader,
          props: _.pick(th, 'column', 'table'),
        }),
      }];
    },

    composeDataTds(td) {
      return [{
        key: td.key,
        content: _.defaults({
          Component: DefaultCell,
          props: _.pick(td, 'record', 'column', 'table'),
        }),
      }];
    },
  };
}

export function defaults(config) {
  return { decorate, config };
}
