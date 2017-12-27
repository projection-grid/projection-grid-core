import { ioTest } from '../io-test';
import { defaults } from '../../../src/projections';
import {
  DEFAULT_TABLE,
} from '../constants';

ioTest({
  name: 'defaults~composeTable with default config',
  projections: [defaults],
  output: DEFAULT_TABLE,
});
