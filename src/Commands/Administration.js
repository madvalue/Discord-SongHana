const Config = require("./../Config.js");
const Syntax = require("./../Utils/Syntax.js");
const Discord = require("./../Discord.js");


// Wyrzucanie z serwera
async function kickMember(message, args) {
	if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("niestety nie masz uprawnień do tego."); // Sprawdzanie czy mamy do tego uprawnienia
	if (args.length <= 1) return message.reply("", {embed: await Syntax.PrepareSyntax(args[0], "kick")});

	// Wyszukiwanie użytkownika
	let user = args[1].match("<@(.*)>");
	if (!user) return message.reply("nie znaleziono takiego użytkownika.");

	user = user[1];
	user = message.guild.members.get(user);

	// Odczyt powodu
	let reason = "";
	if (args.length > 2) for (let i = 2; i < args.length; i++) reason += args[i] + " ";
	if (reason.length < 1) reason = "Nie podano powodu";

	// Sprawdzamy, czy mamy uprawnienia do wyrzucenia tego członka
	if (!user.kickable) return message.reply("niestety brakuje mi uprawnień do wyrzucenia tego użytkownika :disappointed_relieved:");

	// Właśniwe wyrzucanie użytkownika
	message.reply(`${user.user.username} został pomyślnie wyrzucony z serwera! Powód: **${reason}**`);
	user.send(`Właśnie zostałeś wyrzucony z serwera ${message.guild.name} przez ${message.author} z powodem: **${reason}**`);
	user.kick(reason);
}

// Wystawianie ostrzeżeń
async function warnMember(message, args) {
	if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("niestety nie masz uprawnień do tego.");
	if (args.length <= 1) return message.reply("", {embed: await Syntax.PrepareSyntax(args[0], "warn")});

	// Wyszukiwanie użytkownika
	let user = args[1].match("<@(.*)>");
	if (!user) return message.reply("nie znaleziono takiego użytkownika.");

	user = user[1];
	user = message.guild.members.get(user);

	// Odczyt powodu
	let reason = "";
	if (args.length > 2) for (let i = 2; i < args.length; i++) reason += args[i] + " ";
	if (reason.length < 1) reason = "Nie podano powodu";

	// Wysyłanie wiadomości o warnie
	message.channel.send(`${user.user} otrzymał ostrzeżenie od ${message.author} z powodem: **${reason}**`);
	user.send(`Właśnie otrzymałeś/aś ostrzeżenie na serwerze ${message.guild.name} od ${message.author} z powodem: **${reason}**\nPamiętaj, że nie stosowanie się do ostrzeżeń może zakończyć się banicją!`);
}


module.exports = {
	kickMember: kickMember,
	warnMember: warnMember
};
