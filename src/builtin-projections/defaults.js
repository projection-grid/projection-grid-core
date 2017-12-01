import _ from 'underscore';
import { COMMON_PROPS } from '../constants';

function compose(content, method) {
  if (_.isArray(content)) {
    return [].concat(..._.map(content, method));
  }
  if (_.isObject(content)) {
    return method(content);
  }
  return null;
}

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
      return _.chain(table)
        .pick(COMMON_PROPS)
        .extend({
          caption: compose(table.caption, this.composeCaption),
          colgroups: compose(table.colgroups, this.composeColgroups),
          thead: compose(table.thead, this.composeThead),
          tbodies: compose(table.tbodies, this.composeTbodies),
          tfoot: compose(table.tfoot, this.composeTfoot),
        })
        .defaults(composeTable(table))
        .value();
    },

    composeCaption(caption) {
      return _.pick(caption, COMMON_PROPS, 'content');
    },

    composeColgroups(colgroup) {
      const cols = _.map(
        columns,
        column => _.defaults({
          key: `@col-${column.name}`,
          column,
          table,
        }, colgroup.col)
      );

      return [
        _.chain(colgroup)
          .pick(COMMON_PROPS, 'key')
          .extend({ cols: compose(cols, this.composeCols) })
          .value(),
      ];
    },

    composeCols(col) {
      return [_.pick(col, COMMON_PROPS, 'key')];
    },

    composeThead(thead) {
      const tr = _.defaults({ key: 'tr-header' }, thead.tr);

      return _.chain(thead)
        .pick(COMMON_PROPS)
        .extend({ trs: [compose(tr, this.composeHeaderTrs)] })
        .value();
    },

    composeTbodies(tbody) {
      const trs = _.map(
        tbody.records,
        record => _.defaults({
          key: `@tr-${record[table.primaryKey]}`,
          record,
        }, tbody.tr)
      );

      return [
        _.chain(tbody)
          .pick(COMMON_PROPS, 'key')
          .extend({ trs: compose(trs, this.composeDataTrs) })
          .value(),
      ];
    },

    composeTfoot(tfoot) {
      return _.pick(tfoot, COMMON_PROPS);
    },

    composeTrs(tr) {
      if (_.isObject(tr.record)) {
        return this.composeDataTrs(tr);
      }
      return _.pick(tr, COMMON_PROPS, 'key');
    },

    composeHeaderTrs(tr) {
      const ths = _.map(
        columns,
        column => _.defaults({
          key: `@th-${column.name}`,
          column,
          table,
        }, tr.th)
      );

      return _.chain(tr)
        .pick(COMMON_PROPS, 'key')
        .extend({ ths: compose(ths, this.composeHeaderThs) })
        .value();
    },

    composeDataTrs(tr) {
      const { record } = tr;
      const tds = _.map(
        columns,
        column => _.defaults({
          key: `td-@${column.name}`,
          record,
          column,
          table,
        }, tr.td)
      );

      return _.chain(tr)
        .pick(COMMON_PROPS, 'key')
        .extend({ tds: compose(tds, this.composeDataTds) })
        .value();
    },

    composeHeaderThs(th) {
      return [
        _.chain(th)
          .pick(COMMON_PROPS, 'key')
          .extend({
            content: _.defaults({
              Component: DefaultHeader,
              props: _.pick(th, 'column', 'table'),
            }, th.content),
          })
          .value(),
      ];
    },

    composeDataTds(td) {
      return [
        _.chain(td)
          .pick(COMMON_PROPS, 'key')
          .extend({
            content: _.defaults({
              Component: DefaultCell,
              props: _.pick(td, 'record', 'column', 'table'),
            }, td.content),
          })
          .value(),
      ];
    },
  };
}

export function defaults(config) {
  return { decorate, config };
}
