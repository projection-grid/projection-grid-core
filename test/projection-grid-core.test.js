import ProjectionGridCore from '../src';
import { DEFAULT_COMMON, DEFAULT_TABLE } from './io-test/constants';

describe('ProjectionGridCore#compose', () => {
  test('compose empty grid', () => {
    const core = new ProjectionGridCore();
    expect(core.compose({ config: {} })).toEqual({
      table: {},
    });
  });

  test('compose default grid', () => {
    const core = ProjectionGridCore.createDefault();
    expect(core.compose({ config: {} })).toEqual({
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
      },
    });
  });
});
