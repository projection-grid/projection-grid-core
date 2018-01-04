import createCore from '../src';
import { DEFAULT_COMMON, DEFAULT_TABLE } from './io-test/constants';

describe('ProjectionGridCore#compose', () => {
  test('compose empty grid', () => {
    const core = createCore();

    expect(core.compose({ config: {} })).toEqual({
      table: {},
    });
  });

  test('compose default grid', () => {
    const core = createCore().useBuiltin();

    expect(core.compose()).toEqual({
      table: {
        ...DEFAULT_TABLE,
        thead: {
          ...DEFAULT_COMMON,
          tag: 'THEAD',
          trs: [{
            ...DEFAULT_COMMON,
            key: '@header',
            tag: 'TR',
            tds: [],
          }],
        },
        tfoot: {
          ...DEFAULT_COMMON,
          tag: 'TFOOT',
          trs: [],
        },
      },
    });
  });

  test('use nothing', () => {
    const core = createCore();
    expect(() => {
      core.use();
    }).not.toThrow();
  });
});
