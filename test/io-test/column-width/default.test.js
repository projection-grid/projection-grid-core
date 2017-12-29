import { ioTest } from '../io-test';
import { defaults, columns, columnWidth } from '../../../src/projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'columns~composeTable with [root].cols',
  projections: [defaults, columns, columnWidth],
  input: {
    cols: [
      { key: 'foo', width: 100 },
      { key: 'bar', props: { width: 120 } },
      { key: 'third' },
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
        props: {
          width: 100,
        },
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'bar',
        props: {
          width: 120,
        },
      }, {
        ...DEFAULT_COMMON,
        tag: 'COL',
        key: 'third',
      }],
    }],
  },
});
