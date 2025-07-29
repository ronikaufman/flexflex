# Flexflex

## A typographic experiment

Flexflex was designed to be as flexible as possible: each letter can fit inside any given rectangle and continuously transform when its aspect ratio changes. In theory, it's infinitely variable.
It's a sans-serif typeface, can be monospaced and follows a few constraints:
- monolined (consistent thickness) and continuous,
- keep it minimal, maximize symmetry and mathematical alignment,
- only use quarter, half or whole circles (no diagonal lines), and only circular arcs,
- no descenders nor ascenders, nothing gets out of the bounding rectangle,
- each letter is independent, there is no kerning.

See [website](https://ronikaufman.github.io/flexflex/) for more information and demos. This repository contains both the website and the library, [flexflex.js](./flexflex.js).

## Documentation

The library consists of a single function, `drawLetter`.

Syntax:
`drawLetter(el, ch, x, y, w, h, col, sw, [skewAngle], [linecap], [linejoin])`

Parameters:
- `el`: The target element or context on which the letter will be drawn. Either a DOM element ([`<svg>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) or [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)) or a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) object (when working with [p5.js](https://p5js.org/), you can use [drawingContext](https://p5js.org/reference/p5/drawingContext/)).
- `ch`: The character (letter) to be drawn, case-insensitive. If the character is not a single letter, nothing is drawn, but no error message is thrown. String.
- `x`, `y`: Coordinates of the top-left corner of the letter's bounding rectangle. Numbers.
- `w`, `h`: Width and height of the letter's bounding rectangle. Numbers.
- `col`: Color of the letter's stroke. Any valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color).
- `sw`: Stroke width of the letter. The stroke is drawn on the inner side, so that all the letter stays inside the bounding rectangle, regardless of stroke width. Number.
- `skewAngle` (optional): Skew angle applied to the letter, to slant the letter, in degrees. 0 (default) doesn't change anything. Number.
- `linecap` (optional): Style of the end caps for the letter's strokes. Either "square" (default) or "round".
- `linejoin` (optional): Style of the corners for the letter's strokes. Either "miter" (default) or "round".

## License

This work is licensed under the [Creative Common Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) [license](./LICENSE.txt).