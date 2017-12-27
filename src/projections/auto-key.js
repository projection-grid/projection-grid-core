import { mapObject } from '../utils';

const decorateWithKey = (element, index) => Object.assign({}, element, {
  key: element.key ? element.key : `${element.tag}-${index}`,
});

function autoKey(composer) {
  return mapObject(composer, (callback, name) => {
    if (name.match(/s$/)) {
      return input => callback(input).map(decorateWithKey);
    }
    return callback;
  });
}

export default autoKey;
