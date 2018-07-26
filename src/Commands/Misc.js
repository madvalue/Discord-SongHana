const axios = require("axios");

const Discord = require("./../Discord.js");
const Config = require("./../Config.js");
const Commands = require("./../Commands.js");


module.exports = {
	About: About,
	Help: Help,
	Avatar: Avatar,
	Coffee: Coffee,
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
			timestamp: new Date(),
			footer: {
                text: Config.getKeyValue("footer-string")
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

async function Help(message, args) {
	let prefix = Config.getKeyValue("prefix");
	let commands = await Commands.getCommandsList();

	let commands_fields = "";
	for (let i = 0; i < commands.length; i++) {
		commands_fields += `\n**${prefix}${commands[i].command}** | ${commands[i].description}`;
	}


	message.reply("lista komend została wysłana w prywatnej wiadomości :wink:");
	message.author.send("Hej, podsyłam Ci tę listę komend o które prosiłeś/aś :wink:", {
		embed: {
			color: 16738814,
			title: "Spis komend",
			footer: {
				text: Config.getKeyValue("footer-string")
			},
			timestamp: new Date(),
			description: commands_fields
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
			timestamp: new Date(),
			footer: {
                text: Config.getKeyValue("footer-string")
            },
			image: {
				url: user.user.avatarURL
			}
		}
	});
}

async function Coffee(message, args) {
	return message.reply(":coffee: oto kawa o którą prosiłeś/aś! :smile:");
}

