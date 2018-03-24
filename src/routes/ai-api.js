import { createController } from 'awilix-koa'

const api = visionService => ({
  getObjectList: async ctx => {
    const { image } = ctx.request.body
    ctx.ok(await visionService.getObjectDetection(image))
  }
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('')
  .post('/identify', 'getObjectList')
