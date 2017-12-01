import _ from 'underscore';

const COMMON_PROPS = ['props', 'classes', 'styles', 'events'];
const HEADER_RECORD = 'header';

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
    .result('colgroups', [{ key: 'default' }])
    .map(cg => (cg.key === 'default' ? _.defaults(colgroup, cg) : cg))
    .value();
  const tbodies = _.chain(config)
    .result('tbodies', [{ key: 'default' }])
    .map(tb => (tb.key === 'default' ? _.defaults(tbody, tb) : tb))
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
          key: `@${column.name}`,
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
      return [_.pick(col, COMMON_PROPS)];
    },

    composeThead(thead) {
      const tr = _.defaults({
        key: 'default',
        record: HEADER_RECORD,
      }, thead.tr);

      return _.chain(thead)
        .pick(COMMON_PROPS)
        .extend({ trs: [compose(tr, this.composeTrs)] })
        .value();
    },

    composeTbodies(tbody) {
      const trs = _.map(
        tbody.records,
        record => _.defaults({
          key: record[table.primaryKey],
          record,
        }, tbody.tr)
      );

      return [
        _.chain(tbody)
          .pick(COMMON_PROPS, 'key')
          .extend({ trs: compose(trs, this.composeTrs) })
          .value(),
      ];
    },

    composeTfoot(tfoot) {
      return _.pick(tfoot, COMMON_PROPS);
    },

    composeTrs(tr) {
      if (tr.record === HEADER_RECORD) {
        return this.composeHeaderTrs(tr);
      }
      if (_.isObject(tr.record)) {
        return this.composeDataTrs(tr);
      }
      return [];
    },

    composeHeaderTrs(tr) {
      const ths = _.map(
        columns,
        column => _.defaults({
          key: `@${column.name}`,
          record: HEADER_RECORD,
          column,
          table,
        }, tr.th)
      );

      return _.chain(tr)
        .pick(COMMON_PROPS, 'key')
        .extend({ ths: compose(ths, this.composeThs) })
        .value();
    },

    composeDataTrs(tr) {
      const { record } = tr;
      const tds = _.map(
        columns,
        column => _.defaults({
          key: `@${column.name}`,
          record,
          column,
          table,
        }, tr.td)
      );

      return _.chain(tr)
        .pick(COMMON_PROPS, 'key')
        .extend({ tds: compose(tds, this.composeTds) })
        .value();
    },

    composeThs(th) {
      if (th.record === HEADER_RECORD) {
        return this.composeHeaderThs(th);
      }
      return [_.pick(th, COMMON_PROPS, 'content')];
    },

    composeHeaderThs(th) {
      return [
        _.chain(th)
          .pick(COMMON_PROPS)
          .extend({
            content: _.defaults({
              Component: DefaultHeader,
              props: _.pick(th, 'column', 'table'),
            }, th.content),
          })
          .value(),
      ];
    },

    composeTds(td) {
      if (_.isObject(td.record)) {
        return this.composeDataTds(td);
      }
      return [_.pick(td, COMMON_PROPS, 'content')];
    },

    composeDataTds(td) {
      return [
        _.chain(td)
          .pick(COMMON_PROPS)
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
