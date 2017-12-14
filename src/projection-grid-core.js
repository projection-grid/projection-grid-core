import {
  defaults,
  data,
  decoration,
} from './builtin-projections';

import { composer } from './composer';

export class ProjectionGridCore {
  compose({ config, projections = [] }) {
    return {
      table: composer([
        defaults,
        data,
        decoration,
        ...projections,
      ]).composeTable(config),
    };
  }
}
