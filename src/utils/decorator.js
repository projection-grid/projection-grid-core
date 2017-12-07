import { isFunction, partial } from './function';
import { mapObject, pick } from './object';
import { convert } from './convert';
import { uniq } from './array';

export class Decorator {
  constructor({ wrappers }) {
    this.wrappers = mapObject(wrappers, (wrapper, key) => {
      if (isFunction(wrapper)) {
        return wrapper;
      }
      if (isFunction(this[key])) {
        return (context, value) => this[key](value, wrapper, context);
      }
      return () => wrapper;
    });
  }

  decorate(context, model) {
    return Object.assign({}, model, mapObject(this.wrappers, (wrapper, key) =>
      wrapper(context, model[key])));
  }

  props(props, propsExt/* , context */) {
    return Object.assign({}, props, propsExt);
  }

  classes(classes, classesExt/* , context */) {
    return uniq([...classes, ...classesExt]);
  }

  styles(styles, stylesExt/* , context */) {
    return Object.assign({}, styles, stylesExt);
  }

  events(events, eventsExt/* , context */) {
    return Object.assign({}, events, eventsExt);
  }

  content(content, contentExt, context) {
    const { Component } = contentExt;
    const deco = Decorator.create(contentExt, ['classes', 'styles', 'events']);

    return Object.assign({}, deco(context, content), Component ? {
      Component,
      props: Object.assign({}, content.props, { content }),
    } : {});
  }

  static create(wrapper, keys) {
    const func = isFunction(wrapper) ?
      (...args) => pick(wrapper(...args), keys) :
      (() => {
        const deco = new Decorator({ wrappers: pick(wrapper || {}, keys) });
        return deco.decorate.bind(deco);
      })();

    return (context, model) => convert(partial(func, context), model);
  }
}
