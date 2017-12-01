import _ from 'underscore';

class Decorator {
  constructor({ wrappers, context }) {
    this.wrappers = _.mapObject(wrappers, (wrapper, key) => {
      if (_.isFunction(wrapper)) {
        return wrapper;
      }
      if (_.isFunction(this[key])) {
        return value => this[key](value, wrapper);
      }
      return _.constant(wrapper);
    });
    this.context = context;
  }

  decorate(model) {
    return _.chain(this.wrappers)
      .mapObject((wrapper, key) => wrapper(model[key], this.context))
      .defaults(model)
      .value();
  }

  props(props, propsExt) {
    return _.extend({}, props, propsExt);
  }

  classes(classes, classesExt) {
    return _.union(classes, classesExt);
  }

  styles(styles, stylesExt) {
    return _.extend({}, styles, stylesExt);
  }

  events(events, eventsExt) {
    return _.extend({}, events, eventsExt);
  }

  content(content, contentExt) {
    const { Component } = contentExt;

    return _.defaults(Component ? {
      Component,
      props: _.defaults({ content }, content.props),
    } : {}, new Decorator({
      events: contentExt.events,
    }).decorate(content));
  }
}

export function decorator(wrapper, keys, context) {
  if (_.isFunction(wrapper)) {
    return model => _.pick(wrapper(model, context), keys);
  }
  const deco = new Decorator({
    wrappers: _.pick(wrapper, keys),
    context,
  });

  return model => deco.decorate(model, context);
}
