import { useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
import { ZoomControl } from 'react-leaflet'
import { ImageOverlay, LayersControl, MapContainer, Pane, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet-rotatedmarker';
import L, { Popup } from 'leaflet';
// import style from './style.module.css'
import "./style.css";

import { Box } from '@mui/material';
import ImagesPane from './ImagesPane';
// import { addImage, addListenerToMap } from './Custom';

const mapCenter: L.LatLngTuple = [55.726390, 37.575343]
const poVar_1: L.LatLngTuple = [55.725570, 37.570211]
const poVar_2: L.LatLngTuple = [55.719871, 37.576459]
interface CustomWindow extends Window {
  map?: L.Map | null;
}

function MapMain() {


  const mapRef = useRef<L.Map | null>(null)

  // const handleMap = async () => {
  //   setTimeout(() => {
  //     console.log("▶ ⇛ mapRef.current:", mapRef.current);
  //     (window as CustomWindow).map = mapRef.current;
  //     addImage()
  //     addListenerToMap()
  //   })


  //   // (window as CustomWindow).map = mapRef.current
  // }


  useEffect(() => {
    // Получаем доступ к объекту карты и передаем его в глобальный объект window
    // console.log("▶ ⇛ mapRef.current:", mapRef.current);
    if (mapRef.current) {
      (window as CustomWindow).map = mapRef.current;
    }
  }, [mapRef.current]);


  return (
    <MapContainer
      center={poVar_1}
      ref={mapRef}

      whenReady={() => {
        // Присваиваем созданный объект карты к mapRef
        // handleMap()

      }}


      zoom={17}
      zoomDelta={0.5}
      zoomSnap={0.5}
      // scrollWheelZoom={true}
      style={{ width: '100%', height: '100%' }}>

      {/* <ZoomControl
        eventHandlers={{
          click: () => {
            console.log('marker clicked')
          },

        }}
      ></ZoomControl> */}

      <LayersControl position="topright">
        <LayersControl.Overlay name="Google map" checked>
          <TileLayer
            id={'tileId-2'}
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          />

        </LayersControl.Overlay>
        <LayersControl.Overlay name="Osm map">
          <TileLayer
            id={'tileId-1'}
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

        </LayersControl.Overlay>
        <LayersControl.Overlay name="Yandex map">
          <TileLayer
            id={'tileId-3'}
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://vec{s}.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU'"
          // subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          />

        </LayersControl.Overlay>
      </LayersControl>

      <ImagesPane></ImagesPane>

      {/* <ImageOverlay
          bounds={[[55.725626, 37.569778], [55.725517, 37.571963]]}
          url={'./image/var_1.jpg'}
          pane='image-pane'
          className='image_var'
        // style={{with: '100px'}}
        // onClick={handleClick}
      ></ImageOverlay> */}

    </MapContainer >
  )

}

export default MapMain;

