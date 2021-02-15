import redis from 'redis'
const { promisify } = require('util')
const options = { //redis相关配置
  host: '127.0.0.1',
  port: 6379,
  detected_buffer: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
}
const client = redis.createClient(options) //生成redis服务器

const setValue = (key, value) => { 
  if (typeof value === 'undefined' || value === null || value === '')
    return
  if (typeof value === 'string') {
    // if (typeof time !== 'undefined') {
    //   client.set(key, value, time)
    // }
    // else
      return client.set(key,value)
  }
  else if (typeof value === 'object') {
    Object.keys(value).forEach((item) => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}

const getValue = (key) => {
  return promisify(client.get).bind(client)(key)
}
const getHValue = (key) => {
  return promisify(client.hgetall).bind(client)(key)
} 
export { client, getValue, setValue, getHValue }
