/**
 * @typedef TextOptions
 * @type Object
 * @property {Vector2} coord Coordinates of the text ([x,y])
 * @property {string} text Text to render
 * @property {?string} color Stroke color of the text
 * @property {?string} width Stroke width of the text
 * @property {?string} fill Fill color of the text
 * @property {?number} size Font-size of the text
 * @property {?string} font Font-family of the text
 * @property {?"start"|"middle"|"end"} anchor Anchor of the text
 */

export default class Text {
  /**
   * @param {TextOptions} options
   */
  constructor(options = {}) {
    this.options = options;
    this.coord = this.options.coord;
    this.text = this.options.text;
    this.color = this.options.color || '#000000BB';
    this.width = `${this.options.width}px` || '1px';
    this.fill = this.options.fill || '#000000';
    this.size = this.options.size || 12;
    this.font = this.options.font || 'Arial';
    this.anchor = this.options.anchor || 'start';
  }
}
