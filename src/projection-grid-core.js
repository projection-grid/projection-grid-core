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
} from './projections';

import { composer } from './composer';

export const createCore = ({
  defaultContentFactory = model => model,
  preProjections = [],
  postProjections = [],
}) => ({
  builtinPreProjections: [
    defaults,
    columns,
    data,
    header,
    defaultContent(defaultContentFactory),
    decoration,
    customRow,
    sorting,
  ],
  preProjections,
  builtinPostProjections: [
    autoDataKey,
  ],
  postProjections,
});

export const composeRenderModel = (core, { config, projections = [] }) => ({
  table: composer([
    ...core.builtinPreProjections,
    ...core.preProjections,
    ...projections,
    ...core.postProjections,
    ...core.builtinPostProjections,
  ]).composeTable(config),
});
