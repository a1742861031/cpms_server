import koa from 'koa'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'
import compress from 'koa-compress'
import JWT from 'koa-jwt'
import config from './config/config'
import errorHandle from './common/ErrorHandle'
const app = new koa()

const isDevMode = process.env.NODE_ENV === 'production' ? false : true
// 连接数据库
//定义公共路径
// app.use(jwt({ secret: 'shared-secret' }).unless({ path: [/^\/public/] }));
const jwt = JWT({ secret: config.JWT_SECRET }).unless({path: [/^\/public/]})
/**
 * 使用koa-compose 集成中间件 
 */
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
  errorHandle,
  jwt
])
if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(3000)
