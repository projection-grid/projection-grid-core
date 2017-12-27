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

const generateBuiltinProjections = ({
  defaultContentFactory,
}) => ({
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

const getComposeFunction = projections => function compose({ config = {} } = {}) {
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
    useBuiltin: ({
      defaultContentFactory = model => model,
    } = {}) => getUseFunction(projections)(generateBuiltinProjections({ defaultContentFactory })),
    compose: getComposeFunction(projections),
  };
};

export function createCore(projections = []) {
  return getUseFunction(projections)();
}
