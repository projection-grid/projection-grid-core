import _ from 'underscore';

export default function customCaption(config) {
  return _.defaults({
    composeCaption(option) {
      const { props = {}, events = {}, content } = option.config.caption || {};
      const defaultCaption = config.composeCaption({ config });
      const { defaultProps = {}, defaultEvents = {}, defaultContent = {} }
        = defaultCaption || {};

      if (!content || !content.Component) {
        return defaultCaption;
      }

      return {
        props: _.defaults(defaultProps, props),
        events: _.defaults(defaultEvents, events),
        content: {
          Component: content.Component,
          props: _.defaults(defaultContent.props, content.props),
          events: _.defaults(defaultContent.events, content.events),
        },
      };
    },
  }, config);
}
