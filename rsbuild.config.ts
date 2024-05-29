import { defineConfig } from '@rsbuild/core';
import { pluginSass } from "@rsbuild/plugin-sass"

const testVariable = "#fff"

export default defineConfig({
  plugins: [
    pluginSass({
      sassLoaderOptions: {
        additionalData: `$__INJECTED_THROUGH_RSPACK__: ${testVariable};`
      }
    })
  ]
});
