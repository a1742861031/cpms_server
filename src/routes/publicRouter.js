import Router from 'koa-router'
import publicController from '../api/publicController'
const router = new Router({prefix:'/public'})

router.get('/getcaptcha', publicController.getCaptcha)
export default router
