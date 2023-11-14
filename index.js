import vision from '@google-cloud/vision';
import { imageProperties, labelDetection, textDetection } from './src/visionAPIMethods.js';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs/promises';

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'google-cloud-key.json',
});

textDetection({ client, imagePath: './images/traffic-signal.png' })
  .then((res) => {
    const imagePath = './images/traffic-signal.png';

    // Carga la imagen
    loadImage(imagePath).then(async (image) => {
      // Crea un lienzo del mismo tamaño que la imagen
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');

      // Dibuja la imagen
      ctx.drawImage(image, 0, 0, image.width, image.height);

      res.forEach((object) => {
        const vertices = object.boundingPoly.vertices;

        // Dibuja el polígono
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (const vertex of vertices) {
          ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'red';
        ctx.stroke();
      });

      // Guarda la imagen con el polígono dibujado
      const buffer = canvas.toBuffer('image/png');
      await fs.writeFile('imagen_con_poligono.png', buffer);
    });
  })
  .catch((error) => console.error('Error al analizar la imagen:', error));
