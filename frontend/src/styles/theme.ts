import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    // Reset and base styles
    "*": {
      boxSizing: "border-box",
      transition:
        "color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease",
    },

    // Body styles
    body: {
      margin: 0,
      minHeight: "100vh",
      backgroundColor: "#f7fafc",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
      lineHeight: "1.6",
      fontWeight: "400",
      color: "#1a202c",
    },

    // Typography
    h1: {
      fontSize: "2.5em",
      lineHeight: "1.2",
      fontWeight: "700",
      color: "#1a202c",
    },

    // Links
    a: {
      fontWeight: "500",
      color: "#646cff",
      textDecoration: "inherit",
      _hover: {
        color: "#535bf2",
      },
    },

    // Buttons (non-Chakra buttons)
    "button:not([data-chakra-component])": {
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      padding: "0.6em 1.2em",
      fontSize: "1em",
      fontWeight: "500",
      fontFamily: "inherit",
      backgroundColor: "#ffffff",
      color: "#1a202c",
      cursor: "pointer",
      transition: "all 0.2s ease",
      _hover: {
        borderColor: "#3182ce",
        backgroundColor: "#ebf8ff",
      },
      _focus: {
        outline: "none",
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
      },
    },

    // Custom scrollbar for webkit browsers
    "::-webkit-scrollbar": {
      width: "6px",
    },

    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "3px",
    },

    "::-webkit-scrollbar-thumb": {
      background: "#c1c1c1",
      borderRadius: "3px",
      _hover: {
        background: "#a8a8a8",
      },
    },

    // Focus styles for accessibility
    "*:focus-visible": {
      outline: "2px solid #3182ce",
      outlineOffset: "2px",
    },
  },

  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#ebf8ff" },
          100: { value: "#bee3f8" },
          200: { value: "#90cdf4" },
          300: { value: "#63b3ed" },
          400: { value: "#4299e1" },
          500: { value: "#2B6CB0" },
          600: { value: "#2c5282" },
          700: { value: "#2a4365" },
          800: { value: "#1a365d" },
          900: { value: "#153e75" },
        },
        // Adding semantic color tokens for consistency
        bg: {
          canvas: { value: "#f7fafc" },
          subtle: { value: "#ffffff" },
          muted: { value: "#f9f9f9" },
        },
        border: {
          subtle: { value: "#e2e8f0" },
          focus: { value: "#3182ce" },
          hover: { value: "#cbd5e0" },
        },
        text: {
          primary: { value: "#1a202c" },
          secondary: { value: "#4a5568" },
          muted: { value: "#718096" },
          link: { value: "#646cff" },
          linkHover: { value: "#535bf2" },
        },
      },
      fonts: {
        body: {
          value:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        },
        heading: {
          value:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        },
      },
    },
    recipes: {
      button: {
        base: {
          fontWeight: "medium",
          borderRadius: "8px",
          transition: "all 0.2s ease",
          bg: "white",
          borderColor: "border.subtle",
          color: "gray.800",
          _hover: {
            borderColor: "border.focus",
            bg: "blue.50",
          },
          _focus: {
            borderColor: "border.focus",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
