import {
  defaults,
  columns,
  data,
  header,
  defaultContent,
  decoration,
} from './builtin-projections';

import { composer } from './composer';

export class ProjectionGridCore {
  compose({ config, projections = [] }) {
    return {
      table: composer([
        defaults,
        columns,
        data,
        header,
        defaultContent,
        decoration,
        ...projections,
      ]).composeTable(config),
    };
  }
}
