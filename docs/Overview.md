# Design Overview
## Projection Grid Core
The original projection-grid was implemented only for BackboneJS. As an aged
frontend framework, it's no longer as competitive. Comparing to new libraries
like ReactJS/VueJS, BackboneJS's limitation on performance and robustness are
significant.

However, the requirement of a highly extensible data grid applies to all UI
frameworks, and the design pattern projection-grid used is framework neutral. To
make the design benefit more people in modern world, we'd like to abstract the
framework indepedent part (from projection-grid) and create a core component, on
top of which, we can build the ReactJS/VueJS version as well as the Backbone
version to continue support the legacy projects.

## Render Data flow
```text
                          |
  Projection Grid Core    |  Projection Grid [React/Vue/Backbone]
                          |
                          |
                          |            Config Model
                          |                  |
                          |                  v
                          |              Normalize
                          |                  |
                          |                  | Projection Model
    +---------------------(------------------+
    |                     |
    v                     |
Projection A <-- Config A |
    |                     |
    | Projection Model    |
    v                     |
Projection B <-- Config B |
    |                     |
    | Projection Model    |
    v                     |
Projection C <-- Config C |
    |                     |
    | Projection Model    |
    v                     |
Composer                  |
    |                     |
    +---------------------(------------------+
                          |                  | Render Model
                          |                  v
                          |                Render
                          |                  |
                          |                  v
                          |            DOM/Virtual DOM
                          |
```

## Config Model

Config model is the interface to let end consumers to define the data, content, structure and behavior of their grid.

```js
{
  data: [
    {
      ID: '000',
      FirstName: 'firstname',
      LastName: 'lastname',
      Gender: 'Female',
      Tribe: 'Polynesian',
    },
  ],
  // Column configuration
  columns: [{
    // Name of the column
    name: 'Name',

    // Sub columns
    columns: [],

    // header cell

    // body cell

    // footer cell
  }],
}
```

## Projection Model
Projection model consists data and composer callbacks. Plugins can decorate either of them.

```jsx
{
  // -----------
  //  Data part
  // -----------
  // Data records
  records: [{
    ID: '000',
    Name: 'Moana',
    Gender: 'Female',
    Tribe: 'Polynesian',
  }, {
    ID: '001',
    Name: 'Maui',
    Gender: 'Male',
    Tribe: 'Half God',
  }],

  // Primary key of each record
  primaryKey: (record) => record['ID'],

  // Column configuration
  columns: [{
    // Name of the column
    name: 'Name',

    // Sub columns
    columns: [],

    // Other parts will be different according to the UI framework(Ract/Vue/Etc)
  }],

  // -------------
  // Composer part
  // -------------
  // Callback to create TD in render model
  composeTD: (column, record, config) => ({
    attributes: { ... },
    content: <NameCell record={record} />,
  }),

  // Callback to create TH in render model
  composeTH: (column, config) => ({
    attributes: { ... },
    content: <NameHeader />,
  }),

  // Callback to create COL in render model
  composeCOL: (column, config) => ({
    attributes: { ... },
    content: <NameCol />,
  }),

  // Callback to create TR in render model
  composeTR: (record, config) => ({
    attributes: { ... },
    tds: [ ... ],
  }),

  // Callback to create THEAD in render model
  componseTHEAD: (config) => ({
    attributes: { ... },
    trs: [ ... ],
  }),

  // Callback to create TBODY in reander model
  composeTBODY: (config) => ({
    attributes: { ... },
    trs: [ ... ],
  }),

  // Callback to create TFOOT in reander model
  composeTFOOT: (config) => ({
    attributes: { ... },
    trs: [ ... ],
  }),

  // Callback to create COLGROUP in render model
  composeCOLGROUP: (config) => ({
    attributes: { ... },
    cols: [ ... ],
  }),

  // Callback to create the render model
  composeTABLE: (config) => ({
    attributes: { ... },
    thead: { ... },
    tbody: { ... },
    tfoot: { ... },
  }),
}
```

## Render Model
```js
{
  attributes: { ... },
  colgroup: {
    attributes: { ... },
    cols: [{
      attributes: { ... },
    }],
  },
  thead: {
    attributes: { ... },
    trs: [{
      attributes: { ... },
      ths: [{
        attributes: { ... },
        content,
      }],
    }],
  },
  tbody: {
    attributes: { ... },
    trs: [{
      attributes: { ... },
      tds: [{
        attributes: { ... },
        content,
      }],
    }],
  },
  tfoot: {
    attributes: { ... },
    trs: [{
      attributes: { ... },
      tds: [{
        attributes: { ... },
        content,
      }],
    }],
  },
}
```

## Generic render model
```js
{
  attributes: { ... },
  columnGroup: {
    attributes: { ... },
    columns: [{
      attributes,
    }],
  },
  header: {
    attributes: { ... },
    rows: [{
      attributes: { ... },
      cells: [{
        attributes,
        content,
      }],
    }],
  },
  body: {
    attributes: { ... },
    rows: [{
      attributes: { ... },
      cells: [{
        attributes,
        content,
      }],
    }],
  },
  footer: {
    attributes: { ... },
    rows: [{
      attributes: { ... },
      cells: [{
        attributes,
        content,
      }],
    }],
  },
}
```
