import { mapObject, assign } from './utils';

function mergeComposer(comp, proj) {
  return assign(comp, mapObject(proj(comp), func => func.bind(comp)));
}

export function composer(projections) {
  return projections.reduce(mergeComposer, {
    composeTable: () => ({}),
  });
}
