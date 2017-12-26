import { ioTest } from '../io-test';
import { defaults, header } from '../../../src/projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'header~composeTable',
  projections: [defaults, header],
  output: {
    ...DEFAULT_TABLE,
    thead: {
      ...DEFAULT_COMMON,
      tag: 'THEAD',
      trs: [{
        ...DEFAULT_COMMON,
        key: '@header',
        tag: 'TR',
        tds: [],
      }],
    },
  },
});
