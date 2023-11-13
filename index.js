import vision from '@google-cloud/vision';
import { labelDetection } from './src/visionAPIMethods.js';

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'google-cloud-key.json',
});

labelDetection({ client, imagePath: './images/cat.jpg' })
  .then(console.log)
  .catch((error) => console.error('Error al analizar la imagen:', error));
