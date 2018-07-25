const axios = require("axios");

const Discord = require("./../Discord.js");
const Config = require("./../Config.js");
const Commands = require("./../Commands.js");


module.exports = {
	About: About,
	Help: Help,
	Avatar: Avatar,
	Coffee: Coffee,
	Cat: Cat,
	Dog: Dog
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
                text: "SongHana by madvalue"
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
                text: "SongHana by madvalue"
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

// Zdjęcie kota
async function Cat(message, args) {
	try {
		let response = await axios("http://thecatapi.com/api/images/get?format=html");
		let url = response.data.match(`<img src="(.*)">`)[1];
		return message.reply("", {
			embed: {
				color: 16738814,
				timestamp: new Date(),
				footer: {
                	text: "SongHana by madvalue"
            	},
				image: {
					url: url
				}
			}
		});
	} catch (error) {
		return console.log(error);
	}
}

// Zdjęcie psa
async function Dog(message, args) {
	try {
		let response = await axios("https://api.thedogapi.com/v1/images/search");
		return message.reply("", {
			embed: {
				color: 16738814,
				timestamp: new Date(),
				footer: {
                	text: "SongHana by madvalue"
            	},
				image: {
					url: response.data[0].url
				}
			}
		});
	} catch (error) {
		return console.log(error);
	}
}