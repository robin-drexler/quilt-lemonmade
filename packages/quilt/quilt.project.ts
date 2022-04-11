import {createPackage, quiltPackage, Runtime} from '@quilted/craft';

export default createPackage((pkg) => {
  pkg.entry({source: './source/index'});
  pkg.entry({source: './source/http', name: 'http'});
  pkg.entry({source: './source/html', name: 'html'});
  pkg.entry({source: './source/email', name: 'email'});
  pkg.entry({source: './source/global', name: 'global'});
  pkg.entry({source: './source/env', name: 'env'});
  pkg.entry({source: './source/react', name: 'react'});
  pkg.entry({
    source: './source/react/server',
    name: 'react/server',
    runtime: Runtime.Node,
  });
  pkg.entry({source: './source/react/jsx-runtime', name: 'react/jsx-runtime'});
  pkg.entry({source: './source/react/test-utils', name: 'react/test-utils'});
  pkg.entry({source: './source/workers', name: 'workers'});
  pkg.entry({
    source: './source/workers/worker',
    name: 'workers/worker',
    runtime: Runtime.Browser,
  });
  pkg.entry({source: './source/http-handlers', name: 'http-handlers'});
  pkg.entry({
    source: './source/http-handlers/node',
    name: 'http-handlers/node',
    runtime: Runtime.Node,
  });
  pkg.entry({source: './source/polyfills/base', name: 'polyfills/base'});
  pkg.entry({source: './source/polyfills/fetch', name: 'polyfills/fetch'});
  pkg.entry({source: './source/polyfills/crypto', name: 'polyfills/crypto'});
  pkg.entry({source: './source/polyfills/noop', name: 'polyfills/noop'});
  pkg.entry({source: './source/server', name: 'server', runtime: Runtime.Node});
  pkg.entry({source: './source/static', name: 'static', runtime: Runtime.Node});
  pkg.entry({
    source: './source/testing',
    name: 'testing',
    runtime: Runtime.Node,
  });
  pkg.entry({
    source: './source/matchers',
    name: 'matchers',
    runtime: Runtime.Node,
  });

  pkg.use(quiltPackage({react: true}));
});
