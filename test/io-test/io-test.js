import { scenarioTest } from './scenario-test';

export function ioTest({
  name,
  projections,
  input = {},
  output,
  matchObject,
  validate,
}) {
  scenarioTest({
    name,
    projections,
    config: input,
    steps: [{
      expected: { table: output },
      strictMatch: !matchObject,
      validate,
    }],
  });
}
