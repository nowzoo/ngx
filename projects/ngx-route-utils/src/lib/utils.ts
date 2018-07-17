import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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
}
