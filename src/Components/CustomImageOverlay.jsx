import React, { useEffect, useRef } from 'react';
import L, { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import 'leaflet';
// import 'leaflet-distortableimage'
import './Custom.js'



// interface CustomImageOverlayProps {
//   bounds: LatLngBoundsExpression;
//   url: string;
//   rotation?: number;
// }

const CustomImageOverlay = () => {


  // map.whenReady(function () {
  //   // By default, 'img' will be placed centered on the map view specified above
  //   L.distortableImageOverlay('example.jpg', { actions: [L.OpacityAction, L.DeleteAction, L.RestoreAction] }).addTo(map);
  // });

  // let map;

  // (() => {
  //   let map = L.map('map').setView([51.505, -0.09], 13);
  //   map.addGoogleMutant();

  //   map.whenReady(() => {
  //     let img = L.distortableImageOverlay('example.jpg', {
  //       selected: true,
  //       fullResolutionSrc: 'large.jpg',
  //     }).addTo(map);
  //   });
  // })();

  // L.Control.geocoder().addTo(map);



  return (
    <>
      {/* <img ref={imgRef} src={url} alt="Custom Overlay" style={{ display: 'none' }} /> */}
      {/* <div ref={mapRef} style={{ height: '100vh' }} /> */}
    </>
  );
};

export default CustomImageOverlay;
