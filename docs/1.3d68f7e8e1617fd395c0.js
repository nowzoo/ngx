(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{CcAL:function(n,l,u){"use strict";u.r(l);var t=u("CcnG"),e=function(){},a=u("pMnS"),i=u("ZYCi"),r=u("Ip0R"),o=u("26FU"),c=function(){function n(){this.signedIn$=new o.a(!1)}return Object.defineProperty(n.prototype,"signedIn",{get:function(){return this.signedIn$.asObservable()},enumerable:!0,configurable:!0}),n.prototype.signOut=function(){this.signedIn$.next(!1)},n.prototype.signIn=function(){this.signedIn$.next(!0)},n.ngInjectableDef=t.Q({factory:function(){return new n},token:n,providedIn:"root"}),n}(),s=function(){function n(n){this.auth=n}return n.prototype.ngOnInit=function(){},n}(),p=t.La({encapsulation:0,styles:[[""]],data:{}});function f(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,6,"li",[["class","nav-item"],["routerLinkActive","active"]],null,null,null,null,null)),t.Ma(1,1720320,null,2,i.l,[i.k,t.k,t.B,t.h],{routerLinkActive:[0,"routerLinkActive"]},null),t.Ya(603979776,3,{links:1}),t.Ya(603979776,4,{linksWithHrefs:1}),(n()(),t.Na(4,0,null,null,2,"a",[["class","nav-link"],["routerLink","./sign-in"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,u){var e=!0;return"click"===l&&(e=!1!==t.Va(n,5).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.Ma(5,671744,[[4,4]],0,i.m,[i.k,i.a,r.i],{routerLink:[0,"routerLink"]},null),(n()(),t.ab(-1,null,["Sign In"]))],function(n,l){n(l,1,0,"active"),n(l,5,0,"./sign-in")},function(n,l){n(l,4,0,t.Va(l,5).target,t.Va(l,5).href)})}function d(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,2,"li",[["class","nav-item"]],null,null,null,null,null)),(n()(),t.Na(1,0,null,null,1,"a",[["class","nav-link"],["href","#"]],null,[[null,"click"]],function(n,l,u){var t=!0;return"click"===l&&(n.component.auth.signOut(),t=!1!==u.preventDefault()&&t),t},null,null)),(n()(),t.ab(-1,null,["Sign Out"]))],null,null)}function g(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,23,"div",[["class","container my-4"]],null,null,null,null,null)),(n()(),t.Na(1,0,null,null,20,"nav",[["class","navbar navbar-expand-lg navbar-dark bg-primary"]],null,null,null,null,null)),(n()(),t.Na(2,0,null,null,2,"a",[["class","navbar-brand"],["routerLink","./"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,u){var e=!0;return"click"===l&&(e=!1!==t.Va(n,3).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.Ma(3,671744,null,0,i.m,[i.k,i.a,r.i],{routerLink:[0,"routerLink"]},null),(n()(),t.ab(-1,null,["NgxSignInRedirectService Demo"])),(n()(),t.Na(5,0,null,null,1,"button",[["aria-controls","route-utils-navbar"],["aria-expanded","false"],["aria-label","Toggle navigation"],["class","navbar-toggler"],["data-target","#route-utils-navbar"],["data-toggle","collapse"],["type","button"]],null,null,null,null,null)),(n()(),t.Na(6,0,null,null,0,"span",[["class","navbar-toggler-icon"]],null,null,null,null,null)),(n()(),t.Na(7,0,null,null,14,"div",[["class","collapse navbar-collapse"],["id","route-utils-navbar"]],null,null,null,null,null)),(n()(),t.Na(8,0,null,null,13,"ul",[["class","navbar-nav mr-auto"]],null,null,null,null,null)),(n()(),t.Na(9,0,null,null,6,"li",[["class","nav-item"],["routerLinkActive","active"]],null,null,null,null,null)),t.Ma(10,1720320,null,2,i.l,[i.k,t.k,t.B,t.h],{routerLinkActive:[0,"routerLinkActive"]},null),t.Ya(603979776,1,{links:1}),t.Ya(603979776,2,{linksWithHrefs:1}),(n()(),t.Na(13,0,null,null,2,"a",[["class","nav-link"],["routerLink","./guarded"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,u){var e=!0;return"click"===l&&(e=!1!==t.Va(n,14).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.Ma(14,671744,[[2,4]],0,i.m,[i.k,i.a,r.i],{routerLink:[0,"routerLink"]},null),(n()(),t.ab(-1,null,["Guarded Route"])),(n()(),t.Ea(16777216,null,null,2,null,f)),t.Ma(17,16384,null,0,r.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),t.Wa(131072,r.b,[t.h]),(n()(),t.Ea(16777216,null,null,2,null,d)),t.Ma(20,16384,null,0,r.k,[t.M,t.J],{ngIf:[0,"ngIf"]},null),t.Wa(131072,r.b,[t.h]),(n()(),t.Na(22,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),t.Ma(23,212992,null,0,i.o,[i.b,t.M,t.j,[8,null],t.h],null,null)],function(n,l){var u=l.component;n(l,3,0,"./"),n(l,10,0,"active"),n(l,14,0,"./guarded"),n(l,17,0,!t.bb(l,17,0,t.Va(l,18).transform(u.auth.signedIn))),n(l,20,0,t.bb(l,20,0,t.Va(l,21).transform(u.auth.signedIn))),n(l,23,0)},function(n,l){n(l,2,0,t.Va(l,3).target,t.Va(l,3).href),n(l,13,0,t.Va(l,14).target,t.Va(l,14).href)})}var b=t.Ja("app-container-route",s,function(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,1,"app-container-route",[],null,null,null,g,p)),t.Ma(1,114688,null,0,s,[c],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),v=function(){function n(n,l){this.authService=n,this.redirectService=l}return n.prototype.ngOnInit=function(){},n.prototype.signIn=function(){this.authService.signIn(),this.redirectService.redirectOnSignIn("/ngx-route-utils/ngx-sign-in-redirect-service")},n}(),h=u("2oYE"),k=t.La({encapsulation:0,styles:[[""]],data:{}});function m(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,2,"header",[],null,null,null,null,null)),(n()(),t.Na(1,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),t.ab(-1,null,["Sign In"])),(n()(),t.Na(3,0,null,null,2,"div",[["class","form-group"]],null,null,null,null,null)),(n()(),t.Na(4,0,null,null,1,"button",[["class","btn btn-success"],["type","button"]],null,[[null,"click"]],function(n,l,u){var t=!0;return"click"===l&&(t=!1!==n.component.signIn()&&t),t},null,null)),(n()(),t.ab(-1,null,["Sign In"]))],null,null)}var y=t.Ja("app-sign-in-route",v,function(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,1,"app-sign-in-route",[],null,null,null,m,k)),t.Ma(1,114688,null,0,v,[c,h.b],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),N=u("K9Ia"),I=u("ny24"),L=function(){function n(n,l,u,t){this.router=n,this.route=l,this.redirectService=u,this.authService=t,this.ngUnsubscribe=new N.a}return n.prototype.ngOnInit=function(){var n=this;this.authService.signedIn.pipe(Object(I.a)(this.ngUnsubscribe)).subscribe(function(l){l||(n.redirectService.redirect=n.router.url,n.router.navigate(["../sign-in"],{relativeTo:n.route}))})},n.prototype.ngOnDestroy=function(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()},n}(),M=t.La({encapsulation:0,styles:[[""]],data:{}});function S(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,2,"header",[],null,null,null,null,null)),(n()(),t.Na(1,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),t.ab(-1,null,["Guarded Route"])),(n()(),t.Na(3,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t.ab(-1,null,[" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n"]))],null,null)}var x=t.Ja("app-guarded-route",L,function(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,1,"app-guarded-route",[],null,null,null,S,M)),t.Ma(1,245760,null,0,L,[i.k,i.a,h.b,c],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),K=function(){function n(){}return n.prototype.ngOnInit=function(){},n}(),U=t.La({encapsulation:0,styles:[[""]],data:{}});function V(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,2,"header",[],null,null,null,null,null)),(n()(),t.Na(1,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),t.ab(-1,null,["Home"])),(n()(),t.Na(3,0,null,null,5,"p",[],null,null,null,null,null)),(n()(),t.ab(-1,null,[" Go to the "])),(n()(),t.Na(5,0,null,null,2,"a",[["routerLink","./guarded"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,u){var e=!0;return"click"===l&&(e=!1!==t.Va(n,6).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.Ma(6,671744,null,0,i.m,[i.k,i.a,r.i],{routerLink:[0,"routerLink"]},null),(n()(),t.ab(-1,null,["guarded route"])),(n()(),t.ab(-1,null,[".\n"]))],function(n,l){n(l,6,0,"./guarded")},function(n,l){n(l,5,0,t.Va(l,6).target,t.Va(l,6).href)})}var O=t.Ja("app-index-route",K,function(n){return t.cb(0,[(n()(),t.Na(0,0,null,null,1,"app-index-route",[],null,null,null,V,U)),t.Ma(1,114688,null,0,K,[],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),w=function(){};u.d(l,"NgxSignInRedirectServiceDemoModuleNgFactory",function(){return J});var J=t.Ka(e,[],function(n){return t.Ta([t.Ua(512,t.j,t.Z,[[8,[a.a,b,y,x,O]],[3,t.j],t.v]),t.Ua(4608,r.m,r.l,[t.s,[2,r.r]]),t.Ua(4608,c,c,[]),t.Ua(1073742336,r.c,r.c,[]),t.Ua(1073742336,i.n,i.n,[[2,i.t],[2,i.k]]),t.Ua(1073742336,w,w,[]),t.Ua(1073742336,e,e,[]),t.Ua(1024,i.i,function(){return[[{path:"",component:s,children:[{path:"sign-in",component:v},{path:"guarded",component:L},{path:"",component:K}]}]]},[])])})}}]);