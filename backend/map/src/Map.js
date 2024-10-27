import React, { useEffect, useState } from 'react';
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
  const [points, setPoints] = useState([
    turf.point([121.5654, 25.0330], { value: 10 }),
    turf.point([121.5680, 25.0350], { value: 20 }),
    turf.point([121.5700, 25.0370], { value: 30 }),
    turf.point([121.5750, 25.0370], { value: 60 }),
    turf.point([121.577430, 24.9878632], { value: 0 }),
  ]);

  const InterpolatedLayer = () => {
    const map = useMap();

    map.on('click', handleMapClick);

    useEffect(() => {

      // Clear previous interpolated layer
      document.querySelectorAll('.interpolated-layer').forEach((layer) => {
        layer.remove();
      });

      // 使用 IDW (Inverse Distance Weighting) 進行空間內插法
      const grid = turf.interpolate(turf.featureCollection(points), 1, {
        gridType: 'hex',
        property: 'value',
        units: 'kilometers',
      });

      L.geoJson(grid, {
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.value !== undefined) {
            layer.bindPopup(feature.properties.value.toFixed(3).toString());
          }
        },
        style: function (feature) {
          return {
            color: getColor(feature.properties.value),
            opacity: 1,
            className: 'interpolated-layer'
          };
        }
      }).addTo(map);
    }, [map, points]);

    return null;
  };

  const handleMapClick = (e) => {
      console.log(e);
      const newPoint = turf.point([e.latlng.lng, e.latlng.lat], { value: Math.floor(Math.random() * 50) });
      setPoints((prevPoints) => [...prevPoints, newPoint]);
  };

  return (
    <MapContainer center={[25.0330, 121.5654]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <InterpolatedLayer />
      {/* 添加示例點的標記 */}
      {points.map((point, index) => (
        <Marker key={index} position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]} icon={L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: ${getColor(point.properties.value)}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`
        })}>
          <Popup>點 {index + 1}: 值 = {point.properties.value}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );

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
  }
};

export default Map;
