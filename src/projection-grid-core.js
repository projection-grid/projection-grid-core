import _ from 'underscore';
import builtinProjections from './builtin-projections';

function resolve(config, projection) {
  if (_.isArray(projection)) {
    return projection.reduce(resolve, config);
  }
  if (_.isFunction(projection && projection.reducer)) {
    return projection.reducer(config, projection.options);
  }
  if (_.isFunction(projection)) {
    return projection(config);
  }
  return config;
}

export class ProjectionGridCore {
  compose({ config: userConfig, projections = [] }) {
    const config = resolve(userConfig, [builtinProjections, projections]);

    return { table: config.composeTable({ config }) };
  }
}
