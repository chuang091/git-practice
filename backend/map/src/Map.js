import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';

// HACK: 解決 React-Leaflet 在使用 MarkerClusterGroup 時的圖示問題

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const Map = () => {
  const InterpolatedLayer = () => {
    const map = useMap();

    useEffect(() => {
      // 定義幾個示例點
      const points = turf.featureCollection([
      turf.point([121.5654, 25.0330], { value: 10 }),
      turf.point([121.5680, 25.0350], { value: 20 }),
      turf.point([121.5700, 25.0370], { value: 30 }),
      turf.point([121.5750, 25.0370], { value: 60 }),
      turf.point([121.577430,24.9878632], { value: 0 }),
      ]);

      // 使用 IDW (Inverse Distance Weighting) 進行空間內插法
      const grid = turf.interpolate(points, 0.1, {
      gridType: 'hex',
      property: 'value',
      units: 'kilometers',
      });
      console.log(grid);

      L.geoJson(grid, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.value !== undefined) {
        layer.bindPopup(feature.properties.value.toFixed(3).toString());
        }
      },
      style: function (feature) {
        return {
        "color": getColor(feature.properties.value),
        "opacity": 1,
        "className": "interpolated-layer"
        }
      }
      }).addTo(map);
      
      //色階
      function getColor(x) {
      return x < 5 ? '#bd0026' :
        x < 10 ? '#f03b20' :
        x < 15 ? '#fd8d3c' :
        x < 20 ? '#fecc5c' :
        x < 25 ? '#ffffb2' :
        x < 30 ? '#d4ee00' :
        x < 35 ? '#66c2a5' :
        x < 40 ? '#3288bd' :
        x < 45 ? '#5e4fa2' :
        '#7f3b08';
      };
    }, [map]);

    const iconUrl = 'assets/marker-icon.png';

    return null;
  };

  return (
    <MapContainer center={[25.0330, 121.5654]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <InterpolatedLayer />
      {/* 添加示例點的標記 */}
      <Marker position={[25.0330, 121.5654]}>
        <Popup>點 1: 值 = 10</Popup>
      </Marker>
      <Marker position={[25.0350, 121.5680]}>
        <Popup>點 2: 值 = 20</Popup>
      </Marker>
      <Marker position={[25.0370, 121.5700]}>
        <Popup>點 3: 值 = 30</Popup>
      </Marker>
      <Marker position={[25.0370, 121.5750]}>
        <Popup>點 4: 值 = 60</Popup>
      </Marker>
      <Marker position={[24.9878632,121.577430]}>
        <Popup>點 5: 值 = 0</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
