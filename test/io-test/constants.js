export const DEFAULT_COMMON = {
  key: null,
  classes: [],
  props: {},
  styles: {},
  events: {},
};
export const DEFAULT_CAPTION = { tag: 'CAPTION', content: null, ...DEFAULT_COMMON };
export const DEFAULT_COL = { tag: 'COL', ...DEFAULT_COMMON };
export const DEFAULT_COLGROUP = { tag: 'COLGROUP', cols: [], ...DEFAULT_COMMON };
export const DEFAULT_TD = { tag: 'TD', content: null, ...DEFAULT_COMMON };
export const DEFAULT_TH = { tag: 'TH', content: null, ...DEFAULT_COMMON };
export const DEFAULT_TR = { tag: 'TR', tds: [], ...DEFAULT_COMMON };
export const DEFAULT_TBODY = { ...DEFAULT_COMMON, tag: 'TBODY', trs: [] };
export const DEFAULT_THEAD = { ...DEFAULT_COMMON, tag: 'THEAD', trs: [] };
export const DEFAULT_TFOOT = { ...DEFAULT_COMMON, tag: 'TFOOT', trs: [] };
export const DEFAULT_TABLE = {
  ...DEFAULT_COMMON,
  tag: 'TABLE',
  caption: DEFAULT_CAPTION,
  colgroups: [],
  thead: DEFAULT_THEAD,
  tbodies: [],
  tfoot: DEFAULT_TFOOT,
};
