export function composeThs({ column, config }) {
  return [{
    key: `@${column.name}`,
    props: {},
    events: {},
    content: config.composeContent({
      props: { text: column.name },
      events: {},
    }),
  }];
}
