# Conversation Query Component Requirements Specification

1. **Overview**

- **Component Name:** Conversation Query

- **Purpose:**

    Displays a user’s conversation query within a multi-conversation interface, supporting sticky behavior to keep the current user query visible relative to its corresponding answer. Supports expandable/collapsible states, hover actions, and optimized visibility depending on sticky or non-sticky mode.

2. **Functional Requirements**

- **Modes / States:**

    - **Sticky Mode:**

        - User query is minimized for compact display.

        - Displays only one line of the query optimized for maximum visibility.

        - Includes a "Show More" button below to expand.

        - Remains sticky at the top relative to the current conversation answer while scrolling.

    - **Non-Sticky Mode:**

        - User query is expanded or collapsible.

        - Initially shows up to 4 lines of the query.

        - Displays a "Show More" button positioned bottom left, to reveal full query text on expand.

        - After expanding, query remains sticky as the agent response scrolls.

    - **Scrolling Behavior:**

        - When the user scrolls to other conversation queries, the relevant user query becomes sticky at the top.

    - **Hover Interaction:**

        - On hovering the query content, a button group (Copy & Edit) appears at the bottom right, absolutely positioned relative to the query content.

    - **Content Limiting:**

        - In collapsed mode, limit visible query text according to mode (1 line for sticky, 4 lines for expanded/collapsible).

    - **Accessibility:**

        - Buttons are keyboard accessible.

        - ARIA attributes describe expanded/collapsed state and sticky region.

        - Copy and Edit buttons have proper aria-labels.

3. **Design Specifications**

    - **Figma link:**

        - [Insert Conversation Query Design File link here]

    - **Spacing:**

        - Padding follows 8px base spacing.

        - Margins between query text and buttons consistent with sidebar content layout.

    - **Typography:**

        - Use system sans-serif font.

        - Sticky mode uses larger font size for maximum visibility (e.g., 16-18px, medium weight).

        - Non-sticky mode uses normal paragraph size (14-16px).

        - Line height consistent with 1.4–1.5 for readability.

    - **Colors:**

        - Background: Light neutral for query container.

        - Text: Primary text color for query, accent color for buttons.

        - Buttons: Use subtle hover/focus highlights and clear iconography.

    - **States Styling:**

        - Sticky mode: minimalistic style with a compact single line.

        - Non-sticky mode: multi-line text area with fade or ellipsis for clipped text.

        - Show More button: visually distinct, aligned bottom left in non-sticky mode, bottom center or below in sticky mode.

    - **Button Group (Copy/Edit):**

        - Positioned bottom right absolutely.

        - Icons with tooltips on hover for clarity.

        - Visible only on hover/focus of the query block.

4. **API / Props Table**

| Prop       | Type       | Required | Default | Description                                                 |
| :--------- | :--------- | :------- | :------ | :---------------------------------------------------------- |
| `queryText`  | `string `    | yes      | —       | The full user query text to display                         |
| `isSticky`   | `boolean`    | no       | false   | Controls sticky mode rendering                              |
| `isExpanded` | `boolean`    | no       | false   | Indicates whether the full query text is expanded           |
| `onExpand`   | `() => void` | no       | —       | Callback when "Show More" is clicked                        |
| `onCopy`     | `() => void` | no       | —       | Callback when copy button is clicked                        |
| `onEdit`     | `() => void` | no       | —       | Callback when edit button is clicked                        |
| `maxLines`  | `number`     | no       | 4       | Number of visible lines in collapsed mode (non-sticky mode) |
| `className`  | `string `    | no       | —       | Additional CSS classes for styling                          |
| `ariaLabel`  | `string`     | no       | —       | Accessibility label for the query container                 |

5. **Usage Guidelines**

- Use sticky mode when displaying the current conversation query paired with its answer for maximum context retention during scrolling.

- Use non-sticky mode to display previous or non-current queries in a collapsible format.

- Limit user query preview length to optimize screen real estate, with the option to expand on user demand.

- Show Copy and Edit buttons only on hover to avoid visual clutter but ensure discoverability.

- Maintain consistent keyboard accessibility and focus order for interactive elements.

6. **Edge Cases**

- If the query text is shorter than the maxLines limit, “Show More” button should not be rendered.

- Loading or unavailable states (if applicable) should show a placeholder or skeleton, distinct from real queries.

- Long continuous text without spaces should be truncated gracefully without overflow.

- Copy and Edit callbacks must handle failure scenarios gracefully (e.g., clipboard unavailable).

7. **Performance Requirements**

- Render within 10ms when isolated in Storybook environment.

- Expanding or collapsing the query state should not trigger unnecessary re-renders of surrounding components.

- Hover interactions should be performant and not degrade scrolling smoothness.

8. **Implementation Notes**

- Use React with styled-components or equivalent CSS-in-JS for styling.

- Sticky positioning to be implemented with position: sticky alongside container scroll context.

- Text truncation to use CSS line-clamp or JavaScript fallback for consistent multi-line clipping.

- Button group visibility toggled via hover/focus states in CSS or controlled React state.

- Accessibility attributes such as aria-expanded, role="region", aria-live for dynamic updates should be used.

- All colors and typography tokens should be derived from the design system theme.