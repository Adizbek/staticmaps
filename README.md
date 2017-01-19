# staticmaps
A small, node.js library for creating map images with ~~lines and~~ markers.

## Installation

`` 
npm i staticmaps
``

## Getting Started

### Initialization ###
```javascript
var StaticMaps = require('staticmaps');
var options = {
  width: 600,
  height: 400
};
var map = new StaticMaps(options);
```
#### Options
parameter           | description
------------------- | -------------
width               | width of the image in pixels
height              | height of the image in pixels
padding_x           | (optional) minimum distance in pixel between map features and map border
padding_y           | (optional) minimum distance in pixel between map features and map border
url_template        | (optional) the tile server URL for the map base layer, e.g. <code>http://a.tile.osm.org/{z}/{x}/{y}.png</code>
tile_size           | (optional) tile size in pixel, usually 256
tile_request_timeout| (optional) timeout for the tiles request

## Usage

### Simple map w/ zoom and center
```
var zoom = 13;
var center = [13.437524,52.4945528];

map.render(zoom, center)
  .then(function(values) {
    var save = map.image.save( 'center.png', function (){
      console.log("Map saved!")  
    });  
   })
   .catch(function(err) { console.log(err); });
      console.log("Something went wrong!");   
   });
```
