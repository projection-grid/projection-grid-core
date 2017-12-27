import { utils } from '../src/';

test('To be defined', () => {
  expect(utils).toBeDefined();
});

describe('Object', () => {
  test('isObject', () => {
    expect(utils.isObject(null)).toBe(false);
    expect(utils.isObject(undefined)).toBe(false);
    expect(utils.isObject([])).toBe(false);
    expect(utils.isObject([1, 2, 3])).toBe(false);
    expect(utils.isObject([{ foo: 'bar' }])).toBe(false);
    expect(utils.isObject({ foo: 'bar' })).toBe(true);
    expect(utils.isObject({})).toBe(true);
  });

  test('isFunction', () => {
    function foo() { }
    expect(utils.isFunction(() => {})).toBe(true);
    expect(utils.isFunction(foo)).toBe(true);
  });

  test('isUndefined', () => {
    expect(utils.isUndefined()).toBe(true);
    expect(utils.isUndefined(undefined)).toBe(true);
    expect(utils.isUndefined(null)).toBe(false);
    expect(utils.isUndefined(0)).toBe(false);
    expect(utils.isUndefined('')).toBe(false);
    expect(utils.isUndefined([])).toBe(false);
    expect(utils.isUndefined({})).toBe(false);
  });

  test('compactObject', () => {
    expect(utils.compactObject({
      a: 'a',
      b: null,
      c: false,
      d: undefined,
    })).toEqual({ a: 'a' });
  });

  test('mapObject', () => {
    expect(utils.mapObject({
      a: 1,
      b: 2,
    }, (val, key) => val + 1 + key)).toEqual({
      a: '2a',
      b: '3b',
    });
  });

  test('pick', () => {
    expect(utils.pick({ a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ a: 1, b: 2 });
    expect(utils.pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 });
  });

  test('ponyfill', () => {
    const replacement = {};
    ['a', {}, () => {}].forEach((native) => {
      expect(utils.ponyfill(native, replacement)).toBe(native);
    });
    expect(utils.ponyfill(undefined, replacement)).toBe(replacement);
  });

  test('assignPonyfill', () => {
    [
      [{}, { a: 1, b: 2 }],
      [{}, { a: 1 }, { b: 2 }],
      [{}, { a: 1 }, { a: 2, b: 2 }],
    ].forEach((objects) => {
      const result = utils.assignPonyfill(...objects);
      expect(result).toBe(objects[0]);
      expect(Object.assign(...objects)).toEqual(result);
    });
  });
});

describe('Array', () => {
  test('isArray', () => {
    expect(utils.isArray(null)).toBe(false);
    expect(utils.isArray(undefined)).toBe(false);
    expect(utils.isArray([])).toBe(true);
    expect(utils.isArray([1, 2, 3])).toBe(true);
    expect(utils.isArray([{ foo: 'bar' }])).toBe(true);
    expect(utils.isArray({ foo: 'bar' })).toBe(false);
    expect(utils.isArray({})).toBe(false);
  });

  test('pluck', () => {
    expect(utils.pluck([
      { a: 1, foo: 'bar' },
      { b: 2, foo: 'bar1' },
    ], 'foo')).toEqual(['bar', 'bar1']);
  });

  test('flatten', () => {
    expect(utils.flatten([1, [2], [3, [[4]]]])).toEqual([1, 2, 3, 4]);
  });

  test('capitalizeFirstLetter', () => {
    expect(utils.capitalizeFirstLetter('abc')).toEqual('Abc');
    expect(utils.capitalizeFirstLetter('')).toEqual('');
  });
});

describe('Function', () => {
});
