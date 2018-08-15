/**
 * Created by qiangxl on 2018/8/14.
 */
import { getColorStringByFormat } from "../utils/color-utils"

function getStyleguideColorTexts(colorFormat, colors) {
  return colors.map(color => {
    let colorStyleObject = getColorStringByFormat(
      color,
      colorFormat
    );

    return `    public class var ${color.name}: UIColor {
        return UIColor(hex: ${colorStyleObject})
    }`
  });
}

function getStyleguideColorsCode(options, colors) {
  let { colorFormat } = options;
  let styleguideColorTexts = getStyleguideColorTexts(colorFormat, colors);
  return `import UIKit
// MARK: - Const Color
public extension UIColor {

${styleguideColorTexts.join("\n\n")}
}`
}

export {
  getStyleguideColorsCode
};