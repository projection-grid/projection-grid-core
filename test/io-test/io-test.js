import { composer } from '../../src/composer';

export function ioTest({
  name = '',
  projections = [],
  method = 'composeTable',
  input = {},
  output: expected = {},
  validate = () => {},
}) {
  describe('Input/Output Test', () => {
    test(name, () => {
      const output = composer(projections)[method](input);
      expect(output).toMatchObject(expected);
      validate({ input, output });
    });
  });
}
