import { mapObject, assign } from './utils';

function reducerWithScope(reducer, scope) {
  return (state, ...args) => assign({}, state, {
    [scope]: reducer(state[scope], ...args),
  });
}

function dispatchWithScope(dispatch, scope) {
  return (reducer, ...args) => dispatch(reducerWithScope(reducer, scope), ...args)[scope];
}

function mergeComposer({ state, dispatch }, comp, proj) {
  const { scope } = proj;

  return assign(comp, mapObject(proj(comp, scope ? {
    state: state[scope],
    dispatch: dispatchWithScope(dispatch, scope),
  } : {}), func => func.bind(comp)));
}

export function composer(projections, options) {
  return projections.reduce(mergeComposer.bind(this, options), {
    composeTable: () => ({}),
  });
}
