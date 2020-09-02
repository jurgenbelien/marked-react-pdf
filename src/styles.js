const headingSizes = [
  0,
  32,
  24,
  18,
  14,
  12,
  10
];

// Inline styling
const strong = {
  fontWeight: "bold"
};
const em = {
  fontStyle: "italic"
};
const del = {
  textDecoration: "line-through"
};
const checkbox = {
  width: 10,
  height: 10,
};
const codespan = {
  fontFamily: "Courier"
};

// Block styling
const block = {
  marginBottom: 16,
};
const blockquote = {
  marginLeft: "4vw",
  ...block,
};
const code = {
  ...codespan,
  ...block,
};
const headings = [1,2,3,4,5,6].reduce((headings, level) => ({
  ...headings,
  [`h${level}`]: {
    ...block,
    fontSize: headingSizes[level]
  }
}), {});
const hr = {
  ...block,
  width: "50%",
  height: "1pt",
  backgroundColor: "black",
  marginLeft: "25%",
  marginRight: "25%",
};
const html = {
  ...block
}
const image = {
  ...block
}
const list = {
  ...block
};
const li = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
};
const liPrefix = {
  width: "4vw",
  marginLeft: "2vw",
  marginRight: "2vw",
  textAlign: "right"
};
const liContent = {
  marginRight: "8vw"
};
const paragraph = {
  ...block,
};

module.exports = {
  strong,
  em,
  del,
  checkbox,
  codespan,
  blockquote,
  code,
  ...headings,
  hr,
  html,
  image,
  list,
  li,
  liPrefix,
  liContent,
  paragraph,
};
