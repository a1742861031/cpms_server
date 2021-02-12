import svgCaptcha from 'svg-captcha'

class publicController {
  constructor() {}
  async getCaptcha(ctx) { //获取验证码方法
    const newCaptcha = svgCaptcha.create({})
    ctx.body = {
      code:200,
      data: newCaptcha.data,
    }
  }
}

export default new publicController()
