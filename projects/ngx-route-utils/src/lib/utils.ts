import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

export class NgxRouteUtils {
  static urlFromRoute(route: ActivatedRoute | ActivatedRouteSnapshot): string {
    let snapshot: ActivatedRouteSnapshot = route instanceof ActivatedRoute ? route.snapshot : route;
    const slugs: string[] = [];
    while (snapshot) {
      const snapSlugs = snapshot.url.map((seg) => seg.path);
      slugs.unshift(...snapSlugs);
      snapshot = snapshot.parent;
    }
    const nonempty = slugs.filter(s => {
      return s.length > 0;
    });
    return '/' + nonempty.join('/');
  }

  static currentRouteSnapshots(router: Router): ActivatedRouteSnapshot[] {
    let routeSnapshot: ActivatedRouteSnapshot = router.routerState.root.snapshot;
    const snapshots: ActivatedRouteSnapshot[] = [];
    while (routeSnapshot) {
      snapshots.push(routeSnapshot);
      routeSnapshot = routeSnapshot.children[0];
    }
    return snapshots;
  }
}
