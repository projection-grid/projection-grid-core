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
                          |            Initial Model
                          |                  |
                          |                  v
                          |              Normalize
                          |                  |
                          |                  | Configuration Model
    +---------------------(------------------+
    |                     |
    v                     |
Plugin A <-- Config A     |
    |                     | 
    | Configuration Model |
    v                     |
Plugin B <-- Config B     |
    |                     |
    | Configuration Model |
    v                     |
Plugin C <-- Config C     |
    |                     |
    +---------------------(------------------+
                          |                  | Configuration Model
                          |                  v
                          |               Compose
                          |                  |
                          |                  | Render Model
                          |                  v
                          |                Render
                          |                  |
                          |                  v
                          |            DOM/Virtual DOM
                          |
```

01234567890123456789012345678901234567890123456789012345678901234567890123456789
