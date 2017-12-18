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
export const DEFAULT_TR = { tag: 'TR', tds: [], ...DEFAULT_COMMON };
export const DEFAULT_SECTION = { tag: 'TBODY', trs: [], ...DEFAULT_COMMON };
export const DEFAULT_TABLE = {
  tag: 'TABLE',
  caption: DEFAULT_CAPTION,
  colgroups: [],
  thead: { tag: 'THEAD', trs: [], ...DEFAULT_COMMON },
  tbodies: [],
  tfoot: { tag: 'TFOOT', trs: [], ...DEFAULT_COMMON },
  ...DEFAULT_COMMON,
};
