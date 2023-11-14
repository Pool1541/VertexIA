import vision from '@google-cloud/vision';
import { imageProperties, labelDetection, textDetection } from './src/visionAPIMethods.js';

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'google-cloud-key.json',
});

textDetection({ client, imagePath: './images/traffic-signal.png' })
  .then(console.log)
  .catch((error) => console.error('Error al analizar la imagen:', error));
