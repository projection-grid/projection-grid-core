import { applyValue } from '../utils/composer-helper';

export function sortable({ composeHeaderThs }, config) {
  return {
    composeHeaderThs(model) {
      const sortConfig = Object.assign({}, {
        ascClasses: ['glyphicon', 'glyphicon-arrow-up'],
        descClasses: ['glyphicon', 'glyphicon-arrow-down'],
        handleResort: () => {},
      }, config.sort);
      const { column: { name, sorting } } = model;
      const ths = composeHeaderThs(model);

      if (sorting) {
        const sortingClasses = {
          asc: sortConfig.ascClasses,
          desc: sortConfig.descClasses,
        }[sorting] || [];

        return ths.map(th => applyValue(th, {
          classes: sortingClasses,
          events: {
            click: () => {
              sortConfig.handleResort(name);
            },
          },
          styles: {
            cursor: 'pointer',
          },
        }));
      }

      return ths;
    },
  };
}
