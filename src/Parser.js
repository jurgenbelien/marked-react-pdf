const Renderer = require("./Renderer");
const { Slugger, defaults } = require("marked");

module.exports = class Parser {
  constructor(options) {
    this.options = options || defaults;
    this.options.renderer = new Renderer(this.options);
    this.renderer = this.options.renderer;
    // this.renderer.options = this.options;
    // this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }

  /**
   * Static Parse Method
   */
  static parse(tokens, options) {
    const parser = new Parser(options);
    return parser.parse(tokens);
  }

  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    const out = [];
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];

      switch (token.type) {
        case 'space': {
          continue;
        }
        case 'hr': {
          out.push(this.renderer.hr());
          continue;
        }
        case 'heading': {
          out.push(this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape(this.parseInline(token.tokens, this.renderer)),
            this.slugger)
          );
          continue;
        }
        case 'code': {
          out.push(this.renderer.code(token.text,
            token.lang,
            token.escaped)
          );
          continue;
        }
        case 'table': {
          // Table is unsupported
          continue;
        }
        case 'blockquote': {
          const body = this.parse(token.tokens);
          out.push(this.renderer.blockquote(body));
          continue;
        }
        case 'list': {

          const { ordered, start, loose, items } = token;
          const body = items.map((item, index) => {
            const { task, checked, tokens } = item;
            return this.renderer.listitem(
              this.parse(tokens, loose), task, checked, ordered, index + start
            )
          });
          out.push(this.renderer.list(body, ordered, start));
          continue;
        }
        case 'html': {
          out.push(this.renderer.html(token.text));
          continue;
        }
        case 'paragraph': {
          out.push(this.renderer.paragraph(this.parseInline(token.tokens)));
          continue;
        }
        case 'text': {
          const body = (token.tokens)
            ? this.parseInline(token.tokens)
            : token.text;
          while (i + 1 < tokens.length && tokens[i + 1].type === 'text') {
            token = tokens[++i];
            body.push((token.tokens ? this.parseInline(token.tokens) : token.text));
          }
          out.push(top ? this.renderer.paragraph(body) : body);
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }

  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    const out = [];
    for (const token of tokens) {
      switch (token.type) {
        case 'escape': {
          out.push(renderer.text(token.text));
          break;
        }
        case 'html': {
          out.push(renderer.html(token.text));
          break;
        }
        case 'link': {
          out.push(renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer)));
          break;
        }
        case 'image': {
          out.push(renderer.image(token.href, token.title, token.text));
          break;
        }
        case 'strong': {
          out.push(renderer.strong(this.parseInline(token.tokens, renderer)));
          break;
        }
        case 'em': {
          out.push(renderer.em(this.parseInline(token.tokens, renderer)));
          break;
        }
        case 'codespan': {
          out.push(renderer.codespan(token.text));
          break;
        }
        case 'br': {
          out.push(renderer.br(i));
          break;
        }
        case 'del': {
          out.push(renderer.del(this.parseInline(token.tokens, renderer)));
          break;
        }
        case 'text': {
          out.push(renderer.text(token.text));
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
