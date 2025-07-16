### Architectural Decision Record Template

| Field              | Content                                            |
| :----------------- | -------------------------------------------------- |
| Problem Statement  | Multi-modal flexible and consistent styling needed |
| Options Considered | Styled API , sx prop, legacy JSS, template literal |
| Decision Outcome   | Use styled API and sx as described above           |
| Tradeoffs          | Boilerplate (styled) vs. flexibility (sx), etc.    |
| Consequences       | Easier onboarding, great DX, maintainable styles   |
| Confidence Level   | High; consistent with latest MUI guidance          |