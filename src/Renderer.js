const he = require("he");
const React = require("react");
const defaultStyles = require("./styles");
const { Text, Link, View, Image, StyleSheet } = require("@react-pdf/renderer")

module.exports = class Renderer {
  constructor(options) {
    this.options = options;
    this.key = 0;
    this.styles = StyleSheet.create(
      Object.assign(defaultStyles, options.styles || {})
    );
  }
  // Inline renderer
  text(text) {
    return (<Text key={`text-${this.key++}`}>{he.decode(text)}</Text>);
  };
  checkbox(checked) {
    return (<Text key={`checkbox-${this.key}`} style={this.styles.checkbox}>{ checked ? "×" : "_" }</Text>);
  }
  br(key) {
    return (<Text key={`br-${this.key++}`}>\n</Text>);
  }
  strong(text) {
    return (<Text key={`strong-${this.key++}`} style={this.styles.strong}>{text}</Text>);
  }
  em(text) {
    return (<Text key={`em-${this.key++}`} style={this.styles.em}>{text}</Text>);
  }
  del(text) {
    return (<Text key={`del-${this.key++}`} style={this.styles.del}>{text}</Text>);
  }
  codespan(content) {
    return (<Text key={`codespan-${this.key++}`} style={this.styles.codespan}>{content}</Text>);
  }
  link(href, title, text) {
    return (<Link key={`br-${this.key++}`} src={href} title={title}>{text}</Link>);
  };

  // Blockquote
  blockquote(quote) {
    return <View key={`blockquote-${this.key++}`} style={this.styles.blockquote}>
      <Text>{quote}</Text>
    </View>;
  }
  code(content, infostring, escaped) {
    return (<View key={`code-${this.key++}`} style={this.styles.code}>
      <Text>{content}</Text>
    </View>)
  }
  heading(text, level, raw, slugger) {
    const headingStyle = this.styles[`h${level}`];
    return (<View key={`h${level}-${this.key++}`} style={headingStyle}>
      { text }
    </View>);
  }
  hr(key) {
    return (<View key={`hr-${this.key++}`} style={this.styles.hr} />)
  }
  html(html) {
    return html;
  }
  image(href, title, text) {
    return (<Image key={`image-${this.key++}`} style={this.styles.image} src={href} />)
  }
  list(body, ordered, start) {
    return (<View key={`list-${this.key++}`} style={this.styles.list}>{body}</View>)
  }
  listitem(content, task, checked, ordered, index) {
    let liContent;
    const prefix = (ordered)
      ? `${index}.`
      : "• ";

    if (content.length > 1) {
      liContent = (
        <>
          <Text>{task && this.checkbox(checked)} {content[0]}</Text>
          {content.slice(1)}
        </>);
    } else {
      liContent = (task)
        ? (<Text>{this.checkbox(checked)} {content}</Text>)
        : (<Text>{content}</Text>);
    }

    return (
      <View key={`li-${this.key++}`} style={this.styles.li}>
        <Text style={this.styles.liPrefix}>
          {prefix}
        </Text>
        <View style={this.styles.liContent}>
          {liContent}
        </View>
      </View>
    );
  };
  paragraph(content) {
    return (
      <View key={`p-${this.key++}`} style={this.styles.paragraph}>
        <Text>{content}</Text>
      </View>
    );
  };
  table(header, body) {
    return body;
  }
  tablerow(content) {
    return content;
  }
  tablecell(content, flags) {
    return content;
  }
}
