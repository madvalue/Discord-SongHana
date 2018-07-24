const Discord = require("./../Discord.js");
const Config = require("./../Config.js");


module.exports = {
	About: About,
	Help: Help,
	Avatar: Avatar
};


function About(message, args) {
	message.channel.send("", {
		embed: {
			//title: "O mnie",
			description: "Cześć " + message.author + "! Jestem wielozadaniowym botem discordowym, który ma za zadanie umilić Ci czas spędzony w naszej wspaniałej społeczności! Moim stwórcą jest madvalue#0711 który cały czas się mną opiekuje i rozbudowuje o kolejne funkcje! Jeśli masz pomysł na nową opcję możesz śmiało do niego pisać na discordzie #freetalk lub poprzez DM, poniżej zostawiam kilka przydatnych informacji 😄",
			color: 16738814,
			thumbnail: {
				url: Discord.user.avatarURL
			},
			author: {
		    	name: Discord.user.username,
		      	icon_url: Discord.user.avatarURL
		    },
		    fields: [
		    	{
		    		name: "Przydatne odnośniki",
		    		value: "[Strona value](http://madvalue.nazwa.pl), [Discord #freetalk](https://discord.gg/WxvR874), [Dobrowolna dotacja (hehe)](https://www.paypal.me/madvalue)",
		    		inline: false
		    	},
		    ]
		}
	});
}

function Help(message, args) {
	let prefix = Config.getKeyValue("prefix");

	message.reply("lista komend została wysłana w prywatnej wiadomości :wink:");
	message.author.send("Hej, podsyłam Ci tę listę komend o które prosiłeś/aś :wink:", {
		embed: {
			color: 16738814,
			fields: [
				{
					name: "Podstawowe",
					value: `**${prefix}help** | Wyświetla spis dostępnych komend\n**${prefix}about** | Wyświetla informacje o bocie\n**${prefix}avatar** | Wyświetla awatar oznaczonego użytkownika`
				},
				{
					name: "Gry i zabawy",
					value: `**${prefix}moneta** | Wykonuje rzut monetą`
				},
				{
					name: "Statystyki gier",
					value: `**${prefix}fortnite** | Wyświetla statystyki gracza Fortnite BattleRoyale\n**${prefix}csgo** | Wyświetla statystyki gracza Counter-Strike: Global Offensive`
				},
				{
					name: "Administracyjne",
					value: `**${prefix}kick** | Wyrzuca członka serwera\n**${prefix}warn** | Wypisywanie ostrzeżenia`
				}
			]
		}
	});
}

function Avatar(message, args) {
	if (args.length <= 1) {
		message.reply(`Użyj: ${Config.getKeyValue("prefix")}avatar [Oznaczenie]`);
		return false;
	}

	let user = args[1].match("<@(.*)>");

	if (!user) {
		message.reply("nie znaleziono takiego użytkownika.");
		return false;
	}

	user = user[1];
	user = message.guild.members.get(user);

	if (!user) {
		message.reply("nie znaleziono takiego użytkownika.");
		return false;
	}

	message.reply("", {
		embed: {
			color: 16738814,
			thumbnail: {
				url: user.user.avatarURL
			}
		}
	});
}
