## First Party Projections
First party projections are used to implemented sophisticated features which are
common enough. They are not piped to the projection chain by default. Users need
to import and pipe them on demand.

## Conventions
1. First party projections are exported separately
3. Folder structure
  * __Single file projection__, put it into a `.js` file, export the projection
    with named exports.
  * __Multiple file projection__, create a folder, export the projection with
    named exports of `index.js`.
4. A list of projections can be chained up according to the logically
  relationship. A "chained projection" is an array of projections. They can be
  implemented in either single file or multiple file.
