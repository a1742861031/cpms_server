import Router from 'koa-router'
import loginController from '../api/loginController'



const router = new Router({prefix:'/public'})
router.post('/login',loginController.login)

export default router
