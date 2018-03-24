import * as fs from 'mz/fs'
import * as vision from '@google-cloud/vision'

// Creates a client
const client = new vision.ImageAnnotatorClient()

async function getObjectFromVision() {
  const fileContent = await fs.readFile('./sample/bottle.jpg')
  const results = await client.labelDetection(fileContent)
  const labels = results[0].labelAnnotations

  console.log(labels)

  console.log('Labels:')
  labels.forEach(label => console.log(label.description))

  return results
}

export default class VisionService {
  async getObjectList() {
    return getObjectFromVision()
  }
}
