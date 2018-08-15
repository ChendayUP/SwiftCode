/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

import {
  textCode
} from "./textLayer"

import {
  getStyleguideColorsCode
} from "./helpers"

function layer(context, layer) {
  return {
    code: textCode(context, layer),
    mode: "swift"
  }
}

function styleguideColors(context, colors) {
  let options = { colorFormat: "hex" };
  let code = getStyleguideColorsCode(options, colors);

  return {
    code: code,
    language: 'swift',
  };
}
//
// function styleguideTextStyles(context, textStyles) {
//
// }
//
function exportStyleguideColors(context, colors) {
  let codeObject = styleguideColors(context, colors);
  let code = codeObject.code;

  return {
    code: code,
    filename: "Color+Const.swift",
    language: "swift"
  };
}
//
// function exportStyleguideTextStyles(context, textStyles) {
//
// }
//
// function comment(context, text) {
//
// }
//
export default {
  layer,
  styleguideColors,
  exportStyleguideColors
  // styleguideTextStyles,
  // exportStyleguideTextStyles,
  // comment
};