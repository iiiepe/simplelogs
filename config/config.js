var config = {}

// Components enabled, do not change
config.components = ["logs-api", "sources-api", "users-api"];

// secret key, change it to encrypt your strings using this key
config.secretKey = "The monkey is on the tree";

// enable socket.io, do not disable unless you're having problems with it.
config.enableIO = true;

// mongodb configuration
config.mongodb = {
	hostname: process.env.MONGODB_PORT_27017_TCP_ADDR || "localhost",
	database: process.env.MONGODB_DATABASE || "simplelogs",
	port: process.env.MONGODB_PORT_27017_TCP_PORT || "27017"
}

config.mongodburi = "mongodb://" + config.mongodb.hostname + ":" + config.mongodb.port + "/" + config.mongodb.database;

config.port = process.env.PORT || "3000";

module.exports = config;
