import {
  defaults,
  columns,
  data,
  header,
  defaultContent,
  decoration,
  customRow,
  sorting,
} from './projections';

import { composer } from './composer';

export const createCore = ({
  defaultContentFactory = model => model,
  preProjections = [],
  postProjections = [],
}) => ({
  builtInProjections: [
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
  builtInPostProjections: [],
  postProjections,
});

export const composeRenderModel = (core, { config, projections = [] }) => ({
  table: composer([
    ...core.builtInProjections,
    ...core.preProjections,
    ...projections,
    ...core.builtInPostProjections,
    ...core.postProjections,
  ]).composeTable(config),
});
