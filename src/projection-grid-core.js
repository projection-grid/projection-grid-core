import {
  defaults,
  columns,
  data,
  header,
  defaultContent,
  decoration,
  customRow,
  sorting,
  autoDataKey,
  PolyfillColspan,
} from './projections';

import { composer } from './composer';

const getComposeFunction = projections => function compose({ config = {} }) {
  return {
    table: composer(projections).composeTable(config),
  };
};

const getUseFunction = curProjections => function use({
  pre = [],
  post = [],
} = {}) {
  const projections = [...pre, ...curProjections, ...post];

  return {
    use: getUseFunction(projections),
    compose: getComposeFunction(projections),
  };
};

export function createCore({
  defaultContentFactory = model => model,
} = {}) {
  const use = getUseFunction([]);

  const compose = getComposeFunction([]);

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
        autoDataKey,
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
