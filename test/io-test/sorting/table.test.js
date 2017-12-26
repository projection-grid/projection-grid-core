import { ioTest } from '../io-test';
import {
  defaults,
  columns,
  header,
  data,
  sorting,
} from '../../../src/projections';
import { DEFAULT_TABLE, DEFAULT_COMMON } from '../constants';

const onSort = jest.fn();
const reducer = jest.fn();

reducer.mockImplementation((s, { key }) => (s === key ? null : key));

ioTest({
  name: 'sorting~composeTable with full config',
  projections: [defaults, columns, header, data, sorting],
  input: {
    sorting: {
      $td: {
        classes: ['sorting'],
      },
      reducer,
      onSort,
    },
    cols: [{
      key: 'Foo',
    }, {
      key: 'Bar',
      sorting: true,
    }],
    data: [{ Foo: 1, Bar: 2 }],
    tfoot: {
      trs: [{
        tds: [{}],
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
          classes: ['sorting'],
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
          classes: ['sorting'],
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
        tds: [{
          ...DEFAULT_COMMON,
          tag: 'TD',
        }],
      }],
    },
  },
  matchObject: true,
  validate({ output }) {
    expect(onSort).not.toHaveBeenCalled();
    expect(reducer).not.toHaveBeenCalled();
    output.thead.trs[0].tds[0].events.click();
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(reducer).toBeCalledWith(undefined, { key: 'Foo' });
    expect(onSort).toHaveBeenCalledTimes(1);
    expect(onSort).toBeCalledWith('Foo');
  },
});
