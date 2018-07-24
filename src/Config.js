const filesystem = require("fs");

let config_file = filesystem.readFileSync("./config.json", "utf8");
let config = JSON.parse(config_file);


function getKeyValue(key) {
	if (config[key]) return config[key];
	else return false;
}


module.exports = {
	getKeyValue: getKeyValue
};