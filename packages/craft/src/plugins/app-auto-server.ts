import {stripIndent} from 'common-tags';
import {createProjectPlugin} from '@quilted/sewing-kit';
import type {App, WaterfallHook} from '@quilted/sewing-kit';

import {MAGIC_MODULE_APP_ASSET_MANIFEST} from '../constants';

import {STEP_NAME} from './app-build';

export interface AutoServerOptions {
  /**
   * Indicates that the auto-server build is being generated by `quilt`.
   */
  quiltAutoServer: boolean;
}

export interface AutoServerHooks {
  quiltAutoServerContent: WaterfallHook<string | undefined>;
  quiltAutoServerPort: WaterfallHook<number | undefined>;
  quiltAutoServerHost: WaterfallHook<string | undefined>;
}

declare module '@quilted/sewing-kit' {
  interface BuildAppOptions extends AutoServerOptions {}
  interface BuildAppConfigurationHooks extends AutoServerHooks {}
}

export function appAutoServer() {
  return createProjectPlugin<App>({
    name: 'Quilt.App.AutoServer',
    build({project, workspace, hooks, configure, run}) {
      hooks<AutoServerHooks>(({waterfall}) => ({
        quiltAutoServerHost: waterfall(),
        quiltAutoServerPort: waterfall(),
        quiltAutoServerContent: waterfall(),
      }));

      configure(
        (
          {
            outputDirectory,
            rollupPlugins,
            rollupOutputs,
            rollupInputOptions,
            quiltAutoServerHost,
            quiltAutoServerPort,
            quiltAutoServerContent,
            quiltHttpHandlerHost,
            quiltHttpHandlerPort,
            quiltHttpHandlerContent,
            quiltAsyncPreload,
            quiltAsyncManifest,
          },
          {quiltAutoServer = false},
        ) => {
          if (!quiltAutoServer) return;

          quiltAsyncPreload?.(() => false);
          quiltAsyncManifest?.(() => false);

          quiltHttpHandlerHost?.(async () =>
            quiltAutoServerHost!.run(undefined),
          );

          quiltHttpHandlerPort?.(async () =>
            quiltAutoServerPort!.run(undefined),
          );

          quiltHttpHandlerContent?.(
            async () =>
              (await quiltAutoServerContent!.run(undefined)) ??
              `export {default} from '@quilted/quilt/magic-app-http-handler';`,
          );

          rollupInputOptions?.((options) => {
            options.preserveEntrySignatures = false;
            return options;
          });

          rollupPlugins?.(async (plugins) => {
            plugins.push({
              name: '@quilted/magic-module/asset-manifest',
              async resolveId(id) {
                if (id === MAGIC_MODULE_APP_ASSET_MANIFEST) return id;
                return null;
              },
              async load(source) {
                if (source !== MAGIC_MODULE_APP_ASSET_MANIFEST) return null;

                const manifestFiles = await workspace.fs.glob(
                  'manifest*.json',
                  {
                    cwd: workspace.fs.buildPath(
                      workspace.apps.length > 1
                        ? `apps/${project.name}`
                        : 'app',
                      'manifests',
                    ),
                    onlyFiles: true,
                  },
                );

                const manifests = await Promise.all(
                  manifestFiles.map(async (manifestFile) => {
                    const manifestString = await workspace.fs.read(
                      manifestFile,
                    );

                    return JSON.parse(manifestString);
                  }),
                );

                return stripIndent`
                  import {createAssetLoader} from '@quilted/async/server';

                  const manifests = JSON.parse(${JSON.stringify(
                    JSON.stringify(manifests),
                  )});

                  const assetLoader = createAssetLoader({
                    getManifest: () => Promise.resolve(manifests[0]),
                  });

                  export default assetLoader;
                `;
              },
            });

            return plugins;
          });

          rollupOutputs?.(async (outputs) => [
            ...outputs,
            {
              format: 'esm',
              entryFileNames: 'index.js',
              dir: await outputDirectory.run(
                workspace.fs.buildPath(
                  workspace.apps.length > 1 ? `apps/${project.name}` : 'app',
                  'server',
                ),
              ),
            },
          ]);
        },
      );

      run((step, {configuration}) =>
        step({
          name: 'Quilt.App.AutoServer',
          label: `Build automatic server for app ${project.name}`,
          needs: (step) => {
            return {
              need: step.target === project && step.name === STEP_NAME,
              allowSkip: true,
            };
          },
          async run() {
            const [configure, {buildWithRollup}] = await Promise.all([
              configuration({quiltAutoServer: true, quiltHttpHandler: true}),
              import('@quilted/sewing-kit-rollup'),
            ]);

            await buildWithRollup(configure);
          },
        }),
      );
    },
  });
}
