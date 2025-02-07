import {useBrowserEffectsAreActive} from '../context.ts';
import {useTitle} from '../hooks/title.ts';

/**
 * Adds a `<title>` tag to the `<head>` of the document with the
 * provided attributes. When more than one `<Title />` (or `useTitle()`)
 * exists in your application, the one that runs most deeply in your
 * React tree is used.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/title
 */
export function Title({children}: {children: Parameters<typeof useTitle>[0]}) {
  if (!useBrowserEffectsAreActive()) {
    return children ? <title>{children}</title> : null;
  }

  useTitle(children);
  return null;
}
