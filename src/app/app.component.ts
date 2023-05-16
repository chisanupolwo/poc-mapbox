import { Component } from '@angular/core';
import { GeoJSONSourceRaw } from 'mapbox-gl';
import { GeoJSONSourceOptions } from 'mapbox-gl';
import {
  EventData,
  GeoJSONSource,
  Map,
  MapMouseEvent,
  Marker,
} from 'mapbox-gl';

import * as turf from '@turf/turf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // style = 'mapbox://styles/malisalyn/cl3mr6ieb00ej14rzy8548yfz';
  style = 'mapbox://styles/neolinkbpo/clgyqe58s00ga01pn92555ff4';
  centerMap: [number, number] = [0, 15];
  zoom: [number] = [0.5];
  pitch: [number] = [0];
  mapbox!: Map;
  curZoom: number = 0;
  displayInfo = false;
  displayStatus = 'inbound';
  mapData: MapCountryData[] = [
    {
      countryname: 'Thailand',
      countrycode: 'TH',
      latitude: 15.870032,
      longitude: 100.992541,
      value: 10,
    },
    {
      countryname: 'China',
      countrycode: 'CN',
      latitude: 35.86166,
      longitude: 104.195397,
      value: 20,
    },
  ];
  mapPortData: MapPortData[] = [
    {
      portid: 5092,
      countryname: 'Thailand',
      countrycode: 'TH',
      portcode: 'THBKK',
      portname: 'Bangkok',
      latitude: 13.75,
      longitude: 100.51666667,
      value: 6,
      info: false,
    },
    {
      portid: 173,
      countryname: 'Thailand',
      countrycode: 'TH',
      portcode: 'THLCH',
      portname: 'Laem cha bang',
      latitude: 13.08333333,
      longitude: 100.88333333,
      value: 2,
      info: false,
    },
    {
      portid: 414,
      countryname: 'China',
      countrycode: 'CN',
      portcode: 'CNARS',
      portname: 'CNARS',
      latitude: 47.17744,
      longitude: 119.943575,
      value: 2,
      info: false,
    },
  ];
  geometry!: GeoJSONSourceRaw;

  constructor() {

  }

  changeCountry(data: string) {
    if (data === 'TH') {
      this.mapbox.flyTo({
        center: [100.992541, 15.870032],
        zoom: 4,
      });
    }
    if (data === 'CN') {
      this.mapbox.flyTo({
        center: [104.195397, 35.86166],
        zoom: 4,
      });
    }
  }

  onLoad(mapInstance: Map) {
    mapInstance.resize();
    this.mapbox = mapInstance;
  }

  onZoom() {
    this.curZoom = this.mapbox.getZoom();
    // if (this.curZoom <= 3 && this.mapbox.getLayer('route')) {
    //   this.mapbox.removeLayer('route');
    //   this.mapbox.removeSource('route');
    // }
  }

  alert(data: string) {
    console.log(data);
  }

  createLine(index: number) {
    const line = generateLine(
      { latitude: 13.08333333, longitude: 100.51666667 },
      { latitude: 5.644453350470325, longitude: -0.15092017480154407 }
      // { latitude: 19.663799228607935, longitude: -155.99011187344598 }
    );

    // const start = [100.51666667, 13.08333333];
    // const end = [-0.15092017480154407, 5.644453350470325];
    // const distance = turf.distance(start, end);
    // const bearing = turf.rhumbBearing(start, end);
    // const points = [];

    // for (let i = 0; i <= distance; i += 100) {
    //   const point = turf.rhumbDestination(start, i, bearing, {
    //     units: 'kilometers',
    //   });
    //   points.push(point.geometry.coordinates);
    // }

    // const line = turf.lineString(points);

    this.geometry = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: line,
      },
    };

    console.log('final geojson => ', this.geometry);

    // if (!this.mapbox.getLayer('route')) {
      // this.mapbox.addLayer({
      //   id: 'route',
      //   type: 'line',
      //   source: this.geometry,
      //   layout: {
      //     'line-join': 'round',
      //     'line-cap': 'round',
      //   },
      //   paint: {
      //     'line-color': '#f59e0b',
      //     'line-width': 2,
      //   },
      // });

    // }

    // if (this.mapPortData[index]) {
    //   this.mapPortData[index].info = !this.mapPortData[index].info;
    // }




    // const middleValues = {
    //   1: line.geometry.coordinates[
    //     Math.floor(line.geometry.coordinates.length / 2) - 1
    //   ],
    //   2: line.geometry.coordinates[
    //     Math.floor(line.geometry.coordinates.length / 2)
    //   ],
    // };

    // normal : greatCircle, bearing
    // 3D : rhumbDestination, rhumbBearing

    // var bearing = turf.bearing(middleValues[1], middleValues[2]);
    // var rhumbBearing = turf.rhumbBearing(middleValues[1], middleValues[2]);

    // console.log('middleValues of this line --> ', middleValues);
    // console.log('bearing --> ', bearing);
    // console.log('rhumbBearing --> ', rhumbBearing);

    const addNew = [{
      id: '#gen or index', // icon-index-i
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [108.96594492878643, 18.761361033976222],
              },
            },
          ],
        },
        layout: {
          'icon-image': 'icon-route',
          'icon-size': 0.05,
          'icon-rotate': 55.01909022500917,
        },
      },
    }];

  }
}

const generateLine = (
  startPoint: Point,
  endPoint: Point
): turf.Feature<turf.LineString, any>[] => {
  const startCoord = [startPoint.longitude, startPoint.latitude];
  const endCoord = [endPoint.longitude, endPoint.latitude];
  const greatCircle = turf.greatCircle(startCoord, endCoord);

  // If great circle crosses antimeridian, wrap the coordinates
  const wrappedCoords = greatCircle.geometry.coordinates.map((coord: any) => {
    const lon = coord[0];
    if (lon < -180 || lon > 180) {
      coord[0] = lon > 0 ? lon - 360 : lon + 360;
    }
    return coord;
  });

  const line: turf.Feature<turf.LineString, any>[] = [
    turf.lineString(wrappedCoords),
  ];
  return line;
};

interface Point {
  longitude: number;
  latitude: number;
}

interface MapCountryData {
  countryname: string;
  countrycode: string;
  latitude: number;
  longitude: number;
  value: number;
}

interface MapPortData {
  countryname: string;
  countrycode: string;
  portid: number;
  portcode: string;
  portname: string;
  latitude: number;
  longitude: number;
  value: number;
  info: boolean;
}
