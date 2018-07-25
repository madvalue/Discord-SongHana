const Config = require("./Config.js");

let commands = [];

function registerCommand(command, description, callback) {
	commands[commands.length] = {
		command: command,
		description: (callback ? description : "Brak opisu"),
		callback: (callback ? callback : description)
	};
}

async function getCommandsList() {
	return commands;
}

function searchForCommands(message) {
	if (message.content.startsWith(Config.getKeyValue("prefix"))) { // Jest to komenda
		for (let i = 0; i < commands.length; i++) {
			if (message.content.startsWith(Config.getKeyValue("prefix") + commands[i].command)) {
				let content = message.content.replace(Config.getKeyValue("prefix"), "");
				let args = content.split(" ");
				if (args[0] === commands[i].command) {
					commands[i].callback(message, args);
					break;
				}
			}
		}
	}
}


module.exports = {
	registerCommand: registerCommand,
	searchForCommands: searchForCommands,
	getCommandsList: getCommandsList
};
