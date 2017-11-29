export function composeCols({ column /* , config */ }) {
  return [{
    key: `@${column.name}`,
    props: {},
    events: {},
  }];
}
