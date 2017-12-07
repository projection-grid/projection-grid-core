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
  tbody.rows = tbody.rows || tbody.records.map(record => Object.assign({}, { record }, tbody.tr));
  const colgroups = (config.colgroups || [{ key: 'colgroup-default' }]).map(cg =>
    (cg.key === 'colgroup-default' ? Object.assign(cg, colgroup) : cg));
  const tbodies = (config.tbodies || [{ key: 'tbody-default' }]).map(tb =>
    (tb.key === 'tbody-default' ? Object.assign(tb, tbody) : tb));

  return Object.assign({}, config, {
    caption,
    colgroups,
    thead: Object.assign({}, { rows: [{ isHeader: true }] }, thead),
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
      let trs = [];
      if (thead && thead.rows) {
        trs = thead.rows.map(row => Object.assign({}, row, pick(thead, 'table'), { thead }));
      }

      return { trs: [].concat(...convert(this.composeHeaderTrs, trs)) };
    },

    composeTbodies(tbody) {
      const trs = tbody.rows.map(row => Object.assign({}, row, pick(tbody, 'table', 'tfoot', 'thead'), {
        tbody,
      }));

      return [{
        key: tbody.key,
        trs: [].concat(...convert(this.composeTrs, trs)),
      }];
    },

    composeTfoot(tfoot) {
      if (tfoot && tfoot.rows) {
        return {
          trs: [].concat(...convert(this.composeTrs, tfoot.rows)),
        };
      }
      return null;
    },

    composeHeaderTrs(tr) {
      if (tr.isHeader) {
        const trs = columns.map(column => Object.assign({}, tr.th, pick(tr, 'table', 'thead'), {
          column,
          tr,
        }));

        return [{
          key: 'tr-header',
          tds: [].concat(...convert(this.composeHeaderThs, trs)),
        }];
      }
      return this.composeTrs(tr);
    },

    composeTrs(tr) {
      if (tr.record) {
        return this.composeDataTrs(tr);
      }
      return null;
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
        isHeader: true,
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
