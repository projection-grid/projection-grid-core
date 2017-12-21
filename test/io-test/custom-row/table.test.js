import { ioTest } from '../io-test';
import { defaults, customRow } from '../../../src/builtin-projections';
import { DEFAULT_COMMON } from '../constants';

const click = jest.fn();

ioTest({
  name: 'customRow~composeTable with tr.content',
  projections: [defaults, customRow],
  input: {
    key: 'default-table',
    props: { foo: 1, bar: 2 },
    classes: ['class-1', 'class-2'],
    styles: { background: 'blue' },
    events: { click },
    caption: { key: 'default-caption' },
    thead: [{
      key: 'default-thead',
      trs: [{
        content: 'header placehold',
      }],
    }],
    tbodies: [{
      key: 'default-tbody',
      trs: [{
        key: 'first-tr',
        content: 'first tr placehold',
      }, {
        key: 'second-tr',
        tds: [{
          content: 'a',
        }],
        content: 'second tr placehold',
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
    colgroups: [],
    thead: {
      ...DEFAULT_COMMON,
      tag: 'THEAD',
      key: 'default-thead',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'header placehold',
          props: {
            colspan: 0,
          },
          tag: 'TD',
        }],
      }],
    },
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'default-tbody',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 'first-tr',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'first tr placehold',
          props: {
            colspan: 0,
          },
          tag: 'TD',
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 'second-tr',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'a',
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: 'second tr placehold',
          props: {
            colspan: 0,
          },
          tag: 'TD',
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
