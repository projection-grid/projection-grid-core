export function composeTds({ column, record, config }) {
  return [{
    key: `@${column.name}`,
    props: {},
    classes: [],
    styles: {},
    events: {},
    content: config.composeContent({
      props: { text: record[column.name] },
      events: {},
    }),
  }];
}
