<template>
  <div ref="map" class="map" :style="`width: 100%; height: ${height}`"></div>
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
import Popup from 'ol-popup';

import {
  Style, Fill, Stroke, Circle,
} from 'ol/style';
import 'ol/ol.css';
import 'ol-popup/src/ol-popup.css';

export default {
  name: 'Map',
  props: {
    statements: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: '800px',
    },
    singleMarker: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      availableMarkerColors: {
        red: [250, 17, 17, 1],
        orange: [214, 168, 6, 1],
        white: [255, 255, 255, 1],
        gray: [115, 110, 110, 1],
      },
      defaultCenterParams: {
        coordinate: [39.70732721786235, 47.23260132167479],
        zoom: 12,
      },
      markerLayers: {},
    };
  },
  mounted() {
    setImmediate(() => { // is not better way
      this.initMap();
    });
  },
  methods: {
    initMap() {
      const self = this;
      const popup = new Popup();

      const map = new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          zoom: this.defaultCenterParams.zoom,
          center: (transform(this.defaultCenterParams.coordinate, 'EPSG:4326', 'EPSG:3857')),
        }),
      });

      map.addOverlay(popup);

      if (this.singleMarker) {
        map.on('singleclick', (evt) => {
          this.clearMarkers(map);
          self.$emit('click', evt.coordinate);
          this.createMarkers(map, [{ location: evt.coordinate }]);
        });
      } else {
        map.on('pointermove', (evt) => {
          map.forEachFeatureAtPixel(evt.pixel, (f) => {
            popup.show(evt.coordinate, this.getOverlayContainer(f));
            return true;
          });
        });

        map.on('moveend', () => { // TODO save position after page reload
          const center = transform(map.getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
          this.$router.replace({ name: 'map-view', params: { x: center[0], y: center[1], zoom: map.getView().getZoom() } });
        });
      }

      this.createMarkers(map, this.statements);
    },
    createMarkers(map, statements) {
      const layers = {};
      statements.forEach((statement) => {
        if (!statement.location || statement.location.length === 0) return; // prevent errors
        const f = new Feature({ geometry: new Point(statement.location) });
        f.statement = statement; // i think is not better way
        if (statement.priority) this.setMarkerStyle(f, statement.priority);
        const v = new Vector({ source: new VectorSource({ features: [f] }) });
        layers[v.ol_uid] = v;
        map.addLayer(v);
      });
      this.markerLayers = { ...this.markerLayers, ...layers };
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
          radius: 5,
        }),
        fill,
        stroke,
      }));
    },
    clearMarkers(map) {
      Object.values(this.markerLayers).forEach((v) => map.removeLayer(v));
    },
    getOverlayContainer({ statement }) {
      return `<div style="feature_overlay_container">
                   <span>Адрес: ${statement.address}</span>
                   <span>Тип: ${statement.type && statement.type.text}</span>
                   <span>Приоритет: ${statement.priority && statement.priority.text}</span>
                </div>`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .feature_overlay_container {
    display: flex;
    flex-direction: column;
  }
</style>
