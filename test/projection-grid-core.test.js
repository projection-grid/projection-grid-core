import ProjectionGridCore from '../src';
import { DEFAULT_COMMON, DEFAULT_TABLE } from './io-test/constants';

describe('ProjectionGridCore#compose', () => {
  test('compose empty grid', () => {
    const core = ProjectionGridCore.createCore();

    expect(core.compose({ config: {} })).toEqual({
      table: {},
    });
  });

  test('compose default grid', () => {
    const core = ProjectionGridCore.createCore().pipeBuiltinPre().pipeBuiltinPost();

    expect(core.compose({ config: {} })).toEqual({
      table: {
        ...DEFAULT_TABLE,
        thead: {
          ...DEFAULT_COMMON,
          key: 'THEAD-0',
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
          key: 'TFOOT-0',
          tag: 'TFOOT',
          trs: [],
        },
      },
    });
  });
});
