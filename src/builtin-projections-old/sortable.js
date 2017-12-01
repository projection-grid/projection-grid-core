import _ from 'underscore';

export default function sortable(model) {
  return _.defaults({}, {
    composeThs({ column, config }) {
      const sortConfig = _.defaults({}, config.sort, {
        ascClass: 'glyphicon glyphicon-arrow-up',
        descClass: 'glyphicon glyphicon-arrow-down',
        handleResort: () => {},
      });

      if (column.sorting) {
        const sortingClass = `${column.sorting === 'asc' ? sortConfig.ascClass : ''} ${column.sorting === 'desc' ? sortConfig.descClass : ''}`;

        return _.map(model.composeThs({ column, config }), th => _.defaults({}, {
          classes: [sortingClass, ...th.classes],
          events: _.defaults({}, {
            click: () => { sortConfig.handleResort(column.name); },
          }, th.events),
          styles: _.defaults({}, {
            cursor: 'pointer',
          }, th.styles),
        }, th));
      }

      return model.composeThs({ column, config });
    },
  }, model);
}
