const Config = require("./src/Config.js");
const Commands = require("./src/Commands.js");
const Discord = require("./src/Discord.js");


// Komendy podstawowe
Commands.registerCommand("about", require("./src/Commands/Misc.js").About);
Commands.registerCommand("help", require("./src/Commands/Misc.js").Help);
Commands.registerCommand("avatar", require("./src/Commands/Misc.js").Avatar);

// Komendy administracyjne
Commands.registerCommand("kick", require("./src/Commands/Administration.js").kickMember);
Commands.registerCommand("warn", require("./src/Commands/Administration.js").warnMember);

// Gry i zabawy
Commands.registerCommand("moneta", require("./src/Commands/Games.js").FlipCoin);
Commands.registerCommand("fortnite", require("./src/Commands/Games.js").Fortnite);
Commands.registerCommand("csgo", require("./src/Commands/Games.js").CounterStrike);
Commands.registerCommand("rocketleague", require("./src/Commands/Games.js").RocketLeague);


// Eventy botowe
Discord.on("ready", function () {
	console.log("SongHana gotowa do działania");
	Discord.user.setActivity(Config.getKeyValue("activity")['name'], {
		url: Config.getKeyValue("activity")['url']
	});
});

Discord.on("message", function (message) {
	Commands.searchForCommands(message);
});


// Łączenie się bota z serwerem discorda
Discord.login(Config.getKeyValue("token"));
