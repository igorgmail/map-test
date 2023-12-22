import L from 'leaflet';

const imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
const imageBounds = [[55.725626, 37.569778], [55.7265, 37.5729]];

// Проверяем, определен ли map и является ли экземпляром L.Map

// const imageRotate = () => {
//   if (imageOverlayRef.current) {
//     const imageElement = imageOverlayRef.current.getElement();
//     if (imageElement) {
//       // Теперь у вас есть HTML-элемент изображения, и вы можете выполнять с ним нужные действия
//       // Например, поворот
//       const originalTransformValue = imageElement.style.transform;
//       console.log("▶ ⇛ originalTransformValue:", originalTransformValue);
//       // imageElement.style.transform = 'rotate(90deg)';
//       imageElement.style.transform = `${originalTransformValue} rotateZ(${45}deg)`;
//     }
//   }
// };
let imageElement;
const createImage = () => {

  const imageOverlayRef = L.imageOverlay(imageUrl, imageBounds).addTo(window.map);
  console.log("▶ ⇛ createImage:");

  imageElement = imageOverlayRef.getElement();
  const originalTransformValue = imageElement.style.transform;
  console.log("▶ ⇛ originalTransformValue:", originalTransformValue);
  imageElement.style.transform = `${originalTransformValue} rotateZ(${45}deg)`
  return imageElement
}


const addListenerToMap = () => {
  let map = window.map
  map.on('move', () => {
    // console.log("MOVE");
    handleRotateImage(imageElement)
  });
}

const handleRotateImage = (imageElement) => {
  const originalTransformValue = imageElement.style.transform;
  if (originalTransformValue && /rotateZ\([^)]*\)/.test(originalTransformValue)) {
    console.log("Свойство transform содержит стиль rotateZ");
  } else {
    console.log("Свойство transform не содержит стиль rotateZ");
    imageElement.style.transform = `${originalTransformValue} rotateZ(${45}deg)`;
  }

}


const addImage = () => {
  if (window.map instanceof L.Map) {
    const imageElement = createImage()
    handleRotateImage(imageElement)
    // const originalTransformValue = imageElement.style.transform;
    // imageElement.style.transform = `${originalTransformValue} rotateZ(${45}deg)`;
  } else {
    console.error('Карта не определена или не является экземпляром L.Map');
  }
}

export { addImage, addListenerToMap }