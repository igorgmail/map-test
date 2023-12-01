import { useEffect, useState, useRef, PropsWithChildren, FC, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';

import { ImageOverlay, LayersControl, MapContainer, Pane, TileLayer, Marker, useMap } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet';
import 'leaflet-rotatedmarker';
import L, { Popup } from 'leaflet';
import style from './style.module.css'
// import "./style.css";
import houseData from './houseData';
import { Box } from '@mui/material';
import CardModal from './CardModal';

const imgSizeStart = { width: 200, heigth: 118 }
const proportion = imgSizeStart.width / imgSizeStart.heigth

const imgSizeConfig = {
  maxWith: 200,
  minWith: 50,
  zoomStop: 12
}
type TImgSize = {
  width: number,
  heigth: number
}
const ImagesPane = () => {


  const [iconSize, setIconSize] = useState<TImgSize>(() => ({ width: imgSizeStart.width, heigth: Math.floor(imgSizeStart.width / proportion) }))
  const map = useMap()



  const getImageWidth = (zoom: number) => {

    const st = (imgSizeConfig.maxWith - imgSizeConfig.minWith) / ((18 - imgSizeConfig.zoomStop) / 0.5)
    const widthResult = imgSizeConfig.maxWith - ((18 - zoom) * 2 * st)

    const heigthResult = Math.floor(widthResult / proportion)
    return { width: Math.floor(widthResult), heigth: heigthResult }
  }

  // const markerHandler = () => {
  //   handleOpen()
  // }
  const ZoomListener = () => {
    useMapEvents({
      zoomend: () => {
        const zoom = map.getZoom()
        if (zoom > imgSizeConfig.zoomStop) {
          const getSize = getImageWidth(zoom)
          setIconSize((cur) => ({ ...cur, width: getSize.width, heigth: getSize.heigth }))
        }

      }
    });

    return null;
  };



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

    const customIcon = L.icon({
      iconUrl: './image/var_1.jpg',
      iconSize: [imgSize.width, imgSize.heigth], // размеры изображения
      className: style.image_var,
      iconAnchor: [55.725626, 37.569778]
    });

    return (
      <Marker position={[55.725626, 37.569778]} icon={customIcon}
        eventHandlers={{
          click: () => handleOpen()
        }}
      >
        <CardModal open={open} handleClose={handleClose} data={houseData[0]}></CardModal>
      </Marker>
    )
  }


  return (
    <Pane name='image-pane' style={{ zIndex: 500, width: '100vh' }}>
      <ZoomListener />
      {/* <ImageOverlay
      bounds={[[55.725626, 37.569778], [55.725517, 37.571963]]}
      url={'./image/var_1.jpg'}
      pane='image-pane'
      className='image_var'
    // scale={1}
    // onClick={handleClick}
    ></ImageOverlay> */}
      <ImageMarker imgSize={iconSize} key='marker'>
      </ImageMarker>


    </Pane>
  )
}



export default ImagesPane