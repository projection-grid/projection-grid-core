import { ioTest } from '../io-test';
import { defaults, columns } from '../../../src/projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'columns~composeTable with [root].cols',
  projections: [defaults, columns],
  input: {
    cols: [
      { key: 'foo' },
      { key: 'bar' },
    ],
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
  },
});

ioTest({
  name: 'columns~composeTable with [root].colgroups[].cols',
  projections: [defaults, columns],
  input: {
    colgroups: [{
      key: 'default-colgroup',
      cols: [
        { key: 'foo' },
        { key: 'bar' },
      ],
    }],
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      key: 'default-colgroup',
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
  },
});

ioTest({
  name: 'columns~composeTable with both [root].cols & [root].colgroups[].cols',
  projections: [defaults, columns],
  input: {
    cols: [
      { key: 'tic' },
      { key: 'tac' },
      { key: 'toe' },
    ],
    colgroups: [{
      key: 'default-colgroup',
      cols: [
        { key: 'foo' },
        { key: 'bar' },
      ],
    }],
  },
  output: {
    ...DEFAULT_TABLE,
    colgroups: [{
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      key: 'default-colgroup',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'foo',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'bar',
      }],
    }, {
      ...DEFAULT_COMMON,
      tag: 'COLGROUP',
      cols: [{
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'tic',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'tac',
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'toe',
      }],
    }],
  },
});
