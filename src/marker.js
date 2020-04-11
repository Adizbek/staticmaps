
/**
 * @typedef MarkerOptions
 * @type Object
 * @property {number} width
 * @property {number} height
 * @property {LngLat[]} coords Coordinates of the marker ([Lng, Lat])
 * @property {string} img Marker image path or URL
 * @property {?number} offsetX X offset of the marker image, default is width/2
 * @property {?number} offsetY Y offset of the marker image, default is height
 */


export default class {
  /**
   * @param options {MarkerOptions}
   */
  constructor(options = {}) {
    this.options = options;

    if (!(options.width && options.height)) throw new Error('Please specify width and height of the marker image.');

    this.coord = this.options.coord;
    this.img = this.options.img;
    this.offsetX = this.options.offsetX || options.width / 2;
    this.offsetY = this.options.offsetY || options.height;
    this.offset = [this.offsetX, this.offsetY];
    this.height = this.options.height;
    this.width = this.options.width;
  }

  /**
   *  Set icon data
   */
  set(img) {
    this.imgData = img;
  }

  extentPx() {
    return [
      this.offset[0],
      (this.height - this.offset[1]),
      (this.width - this.offset[0]),
      this.offset[1],
    ];
  }
}
