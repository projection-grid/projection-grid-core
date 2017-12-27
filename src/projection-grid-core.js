import {
  defaults,
  columns,
  data,
  header,
  defaultContent,
  decoration,
  customRow,
  sorting,
  autoDataKey,
} from './projections';

import { composer } from './composer';

export class ProjectionGridCore {
  constructor({
    defaultContentFactory = model => model,
  } = {}) {
    this.projections = [];
    this.builtinPreProjections = [
      defaults,
      columns,
      data,
      header,
      defaultContent(defaultContentFactory),
      decoration,
      customRow,
      sorting,
    ];
    this.builtinPostProjections = [
      autoDataKey,
    ];
  }

  pipe(projections = []) {
    this.projections = this.projections.concat(projections);

    return this;
  }

  pipeBuiltinPre() {
    return this.pipe(this.builtinPreProjections);
  }

  pipeBuiltinPost() {
    return this.pipe(this.builtinPostProjections);
  }

  compose({ config }) {
    return {
      table: composer(this.projections).composeTable(config),
    };
  }

  static createCore(...args) {
    return new ProjectionGridCore(...args);
  }
}

