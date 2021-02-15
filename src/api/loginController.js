
import User from '../models/user'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/config'
import { getValue } from '../config/RedisConfig'
class loginController {
    constructor() {
    }
    async login(ctx) {
        //接收用户数据
        //验证图片验证码的失效性 正确性
        //验证用户名账号密码是否正确

        const { body } = ctx.request
        let sid = body.sid
        let code = body.code
        let redisData = ''
        let findResult = {};
        await getValue(sid).then((res) => {
            redisData = res
        })
        if (redisData === code) {
            await User.findOne({ where: { number: body.username } }).then(user => {
                //console.log(user);
                findResult = user.dataValues
            })
            if (findResult !== []) { //查询到有此用户
                if (body.password === findResult.password){
                    let token = jsonwebtoken.sign({ _id: 'bobo', exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, config.JWT_SECRET);
                    ctx.body = {
                        code: 200,
                        token: token,
                        data:findResult
                    }
                }
                else{
                    ctx.body = {
                        code: 401,
                        msg: '用户名或密码错误，请重新输入'
                    }
                }
            } //无此用户n
            else {
                ctx.body = {
                    code: 401,
                    msg: '用户名或密码错误，请重新输入'
                }
            }
        }
        else {
            ctx.body = {
                code: 401,
                msg: '图片验证码错误,请检查'
            }
        }

    }
}

export default new loginController()
