import { scenarioTest } from '../scenario-test';
import {
  defaults,
  columns,
  header,
  data,
  decoration,
  defaultContent,
  sorting,
} from '../../../src/projections';
import {
  DEFAULT_TABLE,
  DEFAULT_COLGROUP,
  DEFAULT_COL,
  DEFAULT_THEAD,
  DEFAULT_TBODY,
  DEFAULT_TFOOT,
  DEFAULT_TR,
  DEFAULT_TD,
  DEFAULT_TH,
} from '../constants';

scenarioTest({
  name: 'sorting',
  projections: [
    defaults,
    columns,
    header,
    data,
    defaultContent,
    decoration,
    sorting,
  ],
  config: {
    cols: [
      { key: 'Foo' },
      { key: 'Bar' },
    ],
    data: [
      { Foo: 1, Bar: 'b' },
      { Foo: 2, Bar: 'a' },
    ],
    tfoot: {
      trs: [{
        tds: [{
          content: 'foo',
        }, {
          content: 'bar',
        }],
      }],
    },
    $td: {
      styles: {
        background: 'green',
      },
    },
    sorting: {
      $td: {
        styles: {
          background: 'red',
        },
      },
    },
  },
  steps: [{
    expected: {
      table: {
        ...DEFAULT_TABLE,
        colgroups: [{
          ...DEFAULT_COLGROUP,
          cols: [{
            ...DEFAULT_COL,
            key: 'Foo',
          }, {
            ...DEFAULT_COL,
            key: 'Bar',
          }],
        }],
        thead: {
          ...DEFAULT_THEAD,
          trs: [{
            ...DEFAULT_TR,
            key: '@header',
            tds: [{
              ...DEFAULT_TH,
              key: 'Foo',
              content: 'Foo',
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TH,
              key: 'Bar',
              content: 'Bar',
              styles: {
                background: 'green',
              },
            }],
          }],
        },
        tbodies: [{
          ...DEFAULT_TBODY,
          trs: [{
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              key: 'Foo',
              content: 1,
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TD,
              key: 'Bar',
              content: 'b',
              styles: {
                background: 'green',
              },
            }],
          }, {
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              key: 'Foo',
              content: 2,
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TD,
              key: 'Bar',
              content: 'a',
              styles: {
                background: 'green',
              },
            }],
          }],
        }],
        tfoot: {
          ...DEFAULT_TFOOT,
          trs: [{
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              content: 'foo',
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TD,
              content: 'bar',
              styles: {
                background: 'green',
              },
            }],
          }],
        },
      },
    },
  }, {
    action(model) {
      model.table.thead.trs[0].tds[0].events.click();
    },
    expected: {
      table: {
        ...DEFAULT_TABLE,
        colgroups: [{
          ...DEFAULT_COLGROUP,
          cols: [{
            ...DEFAULT_COL,
            key: 'Foo',
          }, {
            ...DEFAULT_COL,
            key: 'Bar',
          }],
        }],
        thead: {
          ...DEFAULT_THEAD,
          trs: [{
            ...DEFAULT_TR,
            key: '@header',
            tds: [{
              ...DEFAULT_TH,
              key: 'Foo',
              content: 'Foo',
              styles: {
                background: 'red',
              },
            }, {
              ...DEFAULT_TH,
              key: 'Bar',
              content: 'Bar',
              styles: {
                background: 'green',
              },
            }],
          }],
        },
        tbodies: [{
          ...DEFAULT_TBODY,
          trs: [{
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              key: 'Foo',
              content: 1,
              styles: {
                background: 'red',
              },
            }, {
              ...DEFAULT_TD,
              key: 'Bar',
              content: 'b',
              styles: {
                background: 'green',
              },
            }],
          }, {
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              key: 'Foo',
              content: 2,
              styles: {
                background: 'red',
              },
            }, {
              ...DEFAULT_TD,
              key: 'Bar',
              content: 'a',
              styles: {
                background: 'green',
              },
            }],
          }],
        }],
        tfoot: {
          ...DEFAULT_TFOOT,
          trs: [{
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              content: 'foo',
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TD,
              content: 'bar',
              styles: {
                background: 'green',
              },
            }],
          }],
        },
      },
    },
  }, {
    action(model) {
      model.table.thead.trs[0].tds[0].events.click();
    },
    expected: {
      table: {
        ...DEFAULT_TABLE,
        colgroups: [{
          ...DEFAULT_COLGROUP,
          cols: [{
            ...DEFAULT_COL,
            key: 'Foo',
          }, {
            ...DEFAULT_COL,
            key: 'Bar',
          }],
        }],
        thead: {
          ...DEFAULT_THEAD,
          trs: [{
            ...DEFAULT_TR,
            key: '@header',
            tds: [{
              ...DEFAULT_TH,
              key: 'Foo',
              content: 'Foo',
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TH,
              key: 'Bar',
              content: 'Bar',
              styles: {
                background: 'green',
              },
            }],
          }],
        },
        tbodies: [{
          ...DEFAULT_TBODY,
          trs: [{
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              key: 'Foo',
              content: 1,
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TD,
              key: 'Bar',
              content: 'b',
              styles: {
                background: 'green',
              },
            }],
          }, {
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              key: 'Foo',
              content: 2,
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TD,
              key: 'Bar',
              content: 'a',
              styles: {
                background: 'green',
              },
            }],
          }],
        }],
        tfoot: {
          ...DEFAULT_TFOOT,
          trs: [{
            ...DEFAULT_TR,
            tds: [{
              ...DEFAULT_TD,
              content: 'foo',
              styles: {
                background: 'green',
              },
            }, {
              ...DEFAULT_TD,
              content: 'bar',
              styles: {
                background: 'green',
              },
            }],
          }],
        },
      },
    },
  }],
});
