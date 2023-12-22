import { useEffect, useState, useRef, PropsWithChildren, FC, useCallback, useLayoutEffect } from 'react';
// import { useLocation } from 'react-router-dom';

import { ImageOverlay, LayersControl, MapContainer, Pane, TileLayer, useMap } from 'react-leaflet'
import { Marker as LeafletMarker, } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import L, { Popup } from 'leaflet';
import 'leaflet-rotatedmarker';
import style from './style.module.css'
// import "./style.css";
import houseData from './houseData';
import { Box } from '@mui/material';
import CardModal from './CardModal';
import CustomImageOverlay from './CustomImageOverlay';

type TMarrkerIconProps = {
  imgSize: {
    width: number;
    heigth: number;
  };
  children?: never[];
}

const ImageMarker: FC<TMarrkerIconProps> = ({ imgSize }) => {
  console.log("Rennder ImageMarker");

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = () => setOpen(false);

  // const [open, setOpen] = useState(false);
  // const handleOpen = useCallback(() => setOpen(true), []);
  // const handleClose = () => setOpen(false);

  const customIcon = L.icon({
    iconUrl: './image/var_1.jpg',
    iconSize: [imgSize.width, imgSize.heigth], // размеры изображения
    className: style.image_var,
    iconAnchor: [55.725626, 37.569778]
  });

  return (
    <LeafletMarker position={[55.725626, 37.569778]} icon={customIcon}
      eventHandlers={{
        click: () => handleOpen()
      }}
    // rotationAngle={90}
    // rotationOrigin={'center'}
    >
      <CardModal open={open} handleClose={handleClose} data={houseData[0]}></CardModal>
    </LeafletMarker>
  )
}

export default ImageMarker;