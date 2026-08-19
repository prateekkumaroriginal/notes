# Design preferences

- Avoid cards.
- Avoid separators.
- Use spacing to clearly associate each definition with its heading.
- If and only if Q&A exists, keep it at the end.
- Emphasize focus words with color.
- Keep heading text free of code-pill backgrounds.
- Dark mode only.
- Use browser-default font sizes.
- Use `line-height: 1.5` for code snippets.

## Don't use these css properties until necessary:

- Margin
- line-height
- flex shrink
- flex shorthand

## Spacings

- Use `5rem` vertical page padding. Reduce it to `3rem` on screens up to `720px` wide.
- Leave `3rem` after the page header.
- Give the main heading `0.75rem` of space below it.
- Give section headings `2.5rem` above and `0.75rem` below.
- Use `1.75rem` between related examples or definitions.
- Use `2rem` between quiz items.
- Use `1.25rem` of padding inside code blocks.

## Writing Style

- No eyebrow, kicker, or overline on headings.
- Main heading should be crystal clear.
- Do not use em dashes.
- Refrain from numbering headings unless the number suggest an order among them.

## Q&A

- Include a Q&A section only when it helps the reader check their understanding.
- Use an ordered list for the questions.
- Hide each answer inside `<details>` with `Show answer` as the `<summary>`.
- Provide answer with explanation.
