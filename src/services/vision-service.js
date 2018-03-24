import * as vision from '@google-cloud/vision'

// Creates a client
const client = new vision.ImageAnnotatorClient()

const objectList = [
  {
    key: 'bottle',
    tags: ['bottle', 'water']
  },
  {
    key: 'mouse',
    tags: ['mouse']
  },
  {
    key: 'battery',
    tags: ['battery']
  },
  {
    key: 'electronic',
    tags: ['phone']
  }
]

async function getObjectFromVision(fileContent) {
  const results = await client.labelDetection(fileContent)
  const labels = results[0].labelAnnotations
  const labelNames = labels.map(label => label.description)
  console.log(results)
  for (let obj of objectList) {
    const { key, tags } = obj
    for (let tag of tags) {
      for (let label of labelNames) {
        console.log(label, tag, label.indexOf(tag))
        if (label.indexOf(tag) >= 0) {
          return key
        }
      }
    }
  }
  return null
}

export default class VisionService {
  async getObjectDetection(base64Image) {
    const buffer = Buffer.from(base64Image, 'base64')
    const prediction = await getObjectFromVision(buffer)
    return {
      prediction
    }
  }
}
