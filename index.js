const vision = require('@google-cloud/vision');

const TRANSLATED_RESULTS = {
  VERY_UNLIKELY: 'MUY IMPROBABLE',
  UNLIKELY: 'IMPROBABLE',
  VERY_LIKELY: 'MUY PROBABLE',
  LIKELY: 'PROBABLE',
};

async function analyzeImage(image) {
  try {
    const cliente = new vision.ImageAnnotatorClient({
      keyFilename: 'google-cloud-key.json',
    });

    // const [result] = await cliente.labelDetection(image);
    const [results] = await cliente.safeSearchDetection(image);
    const detections = results.safeSearchAnnotation;

    return {
      humor: TRANSLATED_RESULTS[detections.spoof] || detections.spoof,
      sexual: TRANSLATED_RESULTS[detections.adult] || detections.adult,
      medico: TRANSLATED_RESULTS[detections.medical] || detections.medical,
      atrevido: TRANSLATED_RESULTS[detections.racy] || detections.racy,
      violento: TRANSLATED_RESULTS[detections.violence] || detections.violence,
    };
  } catch (error) {
    throw error; // Re-lanzamos el error para que se maneje en el código que llama a esta función
  }
}

// Uso de la función con .then() y .catch()
analyzeImage('./images/wound.jpg')
  .then(console.log)
  .catch((error) => console.error('Error al analizar la imagen:', error));
