import { ioTest } from '../io-test';
import { defaults, customRow, PolyfillColspan } from '../../../src/projections';
import { DEFAULT_COMMON } from '../constants';

const click = jest.fn();

ioTest({
  name: 'polyfill-colspan~composeTable with tr.content',
  projections: [defaults, customRow],
  postProjections: [PolyfillColspan],
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
      }, {
        tds: [{
          content: 'header1',
        }],
        content: 'heanderothers',
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
          content: '1',
          props: {
            rowspan: 2,
          },
        }, {
          content: '2',
          props: {
            colspan: 2,
          },
        }],
        content: '3',
      }, {
        key: 'third-tr',
        tds: [{
          content: '1',
          props: {
            rowspan: 2,
          },
        }, {
          content: '2',
        }, {
          content: '3',
        }],
        content: '4',
      }, {
        key: '4th-tr',
        tds: [{
          content: '1',
          props: {
            colspan: 2,
          },
        }, {
          content: '2',
          props: {
            rowspan: 2,
            colspan: 2,
          },
        }, {
          content: '3',
          props: {
            rowspan: 2,
            colspan: 2,
          },
        }, {
          content: '4',
        }],
      }, {
        key: '5th-tr',
        tds: [{
          content: '1',
        }, {
          content: '2',
        }, {
          content: '3',
        }],
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
            colspan: 7,
          },
          tag: 'TD',
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'header1',
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: 'heanderothers',
          props: {
            colspan: 6,
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
            colspan: 7,
          },
          tag: 'TD',
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 'second-tr',
        tds: [{
          ...DEFAULT_COMMON,
          content: '1',
          props: {
            rowspan: 2,
          },
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '2',
          props: {
            colspan: 2,
          },
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '3',
          props: {
            colspan: 4,
          },
          tag: 'TD',
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 'third-tr',
        tds: [{
          ...DEFAULT_COMMON,
          content: '1',
          props: {
            rowspan: 2,
          },
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '2',
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '3',
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '4',
          props: {
            colspan: 3,
          },
          tag: 'TD',
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: '4th-tr',
        tds: [{
          ...DEFAULT_COMMON,
          content: '1',
          props: {
            colspan: 2,
          },
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '2',
          props: {
            colspan: 2,
            rowspan: 2,
          },
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '3',
          props: {
            colspan: 2,
            rowspan: 2,
          },
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '4',
          tag: 'TD',
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: '5th-tr',
        tds: [{
          ...DEFAULT_COMMON,
          content: '1',
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '2',
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          content: '3',
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
