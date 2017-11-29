export function composeCols({ column /* , config */ }) {
  return [{
    key: `@${column.name}`,
    props: {},
    classes: [],
    styles: {},
    events: {},
  }];
}
