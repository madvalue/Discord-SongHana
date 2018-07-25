const Config = require("./src/Config.js");
const Commands = require("./src/Commands.js");
const Discord = require("./src/Discord.js");
const Logs = require("./src/Logs.js");


// Komendy podstawowe
Commands.registerCommand("about", "Wyświetla informacje na temat bota", require("./src/Commands/Misc.js").About);
Commands.registerCommand("help", "Wysyła listę komend w wiadomości bezpośredniej", require("./src/Commands/Misc.js").Help);
Commands.registerCommand("avatar", "Wyświetla awatar oznaczonego użytkownika", require("./src/Commands/Misc.js").Avatar);
Commands.registerCommand("kawa", "Parzenie kawy", require("./src/Commands/Misc.js").Coffee);
Commands.registerCommand("kot", "Wysyła losowe zdjęcie kota", require("./src/Commands/Misc.js").Cat);
Commands.registerCommand("pies", "Wysyła losowe zdjęcie psa", require("./src/Commands/Misc.js").Dog);

// Komendy administracyjne
Commands.registerCommand("kick", require("./src/Commands/Administration.js").kickMember);
Commands.registerCommand("warn", require("./src/Commands/Administration.js").warnMember);

// Gry i zabawy
Commands.registerCommand("moneta", "Wykonuje rzut monetą", require("./src/Commands/Games.js").FlipCoin);
Commands.registerCommand("fortnite", "Wyświetla statystyki Fortnite Battle Royale", require("./src/Commands/Games.js").Fortnite);
Commands.registerCommand("csgo", "Wyświetla statystyki Counter-Strike: Global Offensive", require("./src/Commands/Games.js").CounterStrike);
Commands.registerCommand("rocketleague", "Wyświetla statystyki Rocket League", require("./src/Commands/Games.js").RocketLeague);


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
