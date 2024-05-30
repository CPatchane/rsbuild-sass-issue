import { defineConfig } from '@rsbuild/core';
import { pluginSass } from "@rsbuild/plugin-sass"
import { RspackManifestPlugin } from "rspack-manifest-plugin"

export default defineConfig({
  source: {
    entry: {
      index: "./src/index.ts",
      styleEntry: [
        "./src/style.scss",
        "./node_modules/@drivy/cobalt/utilities.css",
      ]
    },
  },
  plugins: [
    pluginSass({
      sassLoaderOptions: {
        api: "legacy",
      }
    })
  ],
  performance: {
    chunkSplit: {
      override: {
        cacheGroups: {
          "cobalt-utilities": {
            test: /\/node_modules\/@drivy\/cobalt\/utilities/,
            name: "cobalt-utilities",
            chunks: "all",
          },
        },
      },
    },
  },
  tools: {
    rspack: {
      experiments: {
        lazyCompilation: false,
      },
      plugins: [new RspackManifestPlugin({
        filename: "manifest.json",
        writeToDisk: process.env.NODEN_ENV !== "development",
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path
            return manifest
          }, seed)
          return {
            ...manifestFiles,
            entrypoints: entrypoints,
          }
        },
      })]
    }
  }
});
