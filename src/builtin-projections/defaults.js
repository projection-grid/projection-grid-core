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
        colgroups: [].concat(...convert(this.composeColgroups, context('colgroups'))),
        thead: convert(this.composeThead, context('thead')),
        tbodies: [].concat(...convert(this.composeTbodies, context('tbodies'))),
        tfoot: convert(this.composeTfoot, context('tfoot')),
      }, composeTable(table));
    },

    composeCaption(/* caption */) { return null; },

    composeColgroups(colgroup) {
      const cols = _.map(
        columns,
        column => _.defaults({
          column,
          colgroup,
          table: colgroup.table,
        }, colgroup.col)
      );

      return [{
        key: colgroup.key,
        cols: [].concat(...convert(this.composeCols, cols)),
      }];
    },

    composeCols(col) {
      return [{ key: `@col-${col.column.name}` }];
    },

    composeThead(thead) {
      const tr = _.defaults({
        thead,
      }, _.pick(thead, 'table'), thead.tr);

      return { trs: [].concat(...convert(this.composeHeaderTrs, tr)) };
    },

    composeTbodies(tbody) {
      const trs = _.map(tbody.records, record => _.defaults({
        record,
        tbody,
      }, _.pick(tbody, 'table'), tbody.tr));

      return [{
        key: tbody.key,
        trs: [].concat(...convert(this.composeDataTrs, trs)),
      }];
    },

    composeTfoot(/* tfoot */) { return null; },

    composeHeaderTrs(tr) {
      const ths = _.map(columns, column => _.defaults({
        column,
        tr,
      }, _.pick(tr, 'table', 'thead'), tr.th));

      return [{
        key: 'tr-header',
        ths: [].concat(...convert(this.composeHeaderThs, ths)),
      }];
    },

    composeDataTrs(tr) {
      const tds = _.map(columns, column => _.defaults({
        column,
        tr,
      }, _.pick(tr, 'table', 'thead', 'tbody', 'tfoot', 'record'), tr.td));

      return [{
        key: `@tr-${tr.record[table.primaryKey]}`,
        tds: [].concat(...convert(this.composeDataTds, tds)),
      }];
    },

    composeHeaderThs(th) {
      return [{
        key: `@th-${th.column.name}`,
        content: _.defaults({
          Component: DefaultHeader,
          props: _.pick(th, 'column', 'table'),
        }),
      }];
    },

    composeDataTds(td) {
      return [{
        key: `@td-${td.column.name}`,
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
