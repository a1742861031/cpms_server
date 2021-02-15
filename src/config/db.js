//db.js
const Sequelize = require('sequelize')
const db = {
    database: 'cpms', // 使用哪个数据库
    username: 'root', // 用户名
    password: '123456', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
}
const seque = new Sequelize(db.database, db.username,db.password, {
    host: db.host,
    dialect: 'mysql',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    //解决中文输入问题
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        }
    }
})
// seque
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.')
//     })
//     .catch(err => {
//         console.log('Unable to connect to the database', err)
//     })
module.exports = seque