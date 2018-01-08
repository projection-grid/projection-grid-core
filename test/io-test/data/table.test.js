import { ioTest } from '../io-test';
import { defaults, data, primaryKey } from '../../../src/projections';
import { DEFAULT_COMMON } from '../constants';

const click = () => window.console.log('click table');

ioTest({
  name: 'data~composeTable with full config',
  projections: [defaults, data, primaryKey],
  input: {
    key: 'default-table',
    primaryKey: 'a',
    props: { foo: 1, bar: 2 },
    classes: ['class-1', 'class-2'],
    styles: { background: 'blue' },
    events: { click },
    caption: { key: 'default-caption' },
    data: [{ a: 1, b: 2 }],
    colgroups: [{
      cols: { key: 'col-a' },
    }],
    thead: [{
      key: 'default-thead',
    }],
    tbodies: [{
      key: 'default-tbody',
      trs: [{
        key: 'first-tr',
      }, {
        key: 'second-tr',
        data: { a: 3, b: 4 },
      }],
    }],
    tfoot: [],
  },
  output: {
    tag: 'TABLE',
    key: 'default-table',
    props: { foo: 1, bar: 2 },
    classes: ['class-1', 'class-2'],
    styles: { background: 'blue' },
    events: { click },
    caption: {
      ...DEFAULT_COMMON,
      tag: 'CAPTION',
      content: null,
      key: 'default-caption',
    },
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'col-a',
      }],
    }],
    thead: {
      ...DEFAULT_COMMON,
      tag: 'THEAD',
      key: 'default-thead',
      trs: [],
    },
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'default-tbody',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 'first-tr',
        tds: [],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 'second-tr',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'col-a',
          content: null,
        }],
      }],
    }, {
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 1,
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'col-a',
          content: null,
        }],
      }],
    }],
    tfoot: {
      ...DEFAULT_COMMON,
      tag: 'TFOOT',
      key: null,
      trs: [],
    },
  },
});
