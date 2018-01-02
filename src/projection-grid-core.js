import {
  defaults,
  columns,
  data,
  header,
  defaultContent,
  decoration,
  customRow,
  sorting,
  columnWidth,
  autoKey,
  zeroColspan,
} from './projections';

import { composer } from './composer';
import { isArray, find } from './utils/array';

const getComposeFunction = projections => function compose({
  config = {},
  state = {},
  dispatch = () => ({}),
} = {}) {
  return {
    table: composer([
      ...projections.pre,
      ...projections.post,
    ], { state, dispatch }).composeTable(config),
  };
};

const getUseFunction = curProjections => function use(projections = []) {
  const nextProjections = {
    pre: [...curProjections.pre, ...find([projections, projections.pre, []], isArray)],
    post: [...find([projections.post, []], isArray), ...curProjections.post],
  };

  return {
    use: getUseFunction(nextProjections),
    compose: getComposeFunction(nextProjections),
  };
};

export function createCore() {
  const initProjections = { pre: [], post: [] };
  const use = getUseFunction(initProjections);
  const compose = getComposeFunction(initProjections);
  const useBuiltin = function useBuiltin({
    defaultContentFactory = content => content,
  } = {}) {
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
        columnWidth,
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
