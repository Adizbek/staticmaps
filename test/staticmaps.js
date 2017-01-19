var should = require('should');
var StaticMaps = require('../lib/staticmaps');

var markerPath = __dirname + '/marker.png';


describe('StaticMap', function(){
  var geocoder;

  describe('Initializing ...', function() {

    it('without any arguments', function() {

      (function() {

        var options = {
          width: 600,
          height: 200
        };
        map = new StaticMaps(options);

      }).should.not.throw();
    });

  });


  describe('Rendering ...', function() {

    it('render w/ center', function(done) {

      this.timeout(3000);

      var options = {
        width: 600,
        height: 200
      };

      map = new StaticMaps(options);
      map.render(13, [13.437524,52.4945528])
        .then(function(values) {
          var save = map.image.save( 'sample/01-center.png', function (){
            done();
          });
        })
        .catch(function(err) { console.log(err); });

    });

    it('render w/ center from custom', function(done) {

      this.timeout(3000);

      var options = {
        width: 600,
        height: 200,
        url_template: "https://osm.luftlinie.org/retina/{z}/{x}/{y}.png",
        tile_size: 512
      };

      map = new StaticMaps(options);
      map.render(13, [13.437524,52.4945528])
        .then(function(values) {
          var save = map.image.save( 'sample/02-center_osm.png', function (){
            done();
          });
        })
        .catch(function(err) { console.log(err); });

    });

    it('render w/ bbox', function(done) {

      this.timeout(3000);

      var options = {
        width: 1200,
        height: 800
      };

      map = new StaticMaps(options);
      map.render(null, [11.414795,51.835778,11.645164,51.733833])
        .then(function(values) {
          var save = map.image.save('sample/03-bbox.png', function (){
            done();
          });
        })
        .catch(function(err) { console.log(err); });

    });

    it('render w/ icon', function(done) {

     this.timeout(3000);

      var options = {
        width: 500,
        height: 500,
        url_template: "https://osm.luftlinie.org/retina/{z}/{x}/{y}.png",   // this tiles server is not for public use!
        tile_size: 512
      };

      map = new StaticMaps(options);

      var marker = {
        filePath: markerPath,
        offset_x: 24,
        offset_y: 48,
        width: 48,
        height: 48
      };

      marker.coord = [13.437524,52.4945528];
      map.addMarker(marker);

      marker.coord = [13.430524,52.4995528];
      map.addMarker(marker);

      map.render(12, [13.437524,52.4945528])
        .then(function(values) {
          var save = map.image.save('sample/04-marker.png', function (){
            done();
          });
        })
        .catch(function(err) { console.log(err); });

    });

    it('render w/out center', function(done) {

     this.timeout(3000);

      var options = {
        width: 1200,
        height: 800
      };
      map = new StaticMaps(options);

      var marker = {
        filePath: markerPath,
        offset_x: 24,
        offset_y: 48,
        width: 48,
        height: 48
      };

      marker.coord = [13.437524,52.4945528];
      map.addMarker(marker);
      marker.coord = [13.430524,52.4995528];
      map.addMarker(marker);
      marker.coord = [13.410524,52.5195528];
      map.addMarker(marker);

      map.render()
        .then(function(values) {
          var save = map.image.save('sample/05-marker-nocenter.png', function (){
            done();
          });
        })
        .catch(function(err) { console.log(err); });

    });

  });

});
