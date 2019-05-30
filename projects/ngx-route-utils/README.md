# NgxRouteUtils

A class with static utility methods for Angular routes. 

```bash
npm i -S @nowzoo/ngx-route-utils
```

There is no module, just import the class:

```ts
import { NgxRouteUtils } from `@nowzoo/ngx-route-utils`
```

## Public API

`static getSnapshotRouterLink(route: ActivatedRouteSnapshot|ActivatedRoute): string[]`

Gets an array of route paths prefaced with a forward slash, e.g.: `['/', 'foo', 'bar']`.

## Development

See the [README](https://github.com/nowzoo/ngx) at the root of the repo for info on installation and testing.
