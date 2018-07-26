const Discord = require("./Discord.js");
const Config = require("./Config.js");


Discord.on("messageDelete", function (message) {
	let channel = Discord.channels.get(Config.getKeyValue("logs-channel-id"));
	if (!channel) return console.log("Kanał od logów nie istnieje, nie można dodać wpisu!");

	channel.send("", {
		embed: {
			description: `Wiadomość napisana przez ${message.author} została właśnie usunięta!`,
			color: 16738814,
			author: {
				name: message.author.tag,
				icon_url: message.author.avatarURL
			},
			timestamp: new Date(),
			footer: {
                text: Config.getKeyValue("footer-string")
            },
			fields: [
				{
					name: "Treść wiadomości",
					value: message.content,
					inline: false
				},
				{
					name: "Kanał",
					value: "" + message.channel,
					inline: false
				}
			]
		}
	});
});

Discord.on("messageUpdate", function (oldMessage, newMessage) {
	let channel = Discord.channels.get(Config.getKeyValue("logs-channel-id"));
	if (!channel) return console.log("Kanał od logów nie istnieje, nie można dodać wpisu!");

	if (oldMessage.content && newMessage.content) channel.send("", {
		embed: {
			description: `Wiadomość napisana przez ${newMessage.author} została właśnie edytowana!`,
			color: 16738814,
			author: {
				name: newMessage.author.tag,
				icon_url: newMessage.author.avatarURL
			},
			timestamp: new Date(),
			footer: {
                text: Config.getKeyValue("footer-string")
            },
			fields: [
				{
					name: "Poprzednia treść",
					value: oldMessage.content,
					inline: false
				},
				{
					name: "Nowa treść",
					value: newMessage.content,
					inline: false
				},
				{
					name: "Kanał",
					value: "" + newMessage.channel,
					inline: false
				}
			]
		}
	});
});

Discord.on("guildMemberUpdate", function (oldMember, newMember) {
	let channel = Discord.channels.get(Config.getKeyValue("logs-channel-id"));
	if (!channel) return console.log("Kanał od logów nie istnieje, nie można dodać wpisu!");

	channel.send("", {
		embed: {
			description: `Użytkownik ${newMember} właśnie zmienił swój nickname!`,
			color: 16738814,
			author: {
				name: newMember.tag,
				icon_url: newMember.avatarURL
			},
			timestamp: new Date(),
			footer: {
                text: Config.getKeyValue("footer-string")
            },
			fields: [
				{
					name: "Nowa nazwa użytkownika",
					value: (newMember.nickname ? newMember.nickname : newMember.user.username),
					inline: false
				},
				{
					name: "Poprzednia nazwa użytkownika",
					value: (oldMember.nickname ? oldMember.nickname : oldMember.user.username),
					inline: false
				}
			]
		}
	});
});