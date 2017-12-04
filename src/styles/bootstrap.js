export default {
  table: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse',
  },
  caption: {
    paddingTop: '8px',
    paddingBottom: '8px',
    color: '#777',
    textAlign: 'left',
  },
  'table>thead>tr>th': {
    verticalAlign: 'bottom',
    borderBottom: '2px solid #ddd',
  },
  'table>tbody>tr>td, table>tbody>tr>th, table>tfoot>tr>td, table>tfoot>tr>th, table>thead>tr>td, table>thead>tr>th': {
    padding: '8px',
    inlineHeight: 1.42857143,
    verticalAlign: 'top',
    borderTop: '1px solid #ddd',
  },
  th: {
    textAlign: 'left',
  },
  'table>caption+thead>tr:firstChild>td, table>caption+thead>tr:firstChild>th, table>colgroup+thead>tr:firstChild>td, table>colgroup+thead>tr:firstChild>th, table>thead:firstChild>tr:firstChild>td, table>thead:firstChild>tr:firstChild>th': {
    borderTop: 0,
  },
};
