import { defaults, columns, data, decoration } from '../../../src/builtin-projections';
import { isArray } from '../../../src/utils';
import { ioTest } from '../io-test';
import { DEFAULT_COMMON } from '../constants';

const clickOuter = jest.fn();
const clickInner = jest.fn();


ioTest({
  name: 'decoration~composeTable with full config',
  projections: [defaults, columns, data, decoration],
  input: {
    key: 'default-table',
    props: { foo: 1, bar: 2 },
    classes: ['class-1', 'class-2'],
    styles: { background: 'blue' },
    caption: { key: 'default-caption' },
    data: [{ a: 1, b: 2 }],
    $tr: {
      key: ({ data: d }, key) => (d && !isArray(d) && d.a) || key,
    },
    $td: {
      key: ({ col }, key) => (col && col.key) || key,
      events: { click: clickOuter },
    },
    $tbody: {
      styles: {
        background: 'blue',
      },
    },
    colgroups: [{
      cols: { key: 'col-a' },
    }],
    thead: {
      key: 'default-thead',
      $td: {
        events: { click: clickInner },
        props: {
          title: 'some-random-title',
        },
        classes: ['title-cell'],
      },
      trs: [{
        tds: [{}],
      }],
    },
    tbodies: [{
      key: 'default-tbody',
      trs: [{
        $td: ({ key }) => ({
          content: key,
        }),
        key: 'first-tr',
        data: { b: 2 },
      }, {
        $td: {
          key: ({ col }) => `td-${col.key}`,
        },
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
    events: {},
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
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          content: null,
          props: {
            title: 'some-random-title',
          },
          classes: ['title-cell'],
        }],
      }],
    },
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'default-tbody',
      styles: { background: 'blue' },
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 'first-tr',
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'col-a',
          content: 'col-a',
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 3,
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'td-col-a',
          events: { click: clickOuter },
          content: null,
        }],
      }],
    }, {
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      styles: { background: 'blue' },
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        key: 1,
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
          key: 'col-a',
          events: { click: clickOuter },
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
  matchObject: true,
  validate({ output }) {
    expect(clickOuter).not.toHaveBeenCalled();
    expect(clickInner).not.toHaveBeenCalled();
    output.thead.trs[0].tds[0].events.click();
    expect(clickOuter).toHaveBeenCalledTimes(1);
    expect(clickInner).toHaveBeenCalledTimes(1);
  },
});
