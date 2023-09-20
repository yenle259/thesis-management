// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import createAutoImportContext from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { Vuetify3Resolver } from "unplugin-vue-components/resolvers";
import createVueRouterContext from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";


const VueRouter: any = createVueRouterContext({
  dts: "@types/typed-router.d.ts",
});

const AutoImport: any = createAutoImportContext({
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.md$/, // .md
  ],
  imports: ["vue", "pinia", VueRouterAutoImports],
  dirs: ["src/apis", "src/utils",  "src/components"],
  dts: "@types/auto-imports.d.ts",
  eslintrc: { enabled: true },
  vueTemplate: true,
});

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  // Workaround to ensure generating dts files on prebuild
  if (command === "build" && mode === "development") {
    await VueRouter.buildStart?.();
    await VueRouter.buildEnd?.();
    await AutoImport.buildStart?.();
  }
  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
      }),
      AutoImport,
      Components({
        dirs: ["src/components", "src/components/**/*"],
        directoryAsNamespace: true,
        globalNamespaces: ["core"],
        dts: "@types/components.d.ts",
        resolvers: [Vuetify3Resolver()],
      }),
    ],
    define: { "process.env": {} },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: 8080,
    },
  };
});
