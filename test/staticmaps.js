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
          height: 400
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
        height: 400
      };

      map = new StaticMaps(options);
      map.render(13, [13.437524,52.4945528])
        .then(function(values) {
          var save = map.image.save( 'center.png');
          save.on('finish', function () {
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
          var save = map.image.save('bbox.png');
          save.on('finish', function () {
            done();
          });
        })
        .catch(function(err) { console.log(err); });

    });

    it('render w/ icon', function(done) {

     this.timeout(3000);

      var options = {
        width: 500,
        height: 500
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
          var save = map.image.save('marker.png');
          save.on('finish', function () {
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
          var save = map.image.save('marker-nocenter.png');
          save.on('finish', function () {
            done();
          });
        })
        .catch(function(err) { console.log(err); });

    });

  });

});
