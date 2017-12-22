import { ioTest } from '../io-test';
import {
  defaults,
  columns,
  header,
  data,
  sorting,
} from '../../../src/builtin-projections';
import { DEFAULT_TABLE, DEFAULT_COMMON } from '../constants';

ioTest({
  name: 'sorting~composeTable with empty config',
  projections: [defaults, sorting],
  output: DEFAULT_TABLE,
});

ioTest({
  name: 'sorting~composeTable with default header and data',
  projections: [defaults, columns, header, data, sorting],
  input: {
    cols: [{
      key: 'Foo',
    }, {
      key: 'Bar',
    }],
    data: [{ Foo: 1, Bar: 2 }],
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'Foo',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'Bar',
      }],
    }],
    thead: {
      ...DEFAULT_COMMON,
      tag: 'THEAD',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: '@header',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TH',
          key: 'Foo',
          content: null,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TH',
          key: 'Bar',
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
          key: 'Foo',
          content: null,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'Bar',
          content: null,
        }],
      }],
    }],
  },
  matchObject: true,
  validate({ output }) {
    expect(() => {
      output.thead.trs[0].tds[1].events.click();
    }).not.toThrow();
  },
});
