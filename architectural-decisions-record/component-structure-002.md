# ADR 002: Atomic Design-inspired UI Structure and Styling Approach

Status: Accepted
Date: 2025-07-16

## Context and Problem Statement

To support maintainable, scalable, and understandable code in our new React application, we need to define a directory structure and component-styling methodology. The application starts simple (MVP), but should encourage best practices for modern React development, including strong component boundaries, reusability, and an opinionated approach to component breakdown (smart/dumb split, breaking up large files) and styling.

## Decision Drivers

- Enforce clarity and learnability for current and future developers.

- Encourage maximum reusability and minimal duplication.

- Make refactoring and scaling easy as complexity grows.

- Leverage and standardize modern React/MUI styling best practices.

- Support smart (container) vs. dumb (presentational) component distinction.

- Prepare for AI support/consistency (e.g., GitHub Copilot with MCP server).

## Considered Options

- Option 1: Atomic design inspired structure (components/, sub-components/, shared-components/, pages/) and styling guide as described, with best practices codified for component breakdown and smart/dumb split.

## Decision Outcome

### Chosen option: Option 1 – Atomic Design-inspired structure with modern React/MUI styling guidelines.

- `components/` for primary app-specific reusable components.

- `sub-components/` for internal elements used only within a component.

- `shared-components/` for generic “library-like” UI (e.g., Button, Typography) that may be reused anywhere.

- `pages/` for route-level views, with smart/container logic.

- **Styling:** Use styled from @mui/material/styles (object syntax, not template literals) for reusable components, and the sx prop for one-off/responsive tweaks.

- **Smart vs. Dumb components:** Pages and some components handle data/logic, while shared- and sub-components are presentational.

- **Component/file size:** Break up any file over ~200 lines or functions over ~30 lines into subcomponents.

- Codified in project docs; surfaced machine-consumable preferences for Copilot via MCP server.

```txt

/src
  /components           // App-specific, reusable UI blocks
    /ComponentName
      index.tsx
      styles.tsx
      [sub-component files]
  /sub-components       // Fine-grained building blocks used within components
    /SubComponentName
      index.tsx
      styles.tsx
  /shared-components    // Highly reusable, generic across the app (e.g., buttons, typographies)
    /SharedComponentName
      index.tsx
      styles.tsx
  /pages                // Page-level containers, route-mapped views
    /PageName
      index.tsx
      styles.tsx
  /hooks                // Custom React hooks
  /utils                // Pure helper functions, formatting, etc.
  /theme                // MUI/emotion theme configuration
  /types                // Shared TypeScript types/interfaces
```

## Consequences

- **Positive:**

  - Codebase stays clean, scalable, and easy to navigate for current and future contributors.

  - Onboarding new developers is straightforward due to clear conventions.

  - Refactoring and feature scaling are less risky and easier.

  - Pattern can be enforced and assisted by tools like Copilot with MCP contextual prompts.

- **Negative:**

  - Slight initial organizational overhead for small MVPs.

  - Some subjective judgment required when breaking into subcomponents or distinguishing “shared” vs. “component.”

  - Developers must learn and follow conventions strictly for maximum benefit.
