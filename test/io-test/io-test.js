import { composer } from '../../src/composer';

export function ioTest({
  name,
  projections,
  method = 'composeTable',
  input = {},
  output: expected,
  matchObject = false,
  validate = () => {},
}) {
  const state = {};
  describe('Input/Output Test', () => {
    test(name, () => {
      const output = composer(projections, {
        state,
        dispatch: (reducer, ...args) => reducer(state, ...args),
      })[method](input);
      if (matchObject) {
        expect(output).toMatchObject(expected);
      } else {
        expect(output).toEqual(expected);
      }
      validate({ input, output });
    });
  });
}
