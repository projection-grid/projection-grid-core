import _ from 'underscore';
import { COMMON_PROPS } from '../constants';
import { convert } from './convert';

export class Decorator {
  constructor({ wrappers }) {
    this.wrappers = _.mapObject(wrappers, (wrapper, key) => {
      if (_.isFunction(wrapper)) {
        return wrapper;
      }
      if (_.isFunction(this[key])) {
        return (context, value) => this[key](value, wrapper, context);
      }
      return _.constant(wrapper);
    });
  }

  decorate(context, model) {
    return _.chain(this.wrappers)
      .mapObject((wrapper, key) => wrapper(context, model[key]))
      .defaults(model)
      .value();
  }

  props(props, propsExt/* , context */) {
    return _.extend({}, props, propsExt);
  }

  classes(classes, classesExt/* , context */) {
    return _.union(classes, classesExt);
  }

  styles(styles, stylesExt/* , context */) {
    return _.extend({}, styles, stylesExt);
  }

  events(events, eventsExt/* , context */) {
    return _.extend({}, events, eventsExt);
  }

  content(content, contentExt, context) {
    const { Component } = contentExt;
    const deco = Decorator.create(contentExt, ['classes', 'styles', 'events']);

    return _.defaults(Component ? {
      Component,
      props: _.defaults({ content }, content.props),
    } : {}, deco(context, content));
  }

  th(th, thExt, context) {
    const deco = Decorator.create(thExt, [COMMON_PROPS, 'key', 'content']);
    return deco(th, context);
  }

  td(td, tdExt, context) {
    const deco = Decorator.create(tdExt, [COMMON_PROPS, 'key', 'content']);
    return deco(td, context);
  }

  tr(tr, trExt) {
    return Decorator.create(trExt, [COMMON_PROPS, 'key', 'td', 'th'], tr)(tr);
  }

  static create(wrapper, keys) {
    const func = _.isFunction(wrapper) ?
      (...args) => _.pick(wrapper(...args), keys) :
      (() => {
        const deco = new Decorator({ wrappers: _.pick(wrapper, keys) });
        return deco.decorate.bind(deco);
      })();

    return (context, model) => convert(_.partial(func, context), model);
  }
}
