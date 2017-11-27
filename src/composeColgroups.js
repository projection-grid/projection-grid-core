import _ from 'underscore';

export function composeColgroups(model) {
  return [{
    attributes: {},
    cols: _.chain(model.columns)
      .map(col => model.composeCols(col, model))
      .flatten()
      .compact()
      .value(),
  }];
}
