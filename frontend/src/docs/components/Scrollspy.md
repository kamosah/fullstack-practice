# ScrollSpy Icon Button — Component Technical Specification

1. **Overview**

**Component Name:** ScrollSpyIconButton
**Purpose:**
Displays an icon button (“Scroll to the latest”) fixed in the middle of the Conversation Panel. It allows users to scroll directly to the latest user query (making that query “sticky”/flush at the top). Intended for use in chat or Q&A applications to help users quickly navigate to the latest update in a long conversation.

2. **Functional Requirements**
- **Visibility:**

    - Appears only once, on mount, at the start of the conversation.

    - Only displays if there is more than one user query in the conversation.

    - Disappears once the user scrolls to the latest query or interacts with the button.

- **Scroll Behavior:**

    - On click, automatically scrolls the conversation panel so the latest user query aligns flush/sticky at the top of the conversation container.

- **Tooltip:**

    - On hover, displays a tooltip: “Scroll to the latest”.

- **Accessibility:**

    - Button must be keyboard-accessible (focusable, enters with Tab, triggers with Enter/Space).

    - Tooltip must be accessible via screen reader (aria-label/aria-describedby).

    - Must have sufficient color contrast (WCAG 2.1 AA).

- **Icon:**

    - Uses a chevron-down or similar icon to indicate scrolling.

3. **Design Specifications**

- **Figma link:** [Insert Design File]

- **Icon:** Chevron-down (outlined, 24x24px)

- **Tooltip:** Rounded, theme-consistent background, appears above/below button on hover/focus

- **Positioning:** Vertically centered in the chat/answer panel (not fixed to bottom/top)

- **Spacing:** Follows 8px vertical/horizontal margin rules from theme

- **Theme:** Adheres to brand colors (primary/secondary), hover and active states for button

- **Button Shape:** 48x48px touch target, circular, visually centered on the panel

4. **API / Props Table**

| Prop        | Type     | Required | Default                | Description                                 |
| :---------- | :------- | :------- | :--------------------- | :------------------------------------------ |
| visible     | boolean  | yes      | false                  | Controls the visibility of the icon button  |
| onClick     | function | yes      | –                      | Handles scroll to latest query action       |
| ariaLabel   | string   | no       | “Scroll to the latest” | Accessibility label                         |
| tooltipText | string   | no       | “Scroll to the latest” | Tooltip content                             |
| icon        | node     | no       | ChevronDown            | Icon to use; defaults to chevron down arrow |

5. **Usage Guidelines**

- Only render if there is more than one user query.

- Should auto-hide (unmount or fade) after being used or if the user has already scrolled to the latest query.

- Tooltip must appear on both mouse hover and keyboard focus.

- Maintain central vertical positioning regardless of panel scroll.

- Do not use for manual scrolling to arbitrary positions—this is only for jumping to the most recent user query.

- On small viewports (mobile), may shift position (e.g., stick right above the input area).

6. **Edge Cases**

- If the latest user query is already visible/sticky at the top on first render, the button should not render.

- If conversation is empty or only one user query, never display the button.

- If the panel is resized or device orientation changes, ensure the button remains centered.

- If interaction triggers scroll but new messages load before animation completes, button should still disappear after action completes.

7. **Performance Requirements**

- Button display and removal must occur with no noticeable delay on mount/unmount.

- Scroll animation to latest query must complete within 400ms.

- Tooltip appearance/disappearance should be instant (<80ms delay).

- Should not add more than 1kb gzipped to component bundle size.

8. **Implementation Notes**

- Use absolute or sticky positioning as needed to keep button vertically centered in the panel.

- Use design system components for button and tooltip where possible.

- Use smooth scroll behavior (e.g., scrollIntoView({ behavior: “smooth” })) for scroll action.

- Screen reader-accessible labels for accessibility.

- All style tokens should come from the design system theme.

- Add ARIA attributes to ensure accessibility for tooltip and button.

**Sample Storybook Stories for ScrollSpyIconButton**

- Default: Centered on panel, tooltip on hover/focus

- Interaction: Click scrolls to latest query, button disappears

- Accessibility: Keyboard navigation focus, visible tooltip, proper aria-label

- Edge Case: Button not shown if only one message visible

- Mobile: Button shifts position for mobile breakpoints