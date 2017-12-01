import _ from 'underscore';
import { Decorator } from '../utils/decorator';
import { COMMON_PROPS } from '../constants';

const decorations = {
  composeCols: [],
  composeHeaderThs: ['content'],
  composeDataTds: ['content'],
};

export function columnDecoration(composer) {
  const orig = _.clone(composer);

  return _.mapObject(decorations, (props, name) => (context) => {
    const deco = Decorator.create(context.column.col, COMMON_PROPS.concat(props));
    const model = deco(context, orig[name](context));

    return model;
  });
}
