## Builtin Projections
Builtin projections are always prepended to the projection chain of each grid.
They are used to define the builtin configurations.

## Conventions
1. Builtin projections take no options for their own. They only proceed the
  configuration objects on the pipeline.
2. Builtin projections are internal modules. Not necessary to export them.
3. Folder structure
  * __Single file projection__, put it into a `.js` file, export the projection
    with default exports.
  * __Multiple file projection__, create a folder, export the projection with
    default exports of `index.js`.
