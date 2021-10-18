<template>
  <div ref="map" class="map" :style="`width: 100%; height: ${height}`">
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { transform } from 'ol/proj';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import {
  Style, Fill, Stroke, Circle,
} from 'ol/style';

import 'ol/ol.css';
import 'ol-popup/src/ol-popup.css';

export default {
  name: 'Map',
  data() {
    return {
      availableMarkerColors: {
        red: [250, 17, 17, 1],
        orange: [214, 168, 6, 1],
        white: [255, 255, 255, 1],
        gray: [115, 110, 110, 1],
      },
    };
  },
  props: {
    height: {
      type: String,
      default: '800px',
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const self = this;
      const centerParams = {
        zoom: this.$route.params.zoom,
      };

      if (this.$route.params.x && this.$route.params.y) {
        centerParams.coordinate = [this.$route.params.x, this.$route.params.y];
      }
      const map = new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          zoom: centerParams.zoom ? centerParams.zoom : 12, // as default,
          center: (transform(centerParams.coordinate || [39.70732721786235, 47.23260132167479], 'EPSG:4326', 'EPSG:3857')),
        }),
      });

      map.on('singleclick', (evt) => {
        self.$emit('click', evt.coordinate);
        this.createMarkers(map, [{ location: evt.coordinate }]);
      });

      let statements = null;
      if (this.$route.params.id) {
        statements = [this.$store.getters.getStatementById(this.$route.params.id)]; // TODO change find method to filter in store
      } else {
        statements = this.$store.getters.getStatements;
      }

      this.createMarkers(map, statements);

      // this.map = { ...this.map, ...map };
    },
    createMarkers(map, statements) {
      statements.forEach((statement) => {
        if (!statement.location || statement.location.length === 0) return; // prevent errors
        const f = new Feature({ geometry: new Point(statement.location) });
        if (statement.priority) this.setMarkerStyle(f, statement.priority);
        const v = new Vector({ source: new VectorSource({ features: [f] }) });
        map.addLayer(v);
      });
    },
    setMarkerStyle(f, priority) {
      const fill = new Fill({
        color: this.availableMarkerColors[priority.value] || this.availableMarkerColors.white,
      });

      const stroke = new Stroke({
        color: this.availableMarkerColors.white,
      });

      f.setStyle(new Style({
        image: new Circle({
          fill,
          stroke,
          radius: 10,
        }),
        fill,
        stroke,
      }));
    },
  },
};
</script>

<style scoped>

</style>
