import vision from '@google-cloud/vision';
import { imageProperties, labelDetection } from './src/visionAPIMethods.js';

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'google-cloud-key.json',
});

imageProperties({ client, imagePath: './images/car_crash.jpg' })
  .then(console.log)
  .catch((error) => console.error('Error al analizar la imagen:', error));
