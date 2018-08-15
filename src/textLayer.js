/**
 * Created by qiangxl on 2018/8/14.
 */
import {
  getColorMapByFormat,
  getColorStringByFormat,
  isBold
} from "./utils/color-utils"

/**
 * Created by qiangxl on 2018/8/14.
 */

function textCode(context, layer) {
  let colorFormat = "hex"

  let colors = getColorMapByFormat(context.project.colors, colorFormat)
  let object = {
    "layerName": layer.name,
    "projectName": context.project.name,
    "content": layer.content,
    "type": layer.type,
    "colors": colors,
    "assets": layer.assets
  }

  if (object.type === "text" && layer.defaultTextStyle) {
    let textStyle = layer.defaultTextStyle
    let color = getColorStringByFormat(textStyle.color, colorFormat)
    if (colors[color]) {
      color = `UIColor.${colors[color]}`
    }
    object.textStyle = {
      "fontSize": textStyle.fontSize,
      "fontWeight": textStyle.fontWeight,
      "fontStyle": textStyle.fontStyle,
      "color": color,
      "weightText": textStyle.weightText,
      "isBold": isBold(textStyle.weightText),
      "textAlign": textAlign(textStyle.textAlign)
    }
  }
  if (object.type === "text" && layer.defaultTextStyle) {
    return labelText(object)
  } else if (object.assets) {
    return assetsText(object)
  } else {
    return "no code"//JSON.stringify(layer, null, 2);
  }
}
// 文字代码生成
function labelText(object) {
  let textStyle = object.textStyle
  return `lazy var <#${object.layerName}#>Label: UILabel = {
       let view = UILabel("${object.content}", fontSize: ${textStyle.fontSize}, color: ${textStyle.color}, textAlignment: ${textStyle.textAlign}, isBold: ${textStyle.isBold})
        return view
  }()`
}

// 图片代码生成
function assetsText(object) {
  return `R.image.${object.layerName}`
}

function textAlign(align) {
  if(align === "left" || align === "justify") {
    return ".left"
  } else if (align === "right") {
    return ".right"
  } else if (align === "center") {
    return ".center"
  }
}
export {
  textCode
};