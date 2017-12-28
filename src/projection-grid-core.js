import {
  defaults,
  columns,
  data,
  header,
  defaultContent,
  decoration,
  customRow,
  sorting,
  autoKey,
  zeroColspan,
} from './projections';

import { composer } from './composer';
import { isArray } from './utils/array';

const getComposeFunction = projections => function compose({
  config = {},
  state = {},
  dispatch = () => ({}),
}) {
  return {
    table: composer([
      ...projections.pre,
      ...projections.post,
    ], { state, dispatch }).composeTable(config),
  };
};

const getUseFunction = curProjections => function use(projections = []) {
  const nextProjections = {
    pre: [...curProjections.pre, ...(isArray(projections) ? projections : projections.pre)],
    post: [...(isArray(projections.post) ? projections.post : []), ...curProjections.post],
  };

  return {
    use: getUseFunction(nextProjections),
    compose: getComposeFunction(nextProjections),
  };
};

export function createCore({
  defaultContentFactory = model => model,
} = {}) {
  const initProjections = { pre: [], post: [] };
  const use = getUseFunction(initProjections);
  const compose = getComposeFunction(initProjections);
  const useBuiltin = function useBuiltin() {
    return use({
      pre: [
        defaults,
        columns,
        data,
        header,
        defaultContent(defaultContentFactory),
        decoration,
        customRow,
        sorting,
      ],
      post: [
        autoKey,
        zeroColspan,
      ],
    });
  };

  return {
    use,
    compose,
    useBuiltin,
  };
}
