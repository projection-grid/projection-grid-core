export default {
  table: {
    width: '100%',
    'max-width': '100%',
    'background-color': 'transparent',
    'border-spacing': 0,
    'border-collapse': 'collapse',
  },
  caption: {
    'padding-top': '8px',
    'padding-bottom': '8px',
    color: '#777',
    'text-align': 'left',
  },
  'table>thead>tr>th': {
    'vertical-align': 'bottom',
    'border-bottom': '2px solid #ddd',
  },
  '.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th': {
    padding: '8px',
    'line-height': 1.42857143,
    'vertical-align': 'top',
    'border-top': '1px solid #ddd',
  },
  th: {
    'text-align': 'left',
  },
  '.table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, .table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th': {
    'border-top': 0,
  },
};
