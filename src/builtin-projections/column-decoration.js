import { Decorator, mapObject } from '../utils';
import { COMMON_PROPS } from '../constants';

const decorations = {
  composeCols: { key: 'col', props: [] },
  composeHeaderThs: { key: 'th', props: ['content'] },
  composeDataTds: { key: 'td', props: ['content'] },
};

export function columnDecoration(composer) {
  const orig = { ...composer };

  return mapObject(decorations, ({ key, props }, name) => (context) => {
    const deco = Decorator.create(context.column[key], COMMON_PROPS.concat(props));
    const model = deco(context, orig[name](context));

    return model;
  });
}
