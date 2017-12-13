import { mapObject } from '../../src/utils';
import defaults from '../../src/builtin-projections/defaults';

const DEFAULT_COMMON = {
  key: null,
  classes: [],
  props: {},
  styles: {},
  events: {},
};
const DEFAULT_CAPTION = { tag: 'CAPTION', content: null, ...DEFAULT_COMMON };
const DEFAULT_COL = { tag: 'COL', ...DEFAULT_COMMON };
const DEFAULT_COLGROUP = { tag: 'COLGROUP', cols: [], ...DEFAULT_COMMON };
const DEFAULT_TD = { tag: 'TD', content: null, ...DEFAULT_COMMON };
const DEFAULT_TR = { tag: 'TR', tds: [], ...DEFAULT_COMMON };
const DEFAULT_SECTION = { tag: 'TBODY', trs: [], ...DEFAULT_COMMON };
const DEFAULT_TABLE = {
  tag: 'TABLE',
  caption: DEFAULT_CAPTION,
  colgroups: [],
  thead: { tag: 'THEAD', trs: [], ...DEFAULT_COMMON },
  tbodies: [],
  tfoot: { tag: 'TFOOT', trs: [], ...DEFAULT_COMMON },
  ...DEFAULT_COMMON,
};

describe('The defaults projection', () => {
  const composer = {};
  Object.assign(composer, mapObject(defaults(composer), func => func.bind(composer)));

  test('compose default caption', () => {
    expect(composer.composeCaption({})).toEqual(DEFAULT_CAPTION);
  });

  test('compose default cols', () => {
    expect(composer.composeCols({})).toEqual([DEFAULT_COL]);
  });

  test('compose default colgroups', () => {
    expect(composer.composeColgroups({})).toEqual([DEFAULT_COLGROUP]);
  });

  test('compose default tds', () => {
    expect(composer.composeTds({})).toEqual([DEFAULT_TD]);
  });

  test('compose default trs', () => {
    expect(composer.composeTrs({})).toEqual([DEFAULT_TR]);
  });

  test('compose default sections', () => {
    expect(composer.composeSections({})).toEqual([DEFAULT_SECTION]);
  });

  test('compose default table', () => {
    expect(composer.composeTable({})).toEqual(DEFAULT_TABLE);
  });
});
