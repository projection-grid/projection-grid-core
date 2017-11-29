export function composeTds({ column, record, config }) {
  return [{
    key: `@${column.name}`,
    props: {},
    events: {},
    content: config.composeContent({
      props: { text: record[column.name] },
      events: {},
    }),
  }];
}
