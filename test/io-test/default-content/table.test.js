import { ioTest } from '../io-test';
import {
  defaults,
  columns,
  header,
  data,
  defaultContent,
} from '../../../src/projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'defaultContent~composeTable',
  projections: [defaults, columns, header, data, defaultContent(model => model)],
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
    }, {
      key: null,
    }],
    data: [{ a: 1, bar: 2 }],
    tfoot: {
      trs: [{
        key: 'some-row',
        tds: [{
          key: 'a',
        }, {
          key: 'b',
          content: 'cell-b',
        }],
      }],
    },
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
      }, {
        ...DEFAULT_COMMON,
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
        }, {
          ...DEFAULT_COMMON,
          tag: 'TH',
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
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          content: null,
        }],
      }],
    }],
    tfoot: {
      ...DEFAULT_COMMON,
      tag: 'TFOOT',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 'some-row',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'a',
          content: null,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'b',
          content: 'cell-b',
        }],
      }],
    },
  },
});
