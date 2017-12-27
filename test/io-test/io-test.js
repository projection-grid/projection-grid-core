import { scenarioTest } from './scenario-test';

export function ioTest({
  name,
  projections,
<<<<<<< HEAD
=======
  postProjections = [],
  method = 'composeTable',
>>>>>>> team/master
  input = {},
  output,
  matchObject,
  validate,
}) {
<<<<<<< HEAD
  scenarioTest({
    name,
    projections,
    config: input,
    steps: [{
      expected: { table: output },
      strictMatch: !matchObject,
      validate,
    }],
=======
  describe('Input/Output Test', () => {
    test(name, () => {
      const output = composer([...projections, ...postProjections])[method](input);
      if (matchObject) {
        expect(output).toMatchObject(expected);
      } else {
        expect(output).toEqual(expected);
      }
      validate({ input, output });
    });
>>>>>>> team/master
  });
}
