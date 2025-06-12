import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: "#2B6CB0" },
        },
      },
    },
    recipes: {
      button: {
        base: {
          fontWeight: "medium",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
