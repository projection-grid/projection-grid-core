import {
  defaults,
  columns,
  data,
  header,
  defaultContent,
  decoration,
  customRow,
  sorting,
} from './projections';

import { composer } from './composer';

export class ProjectionGridCore {
  constructor({
    projections = [],
    postProjections = [],
  } = {}) {
    this.projections = projections;
    this.postProjections = postProjections;
  }

  compose({ config, projections = [] }) {
    return {
      table: composer([
        ...this.projections,
        ...projections,
        ...this.postProjections,
      ]).composeTable(config),
    };
  }

  static createDefault(customDefaultContent = () => {}) {
    return new ProjectionGridCore({
      projections: [
        defaults,
        columns,
        data,
        header,
        defaultContent,
        customDefaultContent,
        decoration,
        customRow,
        sorting,
      ],
    });
  }
}
