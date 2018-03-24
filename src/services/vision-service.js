import * as fs from 'mz/fs'
import * as vision from '@google-cloud/vision'
import * as NodeWebcam from 'node-webcam'

const webcamOpts = {
  // Picture related
  width: 1280,
  height: 720,
  quality: 100,
  // Delay to take shot
  delay: 1,
  // Save shots in memory
  saveShots: true,
  // [jpeg, png] support varies
  // Webcam.OutputTypes
  output: 'jpeg',
  // Which camera to use
  // Use Webcam.list() for results
  // false for default device
  device: false,
  // [location, buffer, base64]
  // Webcam.CallbackReturnTypes
  callbackReturn: 'buffer',
  // Logging
  verbose: true
}

const webcam = NodeWebcam.create(webcamOpts)

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

function takePhoto() {
  return new Promise((resolve, reject) => {
    webcam.capture('/tmp/test_picture.jpg', (err, data) => {
      if (err) reject(err)
      console.log(data)
      resolve(data)
    })
  })
}

async function getObjectFromVision() {
  const fileContent = await fs.readFile('./sample/bottle.jpg')
  const results = await client.labelDetection(fileContent)
  const labels = results[0].labelAnnotations
  const labelNames = labels.map(label => label.description)
  console.log(labelNames)
  for (let obj of objectList) {
    const { key, tags } = obj
    console.log(tags)
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
  async takePhoto() {
    return takePhoto()
  }

  async getObjectList() {
    const prediction = await getObjectFromVision()
    return {
      prediction
    }
  }
}
