# Marked-React-pdf

Convert [Markdown] to PDF with [Marked] and [ReactPDF].

## Try it out

Try rendering this file to PDF by running this command:
```npm run example```

## Changes from Marked

In order to render PDF, both the parser and the renderer from Marked are rewritten. Biggest difference in the parser is the output. Where Marked's original parser uses string concatenation, the parser for this renderer returns nested ararys.

## Known issues and shortcomings

- Current styling is _very_ minimal
- Tables are not supported
- Emoji are not supported
- Nested lists do not change their bullets
  - This is because nesting level is not tracked

[Marked]: https://github.com/markedjs/marked/
[Markdown]: https://daringfireball.net/projects/markdown/
[ReactPDF]: https://react-pdf.org

