import svgCaptcha from 'svg-captcha'
import {getHValue, getValue,setValue} from '../config/RedisConfig'
class publicController {
  constructor() {}
  async getCaptcha(ctx) { //获取验证码方法
    const body = ctx.request.query;
    // console.log(body.sid);
    const newCaptcha = svgCaptcha.create({});
    // console.log(body.sid,newCaptcha.text);
    setValue(body.sid,newCaptcha.text); //设置图形验证码超时时间为10分钟
    // getValue(body.sid).then((res)=>{
    //   console.log(res);
    // })
    ctx.body = {
      code:200,
      data: newCaptcha.data,
    }
  }
}

export default new publicController()
