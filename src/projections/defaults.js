import { mapObject, isArray, assign } from '../utils';

function createModel(config, ...additionalProps) {
  return assign({
    key: config.key || `default-${config.tag} `,
    props: config.props || {},
    classes: config.classes || [],
    styles: config.styles || {},
    events: config.events || {},
  }, ...additionalProps);
}

const toVector = obj => (isArray(obj) ? obj : [obj]);
const toScalar = obj => (isArray(obj) ? obj[0] || null : obj);
const extendParam = (compose, ...ext) =>
  config => compose(assign({}, config, ...ext));
const handleVector = compose =>
  (config = []) => [].concat(...toVector(config).map(compose));
const handleScalar = compose =>
  (config = {}) => toScalar(compose(toScalar(config)));

export default function () {
  return {
    composeTable(table) {
      const extendContext = (compose, tag) => extendParam(compose, { table, tag });

      return createModel(table, mapObject({
        caption: handleScalar(extendContext(this.composeCaption)),
        colgroups: handleVector(extendContext(this.composeColgroups)),
        thead: handleScalar(extendContext(this.composeSections, 'THEAD')),
        tbodies: handleVector(extendContext(this.composeSections, 'TBODY')),
        tfoot: handleScalar(extendContext(this.composeSections, 'TFOOT')),
      }, (compose, name) => compose(table[name])), {
        tag: 'TABLE',
      });
    },

    composeCaption(caption) {
      const { content = null } = caption;
      return createModel(caption, { content, tag: 'CAPTION' });
    },

    composeColgroups(colgroup) {
      const composeCols = handleVector(extendParam(this.composeCols, { colgroup }));
      const cols = composeCols(colgroup.cols);
      return [createModel(colgroup, { cols, tag: 'COLGROUP' })];
    },

    composeCols(col) {
      return [createModel(col, { tag: 'COL' })];
    },

    composeSections(section) {
      const { tag = 'TBODY' } = section;
      const composeTrs = handleVector(extendParam(this.composeTrs, { section }));
      const trs = composeTrs(section.trs);
      return [createModel(section, { trs, tag })];
    },

    composeTrs(tr) {
      const composeTds = handleVector(extendParam(this.composeTds, { tr }));
      const tds = composeTds(tr.tds);
      return [createModel(tr, { tds, tag: 'TR' })];
    },

    composeTds(td) {
      const { tag = 'TD', content = null } = td;
      return [createModel(td, { content, tag })];
    },
  };
}
