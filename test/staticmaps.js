import path from 'path';

import StaticMaps from '../dist/lib/staticmaps';

const { expect } = require('chai');

const markerPath = path.join(__dirname, 'marker.png');

describe('StaticMap', () => {
  describe('Initializing ...', () => {
    it('without any arguments', () => {
      expect(() => {
        const options = {
          width: 600,
          height: 200,
        };
        const map = new StaticMaps(options);
      }).to.not.throw();
    });
  });

  describe('Rendering ...', () => {
    it('render w/ center', (done) => {
      const options = {
        width: 600,
        height: 200,
      };
      const map = new StaticMaps(options);
      map.render([13.437524, 52.4945528], 13)
        .then(() => map.image.save('test/out/01-center.jpg'))
        .then(done)
        .catch(done);
    }).timeout(3000);

    it('render w/ center from custom', (done) => {
      const options = {
        width: 600,
        height: 200,
      };

      const map = new StaticMaps(options);
      map.render([13.437524, 52.4945528], 13)
        .then(() => map.image.save('test/out/02-center_osm.png'))
        .then(done)
        .catch(done);
    }).timeout(3000);

    it('render w/ bbox', (done) => {
      const options = {
        width: 1200,
        height: 800,
      };

      const map = new StaticMaps(options);
      map.render([11.414795, 51.835778, 11.645164, 51.733833])
        .then(() => map.image.save('test/out/03-bbox.png'))
        .then(done)
        .catch(done);
    }).timeout(3000);

    it('render w/ icon', (done) => {
      const options = {
        width: 500,
        height: 500,
      };

      const map = new StaticMaps(options);

      const marker = {
        img: markerPath,
        offsetX: 24,
        offsetY: 48,
        width: 48,
        height: 48,
      };

      marker.coord = [13.437524, 52.4945528];
      map.addMarker(marker);

      marker.coord = [13.430524, 52.4995528];
      map.addMarker(marker);

      map.render([13.437524, 52.4945528], 12)
        .then(() => map.image.save('test/out/04-marker.png'))
        .then(done)
        .catch(done);
    }).timeout(3000);

    it('render w/out center', (done) => {
      const options = {
        width: 1200,
        height: 800,
      };
      const map = new StaticMaps(options);
      const marker = {
        img: markerPath,
        offsetX: 24,
        offsetY: 48,
        width: 48,
        height: 48,
      };

      marker.coord = [13.437524, 52.4945528];
      map.addMarker(marker);
      marker.coord = [13.430524, 52.4995528];
      map.addMarker(marker);
      marker.coord = [13.410524, 52.5195528];
      map.addMarker(marker);

      map.render()
        .then(() => map.image.save('test/out/05-marker-nocenter.png'))
        .then(done)
        .catch(done);
    }).timeout(3000);
  });

  describe('Rendering w/ lines ...', () => {
    it('render w/ single line', (done) => {
      const options = {
        width: 600,
        height: 300,
        paddingX: 50,
        paddingY: 50,
      };

      const map = new StaticMaps(options);

      const line = {
        coords: [
          [13.399259, 52.482659],
          [13.387849, 52.477144],
          [13.40538, 52.510632],
        ],
        color: '#0000FFBB',
        width: 3,
      };

      map.addLine(line);
      map.render()
        .then(() => map.image.save('test/out/06-line.png'))
        .then(done)
        .catch(done);
    }).timeout(5000);
  });

  describe('Rendering buffer ...', () => {
    it('render w/ center', (done) => {
      const options = {
        width: 600,
        height: 200,
      };

      const map = new StaticMaps(options);
      map.render([13.437524, 52.4945528], 13)
        .then(() => map.image.buffer('image/png'))
        .then((buffer) => {
          done();
        })
        .catch(done);
    }).timeout(3000);
  });
});
