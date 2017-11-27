import _ from 'underscore';

export function composeThead(model) {
  return {
    attributes: {},
    trs: [{
      attributes: {},
      ths: _.chain(model.columns)
        .map(col => model.composeThs(col, model))
        .flatten()
        .compact()
        .value(),
    }],
  };
}
