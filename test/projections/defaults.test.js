import { mapObject } from '../../src/utils';
import { defaults } from '../../src/builtin-projections/defaults';

describe('The defaults projection', () => {
  test('being a function', () => {
    expect(defaults).toBeInstanceOf(Function);
  });

  test('decorating the composer', () => {
    const composer = defaults();

    expect(composer.composeTable).toBeInstanceOf(Function);
  });

  describe('The default composer', () => {
    const composer = {};
    Object.assign(composer, mapObject(defaults(composer)), func => func.bind(composer));

    mapObject({
      composeTable: {
        caption: null,
        colgroups: null,
        thead: null,
        tbodies: null,
        tfoot: null,
      },
      composeCaption: {},
      composeColgroups: { cols: null },
      composeCols: {},
      composeThead: { trs: null },
      composeTbodies: { trs: null },
      composeTfoot: { trs: null },
      composeTrs: { tds: null },
      composeTds: { isHeader: false },
    }, (defaultProps, name) => describe(`#${name}`, () => {
      test('compose the default render model', () => {
        const model = Object.assign({
          key: null,
          props: {},
          classes: [],
          styles: {},
          events: {},
        }, defaultProps);
        const output = name.match(/s$/) ? [model] : model;
        expect(composer[name]({})).toEqual(output);
      });

      test('compose the render model with given properties', () => {
        const key = 'foo';
        const props = { 'data-bar': 'bar' };
        const classes = ['some-class'];
        const styles = { display: 'block' };
        const events = { click: () => {} };

        const model = Object.assign({
          key,
          props,
          classes,
          styles,
          events,
        }, defaultProps);
        const output = name.match(/s$/) ? [model] : model;

        expect(composer[name]({
          key,
          props,
          classes,
          styles,
          events,
        })).toEqual(output);
      });
    }));
  });
});
