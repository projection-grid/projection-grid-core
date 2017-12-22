import { ioTest } from '../io-test';
import {
  defaults,
  columns,
  header,
  data,
  sorting,
} from '../../../src/builtin-projections';
import { DEFAULT_TABLE, DEFAULT_COMMON } from '../constants';

const onSort = jest.fn();
const next = jest.fn();

next.mockImplementation(s => !s);

ioTest({
  name: 'sorting~composeTable with full config',
  projections: [defaults, columns, header, data, sorting],
  input: {
    sorting: {
      $td: {
        classes: ['sorting'],
      },
      next,
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
    expect(next).not.toHaveBeenCalled();
    output.thead.trs[0].tds[1].events.click();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith({
      key: 'Bar',
      sorting: true,
    });
    expect(onSort).toHaveBeenCalledTimes(1);
    expect(onSort).toBeCalledWith({
      key: 'Bar',
      sorting: false,
    });
  },
});
