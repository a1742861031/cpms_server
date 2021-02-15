const { Sequelize, DataTypes } = require('sequelize');
import  seque from '../config/db'
// user表

const User = seque.define("manager", {
    ID: {
        type: DataTypes.INTEGER,
    },
    number: {
        type: DataTypes.INTEGER,
    },
    password: {
        type: DataTypes.STRING,
    },
    power: {
        type: DataTypes.INTEGER,
    },
    Mg_State: {
        type: DataTypes.INTEGER,
    },
    Phone: {
        type: DataTypes.STRING,
    },
    Email: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,  // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    timestamps: false       //闭Sequelize的自动添加timestamp的功能
});
module.exports = User
