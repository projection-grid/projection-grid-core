import _ from 'underscore';
import { coreDefault } from './core-default';

export class ProjectionGridCore {
  compose({ config: userConfig, projections = [] }) {
    function resolve(config, projection) {
      if (_.isArray(projection)) {
        return projection.reduce(resolve, config);
      }
      if (_.isFunction(projection.reducer)) {
        return projection.reducer(config, projection.options);
      }
      if (_.isFunction(projection)) {
        return projection(config);
      }
      return config;
    }

    const config = resolve(userConfig, [coreDefault, ...projections]);

    return { table: config.composeTable({ config }) };
  }
}
