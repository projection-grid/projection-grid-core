# projection-grid-core

Implement the core concept of projection grid.
Documents:
[Design Note](https://projection-grid.gitbooks.io/design-note/content/)

### Simple Renderer for React
```js
function renderTable({ colGroups, bodyRows }) {
  return (
    <table>
      <colgroups>
      </colgroups>
      <tbody>
      {
        _.map(bodyRows, ({ cells, attributes }) => (
          <tr {...attributes}>
            {
              _.map(cells, ({ content, attributes}) => (
                <td {...attributes}>{content}</td>
              ))
            }
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}
```

### API sample
```js
import HelpLink from 'help-link-plugin-react';

render() {
  return (
    <ProjectionGrid
      config = {
        ProjectionGridReactConfig({
          data: this.state.data,
          columns: [{
            name: 'Name',
            component: NameCell,
          }],
          row: RowComponent,
        })
      },
      projections = {[
        SortableHeader({ onSort: (key) => this.sort(key) }),
        Selection({ onSelectionChange: this.props.onSelectionChange1 }),
        Selection({ onSelectionChange: this.props.onSelectionChange2 }),
        this.state.filter ? CustomRow({ content: (<FilterBar filter = this.state.filter/>) }) : null,
        CustomRow({ }),
        HelpLink({ column: A, link: 'abc' }),
      ]}
      
      myCustomRow={ content: <FilterBar filter=this.state.filter />}
    />
  );
}
```

### Renderer props
```js
{
  attributes,
  colgroup: {
    attributes,
    cols: [{
      attributes,
    }],
  },
  thead: {
    attributes,
    trs: [{
      attributes,
      th: [{
        attributes,
        content,
      }],
    }],
  },
  tbody: {
    attributes,
    trs: [{
      attributes,
      td: [{
        attributes,
        content,
      }],
    }],
  },
  tfoot: {
    attributes,
    trs: [{
      attributes,
      td: [{
        attributes,
        content,
      }],
    }],
  },
}
```

### Converter sample
```js
function ({ RowComponent, data, columns }) {
  return {
    bodyRows: _.map(data, item => (
      <RowComponent item={item} columns={columns} />
    )),
  }
}
```
