import { applyValue } from '../utils/composer-helper';

export function sortable({ composeHeaderThs }, config) {
  return {
    composeHeaderThs(model) {
      const sortConfig = Object.assign({}, {
        ascClasses: [],
        descClasses: [],
        handleResort: () => {},
      }, config.sort);
      const { column: { name, sorting } } = model;
      const ths = composeHeaderThs(model);

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
          events: {
            click: () => {
              sortConfig.handleResort(name);
            },
          },
          styles: {
            cursor: 'pointer',
          },
        };

        if (sortingComponent) {
          patch.content = {
            Component: sortingComponent,
          };
        }

        return ths.map(th => applyValue(th, patch));
      }

      return ths;
    },
  };
}
