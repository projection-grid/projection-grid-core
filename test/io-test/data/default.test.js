import { ioTest } from '../io-test';
import { defaults, data } from '../../../src/builtin-projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'data~composeTable with default config',
  projections: [defaults, data],
  output: DEFAULT_TABLE,
});

ioTest({
  name: 'data~composeTable with just data',
  projections: [defaults, data],
  input: { data: [{ a: 1, b: 2 }] },
  output: {
    ...DEFAULT_TABLE,
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [],
      }],
    }],
  },
});

ioTest({
  name: 'data~composeTable with data and cols',
  projections: [defaults, data],
  input: {
    cols: [{ key: 'a' }],
    data: [{ a: 1, b: 2 }],
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
      }],
    }],
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          content: null,
        }],
      }],
    }],
  },
})
