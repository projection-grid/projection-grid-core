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

  test('isNull', () => {
    expect(_.isNull(null)).toBe(true);
    expect(_.isNull(undefined)).toBe(false);
    expect(_.isNull({})).toBe(false);
  });

  test('isUndefined', () => {
    expect(_.isUndefined(null)).toBe(false);
    expect(_.isUndefined(undefined)).toBe(true);
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

  test('uniq', () => {
    expect(_.uniq([1, 2, 1, 4, 1, 3])).toEqual([1, 2, 4, 3]);
  });
});

describe('Function', () => {
  test('isFunction', () => {
    function foo() { }
    expect(_.isFunction(() => {})).toBe(true);
    expect(_.isFunction(foo)).toBe(true);
  });

  test('partial', () => {
    const add = (a, b) => a + b;
    const sum = (...args) => args.reduce(add, 0);
    const add10 = _.partial(sum, 4, 6);
    const add40 = _.partial(sum, 5, 15, 20);

    expect(sum(1, 2, 3)).toBe(6);
    expect(add10(10)).toBe(20);
    expect(add40(add10())).toBe(50);
  });
});
