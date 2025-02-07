export type {
  NavigateTo,
  NavigateToLiteral,
  NavigateToSearch,
  RouteMatch,
  RouteMatcher,
  RouteMatchDetails,
} from '@quilted/routing';

export * from './types.ts';
export {
  Router,
  RouterNavigationCache,
  type RouterOptions,
  type NavigateOptions,
} from './Router.ts';
export {route, fallbackRoute, createContextRouteFunction} from './route.ts';
export {RouterContext, RouteNavigationEntryContext} from './context.ts';

export {Link} from './components/Link.tsx';
export {Navigation} from './components/Navigation.tsx';
export {Redirect} from './components/Redirect.tsx';
export {Routes} from './components/Routes.tsx';

export {useCurrentURL} from './hooks/current-url.ts';
export {useNavigate} from './hooks/navigate.ts';
export {useRouteData} from './hooks/route-data.ts';
export {useRouteNavigationEntry} from './hooks/route-navigation-entry.ts';
export {useRouter} from './hooks/router.ts';
export {useRoutes} from './hooks/routes.tsx';
