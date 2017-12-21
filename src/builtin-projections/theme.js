import { applyValue, applyForChildByCondition, assign } from '../utils';

const applyStyles = (memo, styles) => applyValue(memo, { styles });

const applyStylsForFirstChild = (parent, styles, childPath = 'trs/tds') =>
  applyForChildByCondition(parent, { styles }, childPath, (child, index) => index === 0);

const applyStylsForOddChild = (parent, styles, childPath = 'trs/tds') =>
  applyForChildByCondition(parent, { styles }, childPath, (child, index) => !(index % 2));

const composeWithBootstrap = ({
  composeTable,
  composeCaption,
  composeHeaderThs,
  composeDataTds,
  composeTbodies,
  composeThead,
}) => ({
  composeTable(table) {
    return applyStyles(composeTable(table), {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: 'transparent',
      borderSpacing: 0,
      borderCollapse: 'collapse',
    });
  },
  composeCaption(caption) {
    return applyStyles(composeCaption(caption), {
      paddingTop: '8px',
      paddingBottom: '8px',
      color: '#777',
      textAlign: 'left',
    });
  },
  composeHeaderThs(tds) {
    return composeHeaderThs(tds).map(td => applyStyles(td, {
      verticalAlign: 'bottom',
      borderBottom: '2px solid #ddd',
      textAlign: 'left',
      padding: '8px',
      inlineHeight: 1.42857143,
      borderTop: '1px solid #ddd',
    }));
  },
  composeDataTds(tds) {
    return composeDataTds(tds).map(td => applyStyles(td, {
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
    return applyStylsForFirstChild(composeThead(thead), { borderTop: 0 });
  },
});

const composeWithBootstrapStripedRows = ({
  composeTable,
  composeCaption,
  composeHeaderThs,
  composeDataTds,
  composeTbodies,
  composeThead,
}) => assign({}, composeWithBootstrap({
  composeTable,
  composeCaption,
  composeHeaderThs,
  composeDataTds,
  composeTbodies,
  composeThead,
}), {
  composeTbodies(tbody) {
    return applyStylsForOddChild(composeTbodies(tbody), { backgroundColor: '#f9f9f9' });
  },
});


export function theme(model, config) {
  switch (config.theme) {
    case 'bootstrap':
    case 'bootstrap3':
    case 'bootstrap-default':
      return composeWithBootstrap(model);
    case 'bootstrap-striped-rows':
      return composeWithBootstrapStripedRows(model);
    default:
      return {};
  }
}
