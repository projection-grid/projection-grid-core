export const applyValue = (defaults, obj) => Object.keys(obj).reduce((memo, key) =>
  Object.assign({}, memo, {
    [key]: Object.assign({}, memo[key], obj[key]),
  }), defaults);

export const applyForChildByCondition = (
  parent,
  value,
  childPath = 'trs/tds',
  condition = () => false
) => {
  const [, path1, path2] = childPath.match(/^(\S+)\/(\S+)$/);

  if (Array.isArray(parent)) {
    return parent.map(parentMemo =>
      applyForChildByCondition(parentMemo, value, childPath, condition));
  }

  return Object.assign({}, parent, {
    [path1]: parent[path1].map((childLevel1, index) => {
      if (condition(childLevel1, index)) {
        return Object.assign({}, childLevel1, {
          [path2]: childLevel1[path2].map(childLevel2 => applyValue(childLevel2, value)),
        });
      }

      return childLevel1;
    }),
  });
};
