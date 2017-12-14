import { mapObject } from '../../../src/utils';
import { ioTest } from '../io-test';
import { defaults } from '../../../src/builtin-projections';
import {
  DEFAULT_TABLE,
  DEFAULT_CAPTION,
  DEFAULT_COLGROUP,
  DEFAULT_COL,
  DEFAULT_SECTION,
  DEFAULT_TR,
  DEFAULT_TD,
} from '../constants';

mapObject({
  composeTable: DEFAULT_TABLE,
  composeCaption: DEFAULT_CAPTION,
  composeColgroups: [DEFAULT_COLGROUP],
  composeCols: [DEFAULT_COL],
  composeSections: [DEFAULT_SECTION],
  composeTrs: [DEFAULT_TR],
  composeTds: [DEFAULT_TD],
}, (output, method) => ioTest({
  name: `defaults-${method} with default values`,
  projections: [defaults],
  method,
  output,
}));
