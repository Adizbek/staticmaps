import isEqual from 'lodash.isequal';
import first from 'lodash.first';
import last from 'lodash.last';

/**
 * @typedef PolyLineOptions
 * @type Object
 * @property {LngLat[]} coords Coordinates of the polyline ([[Lng, Lat], ... ,[Lng, Lat]])
 * @property {?string} color Stroke color of the polyline
 * @property {?string} fill Fill color of the polyline
 * @property {?string} width Stroke width of the polyline
 * @property {?boolean} simplify
 */

export default class Polyline {
  /**
   * @param {PolyLineOptions} options
   */
  constructor(options = {}) {
    this.options = options;
    this.coords = this.options.coords;
    this.color = this.options.color || '#000000BB';
    this.fill = this.options.fill;
    this.width = this.options.width || 3;
    this.simplify = this.options.simplify || false;
    this.type = (isEqual(first(this.coords), last(this.coords)))
      ? 'polygon' : 'polyline';
  }

  /**
   * calculate the coordinates of the envelope / bounding box: (min_lon, min_lat, max_lon, max_lat)
   */
  extent() {
    return [
      Math.min(...this.coords.map((c) => c[0])),
      Math.min(...this.coords.map((c) => c[1])),
      Math.max(...this.coords.map((c) => c[0])),
      Math.max(...this.coords.map((c) => c[1])),
    ];
  }
}
