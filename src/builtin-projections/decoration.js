import { pluck, isArray, isFunction, isObject, isString, mapObject } from '../utils';

function mergeEvents(events, e) {
  return Object.assign({}, events, mapObject(e, (handler, name) => (...args) => {
    handler(...args);
    if (isFunction(events[name])) {
      events[name](...args);
    }
  }));
}

const getStandardDecorator = d => (isFunction(d) ? d : v => v);
const getKeyDecorator = d => (
  isString(d) ? key => `${key}.${d}` : getStandardDecorator(d)
);
const getObjectDecorator = d => (
  isObject(d) ? obj => Object.assign({}, obj, d) : getStandardDecorator(d)
);
const getPropsDecorator = getObjectDecorator;
const getClassesDecorator = d => (
  isArray(d) ? classes => classes.append(d) : getStandardDecorator(d)
);
const getStylesDecorator = getObjectDecorator;
const getEventsDecorator = d => (
  isObject(d) ? events => mergeEvents(events, d) : getStandardDecorator(d)
);
const getContentDecorator = getStandardDecorator;

function getModelDecorator(decorator, hasContent) {
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

function decorate(model, {
  context,
  decorators,
  hasContent = false,
}) {
  if (isArray(model)) {
    return model.map(m => decorate(m, { context, decorators, hasContent }));
  }
  return decorators.reduce((m, decorator) => {
    if (isFunction(decorator)) {
      return decorator(context, m);
    }
    if (isObject(decorator)) {
      return getModelDecorator(decorator, hasContent)(context, m);
    }
    return m;
  }, model);
}

export default function ({
  composeColgroups,
  composeCols,
  composeSections,
  composeTrs,
  composeTds,
}) {
  return {
    composeColgroups(colgroup) {
      const { table } = colgroup;
      return decorate(composeColgroups(colgroup), {
        context: colgroup,
        decorators: pluck([table], '$colgroup'),
      });
    },
    composeCols(col) {
      const { colgroup } = col;
      const { table } = colgroup;
      return decorate(composeCols(col), {
        context: col,
        decorators: pluck([table, colgroup], '$col'),
      });
    },
    composeSections(section) {
      const { table } = section;
      return decorate(composeSections(section), {
        context: section,
        decorators: pluck([table], '$section'),
      });
    },
    composeTrs(tr) {
      const { section } = tr;
      const { table } = section;
      return decorate(composeTrs(tr), {
        context: tr,
        decorators: pluck([table, section], '$tr'),
      });
    },
    composeTds(td) {
      const { col = {}, tr } = td;
      const { colgroup = {} } = col;
      const { section } = tr;
      const { table } = section;

      return decorate(composeTds(td), {
        context: td,
        decorators: pluck([
          table,
          colgroup,
          section,
          col,
          tr,
        ], '$td'),
        hasContent: true,
      });
    },
  };
}
