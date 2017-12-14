import { ioTest } from '../io-test';
import { defaults, data, decoration } from '../../../src/builtin-projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'decoration~composeTable with default config',
  projections: [defaults, data, decoration],
  output: DEFAULT_TABLE,
});

ioTest({
  name: 'decoration-composeTable with just data',
  projections: [defaults, data, decoration],
  input: { data: [{ a: 1, b: 2 }] },
  output: {
    ...DEFAULT_TABLE,
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [],
      }],
    }],
  },
});
