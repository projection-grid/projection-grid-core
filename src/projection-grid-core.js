import {
  defaults,
  columns,
  data,
  header,
  defaultContent,
  decoration,
  customRow,
  sorting,
  zeroColspan,
} from './projections';

import { composer } from './composer';

export class ProjectionGridCore {
  constructor({
    projections = [],
    postProjections = [],
    dispatch,
  }) {
    this.projections = projections;
    this.postProjections = postProjections;
    this.dispatch = dispatch;
  }

  compose({ config, projections = [], state }) {
    const { dispatch } = this;

    return {
      table: composer([
        ...this.projections,
        ...projections,
        ...this.postProjections,
      ], { state, dispatch }).composeTable(config),
    };
  }

  static createDefault(dispatch) {
    return new ProjectionGridCore({
      projections: [
        defaults,
        columns,
        data,
        header,
        defaultContent,
        decoration,
        customRow,
        sorting,
        zeroColspan,
      ],
      dispatch,
    });
  }
}
