const { readFileSync } = require("fs");
const { join } = require("path");
const React = require("react");
const ReactPDF = require("@react-pdf/renderer");
const { Document, Page, Font } = ReactPDF;

Font.register({ family: "Roboto", fonts: [
  { src: join(__dirname, "../fonts/Roboto/Roboto-Regular.ttf") }, // font-style: normal, font-weight: normal
  { src: join(__dirname, "../fonts/Roboto/Roboto-Bold.ttf"), fontWeight: 700 },
  { src: join(__dirname, "../fonts/Roboto/Roboto-BoldItalic.ttf"), fontWeight: 700, fontStyle: 'italic' },
  { src: join(__dirname, "../fonts/Roboto/Roboto-Italic.ttf"), fontStyle: 'italic' },
 ]});

const markedReactPDF = require("../src/index");

const readme = readFileSync(join(__dirname, "../README.md")).toString();

const output = markedReactPDF(readme);

ReactPDF.render((
  <Document>
    <Page style={{
      fontFamily: 'Roboto',
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
     }}>
      {output}
    </Page>
  </Document>
), join(__dirname, "../README.pdf"));
