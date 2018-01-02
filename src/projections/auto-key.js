import { assign } from '../utils';

const decorateWithKey = (element, index) => assign({}, element, {
  key: element.key ? element.key : `${element.tag}-${index}`,
});

const mapWithKey = elementGroup => elementGroup.map(decorateWithKey);

const decorateTrsWithKey = model => assign({}, model, {
  trs: mapWithKey(model.trs).map(tr => assign({}, tr, {
    tds: mapWithKey(tr.tds),
  })),
});

export default function ({ composeTable }) {
  return {
    composeTable(table) {
      const model = composeTable(table);

      return assign({}, model, {
        colgroups: mapWithKey(model.colgroups),
        tbodies: mapWithKey(model.tbodies).map(decorateTrsWithKey),
        thead: decorateTrsWithKey(model.thead),
        tfoot: decorateTrsWithKey(model.tfoot),
      });
    },
  };
}
