import { useEffect, useState, useRef, useLayoutEffect, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';

import { Pane, ImageOverlay, useMap, useMapEvents } from 'react-leaflet'

import L, { } from 'leaflet';
import 'leaflet-rotatedmarker';


import CustomImageOverlay from './CustomImageOverlay';
import CardModal from './CardModal';

import houseData from './houseData';

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

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const [iconSize, setIconSize] = useState<TImgSize>(() => ({ width: imgSizeStart.width, heigth: Math.floor(imgSizeStart.width / proportion) }))
  const map = useMap()
  const imageOverlayRef = useRef<L.ImageOverlay | null>(null)


  const getImageWidth = (zoom: number) => {

    const st = (imgSizeConfig.maxWith - imgSizeConfig.minWith) / ((18 - imgSizeConfig.zoomStop) / 0.5)
    const widthResult = imgSizeConfig.maxWith - ((18 - zoom) * 2 * st)

    const heigthResult = Math.floor(widthResult / proportion)
    return { width: Math.floor(widthResult), heigth: heigthResult }
  }


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

  const imageRotate = () => {
    if (imageOverlayRef.current) {
      const imageElement = imageOverlayRef.current.getElement();
      if (imageElement) {
        // Теперь у вас есть HTML-элемент изображения, и вы можете выполнять с ним нужные действия
        // Например, поворот
        const originalTransformValue = imageElement.style.transform;
        // imageElement.style.transform = 'rotate(90deg)';
        imageElement.style.transform = `${originalTransformValue} rotateZ(${45}deg)`;
      }
    }
  };


  useEffect(() => {
    imageRotate()
  })
  useLayoutEffect(() => {
    imageRotate()
  })

  // const handleOpen = useCallback(() => setOpen(true), []);
  const handleOpen = () => {
    console.log("CLICk");

    setOpen(true)
  };


  return (
    <Pane name='image-pane' style={{ zIndex: 1500, width: '100vh' }}>
      {/* <ZoomListener /> */}
      <ImageOverlay
        // ref={imageOverlayRef
        interactive
        zIndex={2000}
        bounds={[[55.725626, 37.569778], [55.7265, 37.5729]]}
        url={'./image/var_1.jpg'}
        pane='image-pane'
        className='image_var'
        eventHandlers={{
          click: () => {
            console.log("ImageOverlay clicked!");
            handleOpen();
          },
          mouseup: () => {
            console.log("MOUSE UP");

          }
        }}
      >
        <CardModal open={open} handleClose={handleClose} data={houseData[0]}></CardModal>


      </ImageOverlay>
      <CustomImageOverlay />
      {/* <ImageMarker imgSize={iconSize} key='marker'>
      </ImageMarker> */}

    </Pane>
  )
}



export default ImagesPane