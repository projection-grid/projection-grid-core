import { convert, mapObject } from '../utils';

function createModel(config, additionalProps = {}) {
  return Object.assign({
    key: config.key || null,
    props: config.props || {},
    classes: config.classes || [],
    styles: config.styles || {},
    events: config.events || {},
  }, additionalProps);
}

export function defaults() {
  return {
    composeTable(table) {
      return createModel(table, mapObject({
        caption: this.composeCaption,
        colgroups: this.composeColgroups,
        thead: this.composeThead,
        tbodies: this.composeTbody,
        tfoot: this.composeTfoot,
      }, (composer, key) => convert({ table }, composer, table[key])));
    },

    composeCaption(caption) {
      return createModel(caption);
    },

    composeColgroups(colgroup) {
      const cols = convert({ colgroup }, this.composeCols, colgroup.cols);
      return [createModel(colgroup, { cols })];
    },

    composeCols(col) {
      return [createModel(col)];
    },

    composeThead(thead) {
      const trs = convert({ thead }, this.composeTrs, thead.trs);
      return createModel(thead, { trs });
    },

    composeTbodies(tbody) {
      const trs = convert({ tbody }, this.composeTrs, tbody.trs);
      return [createModel(tbody, { trs })];
    },

    composeTfoot(tfoot) {
      const trs = convert({ tfoot }, this.composeTrs, tfoot.trs);
      return createModel(tfoot, { trs });
    },

    composeTrs(tr) {
      const tds = convert({ tr }, this.composeTds, tr.tds);
      return [createModel(tr, { tds })];
    },

    composeTds(td) {
      const { isHeader = false } = td;
      return [createModel(td, { isHeader })];
    },
  };
}
