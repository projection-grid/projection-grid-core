
const extendStyles = (memo, styles) => Object.assign({}, memo, {
  styles: Object.assign({}, memo.styles, styles),
});

const applyStylsForFirstChild = (parent, styles, childPath = 'trs/tds') => {
  const [, path1, path2] = childPath.match(/^(\S+)\/(\S+)$/);

  if (Array.isArray(parent)) {
    return parent.map(parentMemo => applyStylsForFirstChild(parentMemo, styles, childPath));
  }

  return Object.assign({}, parent, {
    [path1]: parent[path1].map((childLevel1, index) => {
      if (index === 0) {
        return Object.assign({}, childLevel1, {
          [path2]: childLevel1[path2].map(childLevel2 => extendStyles(childLevel2, styles)),
        });
      }

      return childLevel1;
    }),
  });
};

const compseWithBootstrap = ({
  composeTable,
  composeCaption,
  composeHeaderThs,
  composeDataTds,
  // composeHeaderTrs,
  // composeDataTrs,
  composeTbodies,
  composeThead,
}) => ({
  composeTable(table) {
    return extendStyles(composeTable(table), {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: 'transparent',
      borderSpacing: 0,
      borderCollapse: 'collapse',
    });
  },
  composeCaption(caption) {
    return extendStyles(composeCaption(caption), {
      paddingTop: '8px',
      paddingBottom: '8px',
      color: '#777',
      textAlign: 'left',
    });
  },
  composeHeaderThs(ths) {
    return composeHeaderThs(ths).map(th => extendStyles(th, {
      verticalAlign: 'bottom',
      borderBottom: '2px solid #ddd',
      textAlign: 'left',
      padding: '8px',
      inlineHeight: 1.42857143,
      borderTop: '1px solid #ddd',
    }));
  },
  composeDataTds(tds) {
    return composeDataTds(tds).map(td => extendStyles(td, {
      padding: '8px',
      inlineHeight: 1.42857143,
      verticalAlign: 'top',
      borderTop: '1px solid #ddd',
    }));
  },
  composeTbodies(tbody) {
    return applyStylsForFirstChild(composeTbodies(tbody), { borderTop: 0 });
  },
  composeThead(thead) {
    return applyStylsForFirstChild(composeThead(thead), { borderTop: 0 }, 'trs/ths');
  },
  // composeHeaderTrs(trs) {
  //   return applyStylsForFirstChild(composeHeaderTrs(trs), { borderTop: 0 }, 'ths');
  // },
  // composeDataTrs(trs) {
  //   window.console.log(composeDataTrs(trs));

  //   return applyStylsForFirstChild(composeDataTrs(trs), { borderTop: 0 });
  // },
});

export function theme(model, config) {
  switch (config.theme) {
    case 'bootstrap':
    case 'bootstrap3':
    case 'bootstrap-default':
      return compseWithBootstrap(model);
    default:
      return {};
  }
}
