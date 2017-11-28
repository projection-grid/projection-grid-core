export function composeThs({ column, config }) {
  return [{
    key: `@${column.name}`,
    attributes: {},
    content: config.composeContent({
      props: { text: column.name },
      events: {},
    }),
  }];
}
