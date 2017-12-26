export const DEFAULT_COMMON = {
  key: 'default',
  classes: [],
  props: {},
  styles: {},
  events: {},
};
export const DEFAULT_CAPTION = { tag: 'CAPTION', content: null, ...DEFAULT_COMMON };
export const DEFAULT_COL = { tag: 'COL', ...DEFAULT_COMMON };
export const DEFAULT_COLGROUP = { tag: 'COLGROUP', cols: [], ...DEFAULT_COMMON };
export const DEFAULT_TD = { tag: 'TD', content: null, ...DEFAULT_COMMON };
export const DEFAULT_TR = { tag: 'TR', tds: [], ...DEFAULT_COMMON };
export const DEFAULT_SECTION = { tag: 'TBODY', trs: [], ...DEFAULT_COMMON };
export const DEFAULT_TABLE = {
  tag: 'TABLE',
  caption: DEFAULT_CAPTION,
  colgroups: [],
  thead: Object.assign({}, DEFAULT_COMMON, {
    tag: 'THEAD', trs: [], key: 'defaultTHEAD',
  }),
  tbodies: [],
  tfoot: Object.assign({}, DEFAULT_COMMON, {
    tag: 'TFOOT', trs: [], key: 'defaultTFOOT',
  }),
  ...DEFAULT_COMMON,
};
