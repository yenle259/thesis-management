import path from "node:path";

// Plugins
import vuetify from "vite-plugin-vuetify";
import createAutoImportContext from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { Vuetify3Resolver } from "unplugin-vue-components/resolvers";
import createVueRouterContext from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Vue from "@vitejs/plugin-vue";
// import VueRouter from "unplugin-vue-router/vite";

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
  imports: [
    "vue",
    "pinia",
    VueRouterAutoImports,
    {
      "@vueuse/core": ["useTitle"],
    },
    {
      axios: [
        // default imports
        ["default", "axios"], // import { default as axios } from 'axios',
      ],
    },
  ],
  dirs: [
    "src/apis",
    "src/utils",
    "src/components",
    "src/stores",
    "src/pages",
    "src/components/form/data",
  ],
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
      // vue({
      //   template: { transformAssetUrls },
      // }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      Vue(),
      VueRouter,
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
        "@img": path.resolve(__dirname, "./src/assets/images"),
        "@data": path.resolve(__dirname, "./src/components/form/data"),
        "@rules": path.resolve(__dirname, "./src/components/form/rules"),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: 8080,
    },
  };
});
