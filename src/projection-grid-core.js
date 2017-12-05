import {
  defaults,
  decoration,
  columnDecoration,
  sortable,
  theme,
  columnWidth,
} from './builtin-projections';
import { mapObject, isFunction, isArray } from './utils';

function mergeComposer(composer, funcs) {
  return Object.assign(composer, mapObject(funcs, func => func.bind(composer)));
}

export class ProjectionGridCore {
  constructor({
    DefaultCell,
    DefaultHeader,
  }) {
    this.defaultComponents = {
      DefaultCell,
      DefaultHeader,
    };
  }

  compose({ config, projections = [] }) {
    function decorate(composer, projection) {
      if (isArray(projection)) {
        return projection.reduce(decorate, composer);
      }
      if (isFunction(projection && projection.decorate)) {
        return mergeComposer(
          composer,
          projection.decorate(composer, config, projection.config)
        );
      }
      if (isFunction(projection)) {
        return mergeComposer(
          composer,
          projection(composer, config)
        );
      }
      return composer;
    }

    const composer = decorate({
      composeTable: () => ({}),
    }, [
      defaults(this.defaultComponents),
      decoration,
      columnDecoration,
      sortable,
      projections,
      theme,
      columnWidth,
    ]);
    const { composeTable } =
      // Object.keys(composer).forEach((composeFunc) => {
      //   window.console.log(composeFunc);
      //   composeFunc.bind(composer);
      // });

      mapObject(composer, composeFunc => composeFunc.bind(composer));

    // _.bindAll(composer, ...Object.keys(composer));

    return { table: composeTable(config) };
  }
}
