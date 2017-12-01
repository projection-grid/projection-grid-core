import _ from 'underscore';

export function sortable({ composeHeaderThs }, config) {
  return {
    composeHeaderThs(th) {
      const sortConfig = _.defaults({}, config.sort, {
        ascClasses: ['glyphicon', 'glyphicon-arrow-up'],
        descClasses: ['glyphicon', 'glyphicon-arrow-down'],
        handleResort: () => {},
      });
      const { column: { name, sorting } } = th;
      const ths = composeHeaderThs(th);

      if (sorting) {
        const sortingClasses = _.result({
          asc: sortConfig.ascClasses,
          desc: sortConfig.descClasses,
        }, sorting, []);

        return _.map(ths, model => _.defaults({}, {
          classes: _.union(sortingClasses, model.classes),
          events: _.defaults({}, {
            click: () => {
              sortConfig.handleResort(name);
            },
          }, model.events),
          styles: _.defaults({}, {
            cursor: 'pointer',
          }, model.styles),
        }, model));
      }

      return ths;
    },
  };
}
