import { ioTest } from '../io-test';
import {
  defaults,
  columns,
  data,
  primaryKey,
  header,
  defaultContent,
  columnTree,
} from '../../../src/projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

const HEADER_ROWS = [{
  ...DEFAULT_COMMON,
  tag: 'TR',
  key: '@header-0',
  tds: [{
    ...DEFAULT_COMMON,
    tag: 'TH',
    key: 'A',
    content: 'A',
    props: {
      colspan: 2,
    },
  }, {
    ...DEFAULT_COMMON,
    tag: 'TH',
    key: 'D',
    content: 'D',
    props: {
      rowspan: 2,
    },
  }, {
    ...DEFAULT_COMMON,
    tag: 'TH',
    key: 'E',
    content: 'E',
  }],
}, {
  ...DEFAULT_COMMON,
  tag: 'TR',
  key: '@header-1',
  tds: [{
    ...DEFAULT_COMMON,
    tag: 'TH',
    key: 'B',
    content: 'B',
  }, {
    ...DEFAULT_COMMON,
    tag: 'TH',
    key: 'C',
    content: 'C',
  }, {
    ...DEFAULT_COMMON,
    tag: 'TH',
    key: 'F',
    content: 'F',
  }],
}];

ioTest({
  name: 'columnTree~composeTable with tree columns',
  projections: [
    defaults,
    columns,
    data,
    header,
    defaultContent(v => v),
    columnTree,
    primaryKey,
  ],
  input: {
    primaryKey: 'B',
    cols: [{
      key: 'A',
      cols: [{
        key: 'B',
      }, {
        key: 'C',
      }],
    }, {
      key: 'D',
    }, {
      key: 'E',
      cols: [{
        key: 'F',
      }],
    }],
    data: [
      { B: 2, C: 3, D: 4 },
      { A: 5, B: 6, F: 7 },
    ],
    tfoot: {
      trs: { isHeader: true },
    },
    hasHeader: true,
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'B',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'C',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'D',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'F',
      }],
    }],
    thead: {
      ...DEFAULT_COMMON,
      tag: 'THEAD',
      trs: HEADER_ROWS,
    },
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 2,
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'B',
          content: 2,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'C',
          content: 3,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'D',
          content: 4,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'F',
          content: null,
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 6,
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'B',
          content: 6,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'C',
          content: null,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'D',
          content: null,
        }, {
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'F',
          content: 7,
        }],
      }],
    }],
    tfoot: {
      ...DEFAULT_COMMON,
      tag: 'TFOOT',
      trs: HEADER_ROWS,
    },
  },
});
