import Koa from 'koa'
import logger from 'koa-logger'
import parser from './src'
import { File } from 'formidable'

const port = 3000
const app = new Koa()

app.use(logger())

app.use(
  parser({
    error (err, ctx): void {
      console.log(err)
      ctx.throw('custom parse error', 422)
    }
  })
)

app.use(
  async (ctx: Koa.Context, next): Promise<void> => {
    if (ctx.request.body !== undefined) {
      if (ctx.request.body.file) {
        const file: File = ctx.request.body.file
        console.log(file)
        console.log(file.toJSON())
        console.log(file.lastModifiedDate)
      }
      ctx.body = ctx.request.body
    }
    await next()
  }
)

app.listen(port)
console.error(`listening on port ${port}`)
