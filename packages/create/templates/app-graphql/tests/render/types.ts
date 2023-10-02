import type {TestRouter} from '@quilted/quilt/navigate/testing';
import type {QueryClient} from '@tanstack/react-query';

import type {AppContext} from '~/shared/context.ts';

import type {GraphQLController} from '../graphql.ts';

export interface RenderOptions {
  /**
   * A custom router to use for this component test. You can use a
   * custom router to simulate a particular URL, and you can spy on
   * its navigation method to check that components navigate as
   * you expect.
   */
  readonly router?: TestRouter;

  /**
   * An object that controls the responses to GraphQL queries and mutations
   * for the component under test. You can customize the responses using
   * the `fillGraphQL` and `createGraphQLController` utilities provided
   * by this module.
   *
   * ```tsx
   * import {renderWithAppContext, fillGraphQL, createGraphQLController} from '~/tests/render.tsx';
   *
   * import {MyComponent} from './MyComponent.tsx';
   * import myComponentQuery from './MyComponentQuery.graphql';
   *
   * const myComponent = await renderWithAppContext(<MyComponent />, {
   *   graphql: createGraphQLController(
   *     fillGraphQL(myComponentQuery, {user: {name: 'Winston'}}),
   *   ),
   * });
   * ```
   */
  readonly graphql?: GraphQLController;

  /**
   * A custom locale to use for this component test.
   */
  readonly locale?: string;
}

export interface RenderContext extends AppContext {
  /**
   * The router used for this component test.
   */
  readonly router: TestRouter;

  /**
   * The GraphQL controller used for this component test.
   */
  readonly graphql: GraphQLController;

  /**
   * The react-query client used for this component test.
   */
  readonly queryClient: QueryClient;
}

export interface RenderActions extends Record<string, never> {}
