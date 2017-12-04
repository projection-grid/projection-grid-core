import bootstrapTheme from '../styles/bootstrap';

const getStyle = (themeStr) => {
  switch (themeStr) {
    case 'bootstrap':
    case 'bootstrap3':
      return bootstrapTheme;
    default:
      return {};
  }
};

export function theme({ composeTable }, config) {
  return {
    composeTable(table) {
      const memo = composeTable(table);

      return Object.assign({}, {
        styles: {
          getStyle: Object.assign({}, getStyle(config.theme), memo.styles),
        },
      }, memo);
    },
  };
}
