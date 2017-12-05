import _ from 'underscore';
import {
  defaults,
  decoration,
  columnDecoration,
  sortable,
  columnWidth,
  customRow,
} from './builtin-projections';

function mergeComposer(composer, funcs) {
  return _.extend(composer, _.mapObject(funcs, func => func.bind(composer)));
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
      if (_.isArray(projection)) {
        return projection.reduce(decorate, composer);
      }
      if (_.isFunction(projection && projection.decorate)) {
        return mergeComposer(
          composer,
          projection.decorate(composer, config, projection.config)
        );
      }
      if (_.isFunction(projection)) {
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
      columnWidth,
      customRow,
      projections,
    ]);
    const { composeTable } = _.bindAll(composer, ..._.keys(composer));

    return { table: composeTable(config) };
  }
}
