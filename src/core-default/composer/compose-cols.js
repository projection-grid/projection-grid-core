export function composeCols({ column /* , config */ }) {
  return [{
    key: `@${column.name}`,
    attributes: {},
  }];
}
