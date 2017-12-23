# projection-grid-core
[![projection-grid-core][shields-npm]][link-npm]
[![coveralls][shields-coveralls]][link-coveralls]

Implement the framework independent of [projection-grid][projection-grid], the
__highly extensible__ & __cross frameworks__ data table. It exposes the
`ProjectionGridCore` class as __default__, and a set of first-party framework
neutral projections as __named exports__.

## Install
Install the package with NPM
```bash
$ npm install projection-grid-core
```

Install the package with Yarn
```bash
$ yarn add projectino-grid-core
```

## Develop framework specific adapters
The `projection-grid-core` implements the platform independent part of the
`projection-grid`. The `ProjectionGridCore` class doesn't work directly with any
specific UI framework. Adapters are needed to bring `projection-grid` to certain
UI framework.

An adapter usually does 3 things
1. Receive the user config & projection configs from parent.
2. Call `ProjectionGridCore#compose` to turn the configurations into a framework
neutral [render model][doc-render-model].
3. Render the DOM (or virtual DOM) according to the render model.

## ProjectionGridCore API
##### ProjectionGridCore#constructor({ projections, postProjections })
###### Parameters
* __(Projection[]) projections__, the prepended projections
* __(Projection[]) postProjections__, the appended projections

##### ProjectionGridCore#compose({ config, projections })
Compose the [render model][doc-render-model] with given config and projections.

###### Parameters
* __(UserConfig) config__, the configuration from user, refer to the
  [user config][doc-user-config] document for details
* __(Projection[]) projections__, a list of projection instances, refer to the
  [projection][doc-projection] document for details

###### Returns
* __(RenderModel)__, the framework neutral render model, refer to the
  [render model][doc-render-model] document for details

##### ProjectionGridCore.createDefault()
Create an instance with builtin projections

###### Returns
* __(ProjectionGridCore)__, the default ProjectionGridCore instance


## First Party Projections
### defaults
[TODO]
### columns
[TODO]
### data
[TODO]
### header
[TODO]
### defaultContent
[TODO]
### decoration
[TODO]
### customRow
[TODO]
### sorting
[TODO]

[shields-npm]: https://img.shields.io/npm/v/projection-grid-core.svg
[link-npm]: https://www.npmjs.com/package/projection-grid-core
[shields-coveralls]: https://img.shields.io/coveralls/github/projection-grid/projection-grid-core.svg
[link-coveralls]: https://coveralls.io/github/projection-grid/projection-grid-core

[projection-grid]: https://projection-grid.gitbooks.io/projection-grid-api-reference/content/
[doc-user-config]: https://projection-grid.gitbooks.io/design-note/content/user-config.html
[doc-projection]: https://projection-grid.gitbooks.io/design-note/content/projection.html
[doc-render-model]: https://projection-grid.gitbooks.io/design-note/content/render-model.html
