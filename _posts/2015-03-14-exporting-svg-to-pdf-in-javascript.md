---
layout: post
title: Exporting SVG to PDF in JavaScript
---

For a project that I was working on recently, I had to convert SVG to PDF on the client-side using JavaScript.
There are a number of solutions for the server-side, but on the client-side, the choices are more limited.

For the following strategy, it requires the browser to support `data:image/svg+xml;...` [data URIs](http://caniuse.com/#feat=datauri).
So unfortunately, this will ***not*** work with IE, but should work with most major modern browsers.

Strategy
--------

* Get the `SVGElement` from the DOM, or generate one
* Use [saveSvgAsPng](https://github.com/exupero/saveSvgAsPng) to convert `SVGElement` to a JPEG using `canvas`
* Use [jsPDF](https://github.com/MrRio/jsPDF) to create a `jsPDF` object, then insert the JPEG image
* Export the `jsPDF` object as a PDF

Though alternatively, you *could* use [PDFKit](https://github.com/devongovett/pdfkit) depending on your requirements.

Code
----
* [Code can be found on Github](http://github.com/haochi/svg_to_pdf){:target = "_blank"}
* [Demo](http://haochi.github.io/svg_to_pdf){:target="_blank"}
