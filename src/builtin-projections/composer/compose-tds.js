export function composeTds({ column, record, config }) {
  return [{
    key: `@${column.name}`,
    attributes: {},
    content: config.composeContent({
      props: { text: record[column.name] },
      events: {},
    }),
  }];
}
