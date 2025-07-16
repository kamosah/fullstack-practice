# ADR 001: MUI Styling Best Practices

Status: Accepted
Date: 2025-07-16

## Problem Statement

We require a flexible, maintainable, and theme-consistent way to style Material UI (MUI) components that supports responsiveness and seamless developer experience. The solution must be easy for teams to understand, foster reusability, and enable advanced customizations if needed.

### Options Considered

1. Styled Components with Emotion (styled API)

2. sx Prop Inline Styles

3. Legacy JSS Approaches (makeStyles, withStyles)

4. Raw Emotion Template Literal Syntax

5. Global CSS/SCSS Files or CSS Modules

### Decision Outcome

#### Primary Approach:

- Use the styled API from @mui/material/styles for crafting all reusable, theme-aware component shells.

- Use the sx prop for one-off tweaks and responsive adjustments at the point of use.

#### Framework:

- Adopt object style syntax in all styled and sx definitions for TypeScript support, theming, and system prop access.

- Control CSS injection order (when needed) using StyledEngineProvider’s injectFirst or a custom Emotion cache for custom CSS override scenarios.

- Use slots and slotProps for deep customizations on complex MUI components.

- Avoid legacy approaches (makeStyles, global CSS) except when integrating legacy code.

## Tradeoffs and Rationale

| Approach                  | Pros                                      | Cons                                                                |
| :------------------------ | :---------------------------------------- | :------------------------------------------------------------------ |
| `styled` from MUI Theming | breakpoints                               | system props type-safety Slightly more boilerplate for small tweaks |
| `sx` Prop                 | Concise responsive best for one-off cases | Verbose for reusable styles                                         |
| Legacy JSS/CSS            | Familiar for legacy codebases             | Poor theme integration discouraged                                  |
| Emotion Template Literal  | Native CSS feel                           | No MUI theme context less tooling                                   |

### Consequences

- Enables a unified, maintainable, and scalable style architecture.

- All devs follow one clear pattern, improving onboarding and code review.

- Responsive design becomes straightforward with the sx prop’s breakpoint support.

- Advanced customizations (e.g., using slots or slotProps) are documented as exceptions, not defaults.

### Best Practices (Summary)

- Use @mui/material/styles’s styled function exclusively for all styled components tied to MUI’s theme system.

- Write all style definitions using object syntax.

- Apply the sx prop for one-off, responsive, or per-instance overrides.

- Use theme variables and system props for consistent spacing, colors, etc.

- Manage CSS injection order with StyledEngineProvider injectFirst or custom Emotion cache when global override is necessary.

- For advanced needs, prefer slot and slotProps APIs for internal subcomponent control over direct DOM/class hacks.

#### Example Patterns

```tsx
// 1. Reusable component with styled()
import { styled } from "@mui/material/styles";
const MyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "&:hover": { backgroundColor: theme.palette.primary.dark },
}));

// 2. Responsive and one-off customizations
<MyButton
  sx={{
    width: { xs: 120, md: 180 },
    m: 2,
    "& .MuiButton-label": { fontWeight: 700 },
  }}
>
  Action
</MyButton>;
```
