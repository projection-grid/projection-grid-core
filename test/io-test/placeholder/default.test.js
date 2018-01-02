import { ioTest } from '../io-test';
import { defaults, customRow, placeholder } from '../../../src/projections';
import { DEFAULT_COMMON, DEFAULT_TABLE } from '../constants';

ioTest({
  name: 'placeholder with [root].placeholder',
  projections: [defaults, customRow, placeholder],
  input: {
    placeholder: 'placeholder',
    tbodies: [{
      key: 'default-tbody',
    }],
  },
  output: {
    ...DEFAULT_TABLE,
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'default-tbody',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'placeholder',
          props: {
            colspan: 0,
          },
          tag: 'TD',
        }],
      }],
    }],
  },
});

ioTest({
  name: 'placeholder with [root].tbodies[i].placeholder',
  projections: [defaults, customRow, placeholder],
  input: {
    placeholder: 'placeholder',
    tbodies: [{
      key: 'first-tbody',
    }, {
      key: 'second-tbody',
      placeholder: 'customize placeholder',
    }],
  },
  output: {
    ...DEFAULT_TABLE,
    tbodies: [{
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'first-tbody',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'placeholder',
          props: {
            colspan: 0,
          },
          tag: 'TD',
        }],
      }],
    }, {
      ...DEFAULT_COMMON,
      tag: 'TBODY',
      key: 'second-tbody',
      trs: [{
        ...DEFAULT_COMMON,
        tag: 'TR',
        tds: [{
          ...DEFAULT_COMMON,
          content: 'customize placeholder',
          props: {
            colspan: 0,
          },
          tag: 'TD',
        }],
      }],
    }],
  },
});
