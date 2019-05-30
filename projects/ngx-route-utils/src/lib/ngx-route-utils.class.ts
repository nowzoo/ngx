import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';


export class NgxRouteUtils {

  static  getSnapshotRouterLink(route: ActivatedRouteSnapshot|ActivatedRoute): string[] {
    const snapshot: ActivatedRouteSnapshot = route instanceof ActivatedRoute ?
      route.snapshot : route;
    const slugs: string[] = [];
    snapshot.pathFromRoot.forEach(s => {
      slugs.push(...s.url.map(g => g.path));
    });
    return ['/', ...slugs.filter(s => 'string' === typeof s && s.length > 0)];
  }

}
