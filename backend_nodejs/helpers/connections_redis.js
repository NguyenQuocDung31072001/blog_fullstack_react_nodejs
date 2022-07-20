const redis = require("redis");

let redisClient
;(async () => {
  redisClient = redis.createClient({
    port: 6379,
    host: "127.0.0.1",
  });

  redisClient.on("connect", (err) => {
    console.log("Redis to connected!");
  });
  redisClient.on("ready", (err) => {
    console.log("Redis to ready!");
  });
  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();

})();


module.exports = {redisClient};
