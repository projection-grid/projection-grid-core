import { _ } from '../src/';

test('To be defined', () => {
  expect(_).toBeDefined();
});

describe('Object', () => {
  test('isObject', () => {
    expect(_.isObject(null)).toBe(false);
    expect(_.isObject(undefined)).toBe(false);
    expect(_.isObject([])).toBe(false);
    expect(_.isObject([1, 2, 3])).toBe(false);
    expect(_.isObject([{ foo: 'bar' }])).toBe(false);
    expect(_.isObject({ foo: 'bar' })).toBe(true);
    expect(_.isObject({})).toBe(true);
  });

  test('isFunction', () => {
    function foo() { }
    expect(_.isFunction(() => {})).toBe(true);
    expect(_.isFunction(foo)).toBe(true);
  });

  test('isUndefined', () => {
    expect(_.isUndefined()).toBe(true);
    expect(_.isUndefined(undefined)).toBe(true);
    expect(_.isUndefined(null)).toBe(false);
    expect(_.isUndefined(0)).toBe(false);
    expect(_.isUndefined('')).toBe(false);
    expect(_.isUndefined([])).toBe(false);
    expect(_.isUndefined({})).toBe(false);
  });

  test('compactObject', () => {
    expect(_.compactObject({
      a: 'a',
      b: null,
      c: false,
      d: undefined,
    })).toEqual({ a: 'a' });
  });

  test('mapObject', () => {
    expect(_.mapObject({
      a: 1,
      b: 2,
    }, (val, key) => val + 1 + key)).toEqual({
      a: '2a',
      b: '3b',
    });
  });

  test('pick', () => {
    expect(_.pick({ a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ a: 1, b: 2 });
    expect(_.pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 });
  });

  test('ponyfill', () => {
    const replacement = {};
    ['a', {}, () => {}].forEach((native) => {
      expect(_.ponyfill(native, replacement)).toBe(native);
    });
    expect(_.ponyfill(undefined, replacement)).toBe(replacement);
  });

  test('assignPonyfill', () => {
    [
      [{}, { a: 1, b: 2 }],
      [{}, { a: 1 }, { b: 2 }],
      [{}, { a: 1 }, { a: 2, b: 2 }],
    ].forEach((objects) => {
      const result = _.assignPonyfill(...objects);
      expect(result).toBe(objects[0]);
      expect(Object.assign(...objects)).toEqual(result);
    });
  });
});

describe('Array', () => {
  test('isArray', () => {
    expect(_.isArray(null)).toBe(false);
    expect(_.isArray(undefined)).toBe(false);
    expect(_.isArray([])).toBe(true);
    expect(_.isArray([1, 2, 3])).toBe(true);
    expect(_.isArray([{ foo: 'bar' }])).toBe(true);
    expect(_.isArray({ foo: 'bar' })).toBe(false);
    expect(_.isArray({})).toBe(false);
  });

  test('pluck', () => {
    expect(_.pluck([
      { a: 1, foo: 'bar' },
      { b: 2, foo: 'bar1' },
    ], 'foo')).toEqual(['bar', 'bar1']);
  });

  test('flatten', () => {
    expect(_.flatten([1, [2], [3, [[4]]]])).toEqual([1, 2, 3, 4]);
  });
});

describe('Function', () => {
});
