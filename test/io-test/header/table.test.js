import { ioTest } from '../io-test';
import { defaults, columns, header, data } from '../../../src/builtin-projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'header~composeTable',
  projections: [defaults, columns, header, data],
  input: {
    cols: [
      { key: 'a' },
      { key: 'b' },
    ],
    data: [{ a: 1, b: 2 }],
    tfoot: { hasHeader: true },
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'a',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'b',
      }],
    }],
    thead: {
      ...DEFAULT_COMMON,
      tag: 'THEAD',
      trs: [{
        ...DEFAULT_COMMON,
        key: '@header',
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TH',
          key: 'a',
          content: null,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TH',
          key: 'b',
          content: null,
        }],
      }],
    },
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'a',
          content: null,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'b',
          content: null,
        }],
      }],
    }],
    tfoot: {
      ...DEFAULT_COMMON,
      tag: 'TFOOT',
      trs: [{
        ...DEFAULT_COMMON,
        key: '@header',
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TH',
          key: 'a',
          content: null,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TH',
          key: 'b',
          content: null,
        }],
      }],
    },
  },
});
