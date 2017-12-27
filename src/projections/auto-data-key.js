import { capitalizeFirstLetter } from '../utils';

const decoreateWithDataKey = (element, index) => Object.assign({}, element, {
  key: element.key ? element.key : `${element.tag}-${index}`,
});

const ELEMENTS_TO_DECORATE = ['td', 'colgroup', 'section', 'col', 'tr'];

const autoDataKey = args => ELEMENTS_TO_DECORATE.reduce((memo, cur) => {
  const composers = { ...args };
  const composeHanlder = `compose${capitalizeFirstLetter(cur)}s`;

  return Object.assign({}, memo, {
    [composeHanlder]: input => composers[composeHanlder](input).map(decoreateWithDataKey),
  });
}, {});

export default autoDataKey;
