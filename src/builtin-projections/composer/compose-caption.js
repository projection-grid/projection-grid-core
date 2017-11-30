import _ from 'underscore';

export function composeCaption({
  config: { caption, composeContent },
}) {
  return caption ? _.defaults({
    content: composeContent(_.pick(caption.content, 'props', 'events')),
  }, _.pick(caption, 'props', 'classes', 'styles', 'events')) : null;
}
