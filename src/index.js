const Parser = require("./Parser");
const { lexer } = require("marked");

module.exports = function (markdown, options) {
  const tokens = lexer(markdown);
  const parser = new Parser(options);
  return parser.parse(tokens);
}
