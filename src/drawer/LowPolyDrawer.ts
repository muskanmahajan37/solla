import BaseSVGDrawer from './BaseSVGDrawer'
import ColorUtils from '../utils/ColorUtils'
let Trianglify = require('trianglify')

export default class LowPolyDrawer extends BaseSVGDrawer {
  init(): any {}

  draw(): any {
    let pattern = Trianglify({
      x_colors: ColorUtils.getHappyColor(),
      width: 1800,
      height: 1000
    })

    return (
      '<svg width="1800" height="1000" viewBox="0 0 1800 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">' +
      pattern.svg().innerHTML +
      '</svg>'
    )
  }
}
