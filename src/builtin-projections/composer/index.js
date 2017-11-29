import _ from 'underscore';
import { composeCaption } from './compose-caption';
import { composeColgroups } from './compose-colgroups';
import { composeCols } from './compose-cols';
import { composeContent } from './compose-content';
import { composeTable } from './compose-table';
import { composeTbodies } from './compose-tbodies';
import { composeTds } from './compose-tds';
import { composeTfoot } from './compose-tfoot';
import { composeThead } from './compose-thead';
import { composeThs } from './compose-ths';
import { composeTrs } from './compose-trs';

export default function composer(config) {
  return _.defaults({
    composeTable,
    composeTbodies,
    composeTds,
    composeTfoot,
    composeThs,
    composeThead,
    composeTrs,
    composeColgroups,
    composeCols,
    composeContent,
    composeCaption,
  }, config);
}
