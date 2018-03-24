import { createController } from 'awilix-koa'

const api = visionService => ({
  getCameraImage: async ctx => ctx.ok(await visionService.takePhoto()),
  getObjectList: async ctx => ctx.ok(await visionService.getObjectList())
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('')
  .get('/camera', 'getCameraImage')
  .get('/identify', 'getObjectList')
