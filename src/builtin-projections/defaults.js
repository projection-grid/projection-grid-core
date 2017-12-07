import { convert, pluck, pick } from '../utils';

function normalize(config) {
  const {
    caption = null,
    columns = [],
    records = [],
    thead = {},
    tfoot = {},
  } = config;

  const colgroup = Object.assign({}, { columns }, config.colgroup);
  const tbody = Object.assign({}, { records }, config.tbody);
  const colgroups = (config.colgroups || [{ key: 'colgroup-default' }]).map(cg =>
    (cg.key === 'colgroup-default' ? Object.assign(cg, colgroup) : cg));
  const tbodies = (config.tbodies || [{ key: 'tbody-default' }]).map(tb =>
    (tb.key === 'tbody-default' ? Object.assign(tb, tbody) : tb));

  return Object.assign({}, config, {
    caption,
    colgroups,
    thead,
    tbodies,
    tfoot,
  });
}

function decorate({ composeTable }, config, {
  DefaultCell,
  DefaultHeader,
}) {
  const table = normalize(config);
  const columns = [].concat(...pluck(table.colgroups, 'columns'));

  return {
    composeTable(/* table */) {
      const context = name => convert(
        obj => Object.assign({}, obj, { table }),
        table[name]
      );

      return Object.assign({}, composeTable(table), {
        caption: convert(this.composeCaption, context('caption')),
        colgroups: [].concat(...convert(this.composeColgroups, context('colgroups'))),
        thead: convert(this.composeThead, context('thead')),
        tbodies: [].concat(...convert(this.composeTbodies, context('tbodies'))),
        tfoot: convert(this.composeTfoot, context('tfoot')),
      });
    },

    composeCaption(/* caption */) { return null; },

    composeColgroups(colgroup) {
      const cols = columns.map(column =>
        Object.assign({}, colgroup.col, {
          column,
          colgroup,
          table: colgroup.table,
        }));

      return [{
        key: colgroup.key,
        cols: [].concat(...convert(this.composeCols, cols)),
      }];
    },

    composeCols(col) {
      return [{ key: `@col-${col.column.name}` }];
    },

    composeThead(thead) {
      const tr = Object.assign({}, thead.tr, pick(thead, 'table'), { thead });

      return { trs: [].concat(...convert(this.composeHeaderTrs, tr)) };
    },

    composeTbodies(tbody) {
      const trs = tbody.records.map(record => Object.assign({}, tbody.tr, pick(tbody, 'table'), {
        record,
        tbody,
      }));

      return [{
        key: tbody.key,
        trs: [].concat(...convert(this.composeDataTrs, trs)),
      }];
    },

    composeTfoot(/* tfoot */) { return null; },

    composeHeaderTrs(tr) {
      const ths = columns.map(column => Object.assign({}, tr.th, pick(tr, 'table', 'thead'), {
        column,
        tr,
      }));

      return [{
        key: 'tr-header',
        ths: [].concat(...convert(this.composeHeaderThs, ths)),
      }];
    },

    composeDataTrs(tr) {
      const tds = columns.map(column => Object.assign(
        {},
        tr.td,
        pick(tr, 'table', 'thead', 'tbody', 'tfoot', 'record'),
        {
          column,
          tr,
        }
      ));

      return [{
        key: `@tr-${tr.record[table.primaryKey]}`,
        tds: [].concat(...convert(this.composeDataTds, tds)),
      }];
    },

    composeHeaderThs(th) {
      return [{
        key: `@th-${th.column.name}`,
        content: Object.assign({}, {
          Component: DefaultHeader,
          props: pick(th, 'column', 'table'),
        }),
      }];
    },

    composeDataTds(td) {
      return [{
        key: `@td-${td.column.name}`,
        content: Object.assign({}, {
          Component: DefaultCell,
          props: pick(td, 'record', 'column', 'table'),
        }),
      }];
    },
  };
}

export function defaults(config) {
  return { decorate, config };
}
