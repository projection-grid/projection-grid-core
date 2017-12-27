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
  PolyfillColspan,
} from './projections';

import { composer } from './composer';
import { isArray } from './utils/array';

const getComposeFunction = projections => function compose({ config = {} }) {
  return {
    table: composer([...projections.pre, ...projections.post]).composeTable(config),
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
        PolyfillColspan,
      ],
    });
  };

  return {
    use,
    compose,
    useBuiltin,
  };
}
