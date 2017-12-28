import createCore from '../../src';

export function scenarioTest({
  name,
  projections,
  config = {},
  steps = [],
}) {
  describe('Scenario test', () => {
    test(name, () => {
      let state = {};
      const core = createCore().use(projections);
      // ProjectionGridCore({
      //   projections,
      //   dispatch: (reducer, ...args) => {
      //     state = reducer(state, ...args);
      //     return state;
      //   },
      // });
      const testStep = (model, {
        action = () => {},
        strictMatch = false,
        expected,
        validate = () => {},
      }) => {
        action(model);
        const newModel = core.compose({
          config,
          state,
          dispatch: (reducer, ...args) => {
            state = reducer(state, ...args);
            return state;
          },
        });

        if (strictMatch) {
          expect(newModel).toEqual(expected);
        } else {
          expect(newModel).toMatchObject(expected);
        }

        validate(newModel);

        return newModel;
      };

      steps.reduce(testStep, {});
    });
  });
}
