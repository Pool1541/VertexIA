import { TRANSLATED_RESULTS } from './constants.js';

export async function labelDetection({ client, imagePath }) {
  try {
    const [results] = await client.labelDetection(imagePath);
    const labels = results.labelAnnotations;

    return labels.map(({ description, score }) => ({
      description,
      score: Number(score.toFixed(5)),
    }));
  } catch (error) {
    throw error;
  }
}

export async function safeSearch({ client, imagePath }) {
  try {
    const [results] = await client.safeSearchDetection(imagePath);
    const detections = results.safeSearchAnnotation;

    return {
      humor: TRANSLATED_RESULTS[detections.spoof] || detections.spoof,
      sexual: TRANSLATED_RESULTS[detections.adult] || detections.adult,
      medico: TRANSLATED_RESULTS[detections.medical] || detections.medical,
      atrevido: TRANSLATED_RESULTS[detections.racy] || detections.racy,
      violento: TRANSLATED_RESULTS[detections.violence] || detections.violence,
    };
  } catch (error) {
    throw error;
  }
}
