import { ioTest } from '../io-test';
import { defaults, data, columns, customRow, placeholder } from '../../../src/projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'placeholder with [root].placeholder',
  projections: [defaults, data, customRow, placeholder],
  input: {
    placeholder: 'placeholder',
    tbodies: [{
      key: 'default-tbody-placeholder',
      data: [],
    }],
  },
  output: {
    ...DEFAULT_TABLE,
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'default-tbody-placeholder',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'placeholder',
          props: {
            colspan: 0,
          },
          tag: 'TD',
        }],
      }],
    }],
  },
});

ioTest({
  name: 'placeholder with [root].placeholder, [root].tbodies[i].trs.data.length > 0',
  projections: [defaults, data, columns, customRow, placeholder],
  input: {
    placeholder: 'placeholder',
    cols: [
      { key: 'foo' },
      { key: 'bar' },
    ],
    tbodies: [{
      key: 'default-tbody-2',
      trs: [{ data: [{ foo: 1, bar: 2 }] }],
    }],
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'foo',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'bar',
      }],
    }],
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'default-tbody-2',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          key: 'foo',
          content: null,
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          key: 'bar',
          content: null,
          tag: 'TD',
        }],
      }],
    }],
  },
});

ioTest({
  name: 'placeholder with [root].tbodies[i].trs.data.length === 0',
  projections: [defaults, data, columns, customRow, placeholder],
  input: {
    placeholder: 'placeholder',
    cols: [
      { key: 'foo' },
      { key: 'bar' },
    ],
    tbodies: [{
      key: 'default-tbody-2',
      trs: [{ data: [{ foo: 1, bar: 2 }] }, { data: [], placeholder: 'Data is empty' }],
    }],
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'foo',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'bar',
      }],
    }],
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'default-tbody-2',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          key: 'foo',
          content: null,
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          key: 'bar',
          content: null,
          tag: 'TD',
        }],
      }, {
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'Data is empty',
          props: {
            colspan: 0,
          },
          tag: 'TD',
        }],
      }],
    }],
  },
});

ioTest({
  name: 'placeholder with [root].tbodies[i].trs.data.length === 0 and no placeholder',
  projections: [defaults, data, columns, customRow, placeholder],
  input: {
    placeholder: 'placeholder',
    cols: [
      { key: 'foo' },
      { key: 'bar' },
    ],
    tbodies: [{
      key: 'default-tbody-2',
      trs: [{ data: [{ foo: 1, bar: 2 }] }, { data: [], placeholder: null }],
    }],
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'foo',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'bar',
      }],
    }],
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'default-tbody-2',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          key: 'foo',
          content: null,
          tag: 'TD',
        }, {
          ...DEFAULT_COMMON,
          key: 'bar',
          content: null,
          tag: 'TD',
        }],
      }],
    }],
  },
});
