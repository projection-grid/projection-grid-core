import { applyValue, assign } from '../utils';

export function sortable({ composeHeaderThs }, config) {
  return {
    composeHeaderThs(model) {
      const sortConfig = assign({}, {
        ascClasses: [],
        descClasses: [],
        handleResort: () => {},
      }, config.sort);
      const { column: { name, sorting } } = model;
      const tds = composeHeaderThs(model);

      if (sorting) {
        const sortingComponent = {
          asc: sortConfig.ascComponent,
          descr: sortConfig.descComponent,
        }[sorting];

        const sortingClasses = {
          asc: sortConfig.ascClasses,
          desc: sortConfig.descClasses,
        }[sorting] || [];

        const patch = {
          classes: sortingClasses,
          content: {
            Component: sortingComponent,
          },
          events: {
            click: () => {
              sortConfig.handleResort(name);
            },
          },
          styles: {
            cursor: 'pointer',
          },
        };

        return tds.map(th => applyValue(th, patch));
      }

      return tds;
    },
  };
}
