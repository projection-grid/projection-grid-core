import { composer } from '../../src/composer';

export function ioTest({
  name = '',
  projections = [],
  method = 'composeTable',
  input = {},
  output = {},
}) {
  describe('Input/Output Test', () => {
    test(name, () => {
      expect(composer(projections)[method](input)).toEqual(output);
    });
  });
}
