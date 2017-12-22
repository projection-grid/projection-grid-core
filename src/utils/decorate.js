import { assign, isFunction, isObject, mapObject } from './object';
import { isArray } from './array';

// Merge 2 event hashes
function mergeEvents(events, e) {
  return assign({}, events, mapObject(e, (handler, name) => {
    const hdl = events[name];
    return isFunction(hdl) ? (...args) => {
      handler(...args);
      hdl(...args);
    } : handler;
  }));
}

const getStandardDecorator = d => (isFunction(d) ? d : (ctx, v) => v);

// Decorator for key
const getKeyDecorator = getStandardDecorator;

// Decorator for object value
const getObjectDecorator = d => (
  isObject(d) ? (ctx, obj) => assign({}, obj, d) : getStandardDecorator(d)
);

// Decorator for props
const getPropsDecorator = getObjectDecorator;

// Decorator for classes
const getClassesDecorator = d => (
  isArray(d) ? (ctx, classes) => classes.concat(d) : getStandardDecorator(d)
);

// Decorator for styles
const getStylesDecorator = getObjectDecorator;

// Decorator for events
const getEventsDecorator = d => (
  isObject(d) ? (ctx, events) => mergeEvents(events, d) : getStandardDecorator(d)
);

// Decorator for content
const getContentDecorator = getStandardDecorator;

function getModelDecorator(decorator, hasContent) {
  if (isObject(decorator)) {
    return (context, model) => {
      const result = mapObject({
        key: getKeyDecorator,
        props: getPropsDecorator,
        classes: getClassesDecorator,
        styles: getStylesDecorator,
        events: getEventsDecorator,
      }, (getDecorator, name) => getDecorator(decorator[name])(context, model[name]));

      if (hasContent) {
        result.content = getContentDecorator(decorator.content)(context, model.content);
      }

      return result;
    };
  }
  return getStandardDecorator(decorator);
}

export function decorate(model, {
  context,
  decorators,
  hasContent = false,
}) {
  if (isArray(model)) {
    return model.map(m => decorate(m, { context, decorators, hasContent }));
  }
  const deco = decorators.reduce((m, d) => getModelDecorator(d, hasContent)(context, m), model);
  return assign({}, model, deco);
}
