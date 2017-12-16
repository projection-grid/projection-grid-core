import { ioTest } from '../io-test';
import {
  defaults,
  columns,
  header,
  data,
  defaultContent,
} from '../../../src/builtin-projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'defaultContent~composeTable',
  projections: [defaults, columns, header, data, defaultContent],
  input: {
    cols: [{
      key: 'a',
    }, {
      key: 'b',
      title: 'Bar',
      property: 'bar',
    }, {
      key: 'c',
      property: ({ a, bar }) => a + bar,
    }],
    data: [{ a: 1, bar: 2 }],
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        key: 'a',
        tag: 'COL',
      }, {
        ...DEFAULT_COMMON,
        key: 'b',
        tag: 'COL',
      }, {
        ...DEFAULT_COMMON,
        key: 'c',
        tag: 'COL',
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
          key: 'a',
          tag: 'TH',
          content: 'a',
        }, {
          ...DEFAULT_COMMON,
          key: 'b',
          tag: 'TH',
          content: 'Bar',
        }, {
          ...DEFAULT_COMMON,
          key: 'c',
          tag: 'TH',
          content: 'c',
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
          content: 1,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'b',
          content: 2,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'c',
          content: 3,
        }],
      }],
    }],
  },
});
