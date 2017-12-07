import { mapObject, Decorator } from '../utils';
import { COMMON_PROPS } from '../constants';

const decorations = {
  composeTable: [],
  composeCaption: ['content'],
  composeColgroups: [],
  composeCols: [],
  composeThead: [],
  composeTbodies: [],
  composeTfoot: [],
  composeHeaderTrs: [],
  composeDataTrs: [],
  composeHeaderThs: ['content'],
  composeDataTds: ['content'],
};

export function decoration(composer) {
  const orig = { ...composer };

  return mapObject(decorations, (props, name) => (context) => {
    const deco = Decorator.create(context, COMMON_PROPS.concat(props));
    const model = deco(context, orig[name](context));

    return model;
  });
}
