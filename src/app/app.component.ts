import { Component } from '@angular/core';
import { GeoJSONSourceRaw } from 'mapbox-gl';
import { GeoJSONSourceOptions } from 'mapbox-gl';
import { EventData, GeoJSONSource, Map, MapMouseEvent, Marker } from "mapbox-gl";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // style = "mapbox://styles/malisalyn/cl3mr6ieb00ej14rzy8548yfz";
    style = "mapbox://styles/neolinkbpo/clgyqe58s00ga01pn92555ff4";
    centerMap: [number, number] = [0, 15];
    zoom: [number] = [0.5];
    pitch: [number] = [0];
    mapbox!: Map
    curZoom: number = 0;
    displayInfo = false;
    displayStatus = 'inbound'
    mapData: MapCountryData[] = [
        {
            countryname: "Thailand",
            countrycode: "TH",
            latitude: 15.870032000,
            longitude: 100.992541000,
            value: 10
        },
        {
            countryname: "China",
            countrycode: "CN",
            latitude: 35.861660000,
            longitude: 104.195397000,
            value: 20
        }
    ];
    mapPortData: MapPortData[] = [
        {
            portid: 5092,
            countryname: "Thailand",
            countrycode: "TH",
            portcode: "THBKK",
            portname: "Bangkok",
            latitude: 13.750000000,
            longitude: 100.516666670,
            value: 6,
            info: false
        },
        {
            portid: 173,
            countryname: "Thailand",
            countrycode: "TH",
            portcode: "THLCH",
            portname: "Laem cha bang",
            latitude: 13.083333330,
            longitude: 100.883333330,
            value: 2,
            info: false
        },
        {
            portid: 414,
            countryname: "China",
            countrycode: "CN",
            portcode: "CNARS",
            portname: "CNARS",
            latitude: 47.177440000,
            longitude: 119.943575000,
            value: 2,
            info: false
        },
        // {
        //     countryname: "China",
        //     countrycode: "CN",
        //     portcode: "CNCEK",
        //     portname: "CNCEK",
        //     latitude: 42.466666670,
        //     longitude: 101.150000000,
        //     value: 10,
        //     info: false
        // },
        // {
        //     countryname: "China",
        //     countrycode: "CN",
        //     portcode: "CNDMY",
        //     portname: "CNDMY",
        //     latitude: 25.183333330,
        //     longitude: 119.600000000,
        //     value: 8,
        //     info: false
        // }
    ]
    geometry!: GeoJSONSourceRaw;

    constructor() { }

    changeCountry(data: string) {
        if (data === 'TH') {
            this.mapbox.flyTo({
                center: [100.992541000, 15.870032000],
                zoom: 4
            })
        }
        if (data === 'CN') {
            this.mapbox.flyTo({
                center: [104.195397000, 35.861660000],
                zoom: 4
            })
        }
    }

    onLoad(mapInstance: Map) {
        mapInstance.resize();
        this.mapbox = mapInstance;
        // new Marker({
        //     color: "#FF4122",
        //     offset: [0, 1]
        // })
        //     .setLngLat([this.accountProfile.longtitude, this.accountProfile.latitude])
        //     .addTo(mapInstance);
        // mapInstance.setCenter([this.accountProfile.longtitude, this.accountProfile.latitude]);
    }

    onZoom() {
        this.curZoom = this.mapbox.getZoom()
        if (this.curZoom <= 3 && this.mapbox.getLayer('route')) {
            this.mapbox.removeLayer('route')
            this.mapbox.removeSource('route')
        }
    }

    alert(data: string) {
        console.log(data)
    }

    createLine(index: number) {
        this.geometry = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [100.88333333, 13.08333333],
                                [101.7598881513508, 13.728283866474413],
                                [102.6412655252493, 14.370125871116992],
                                [103.52770362705255, 15.008689547190327],
                                [104.4194407709783, 15.643802377683901],
                                [105.31671528228011, 16.27528900987],
                                [106.21976534855422, 16.902971142613545],
                                [107.12882884872596, 17.526667416885708],
                                [108.04414315822088, 18.14619330997942],
                                [108.96594492878643, 18.761361033976222],
                                [109.8944698414004, 19.371979439068088],
                                [110.8299523306797, 19.97785392239426],
                                [111.77262527919285, 20.578786343112885],
                                [112.72271968008059, 21.17457494448832],
                                [113.6804642664084, 21.76501428383894],
                                [114.64608510570865, 22.349895171255234],
                                [115.61980515822752, 22.929004618064607],
                                [116.60184379747226, 23.502125796085927],
                                [117.59241629176063, 24.069038008784112],
                                [118.59173324561338, 24.6295166755006],
                                [119.6, 25.18333333]
                            ]
                        }
                    }
                ]
            }
        };
        if (!this.mapbox.getLayer('route')) {
            this.mapbox.addLayer({
                id: 'route',
                type: 'line',
                source: this.geometry,
                layout: {
                    "line-join": 'round',
                    "line-cap": 'round'
                },
                paint: {
                    "line-color": '#f59e0b',
                    "line-width": 2
                }
            })
        }
        if (this.mapPortData[index]) {
            this.mapPortData[index].info = !this.mapPortData[index].info
        }
    }
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