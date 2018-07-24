const axios = require("axios");

const Config = require("./../Config.js");
const Syntax = require("./../Utils/Syntax.js");
const Steam = require("./../Utils/Steam.js");


// Rzut monetą
async function FlipCoin(message, args) {
	let rand = Math.random()*100;
	if (rand > 50) return message.reply("rzucam monetą, ..., wypada reszka!");
	else return message.reply("rzucam monetą, ..., wypada orzeł!");
}

// Statystyki CS:GO
async function CounterStrike(message, args) {
	if (args.length <= 1) return message.reply("", {embed: Syntax.PrepareSyntax(args[0], "csgo")});

	try {
		let data = await Steam.getGameStats(message, 730, args[1]);
		if (data && data.playerstats) message.reply("", {
				embed: {
					color: 14588725,
					author: {
						name: "Counter-Strike: Global Offensive",
						icon_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS462wIJOiThAt0XRfS6axfVyh6j0NIuQKdyo2nda36NOdynIz_",
					},
					fields: [
						{
							name: "Zabójstwa",
							value: data['playerstats']['stats'][0].value,
							inline: true
						},
						{
							name: "Śmierci",
							value: data['playerstats']['stats'][1].value,
							inline: true
						},
						{
							name: "K/D Ratio",
							value: "" + (data['playerstats']['stats'][0].value/data['playerstats']['stats'][1].value).toFixed(2),
							inline: true
						},
						{
							name: "Podłożone bomby",
							value: data['playerstats']['stats'][3].value,
							inline: true,
						},
						{
							name: "Rozbrojone bomby",
							value: data['playerstats']['stats'][4].value,
							inline: true,
						},
						{
							name: "Suma wygranych",
							value: data['playerstats']['stats'][5].value,
							inline: true,
						},
						{
							name: "Zadane obrażenia",
							value: data['playerstats']['stats'][6].value,
							inline: true,
						},
						{
							name: "Zarobione pieniądze",
							value: data['playerstats']['stats'][7].value,
							inline: true,
						},
						{
							name: "Uratowani zakładnicy",
							value: data['playerstats']['stats'][8].value,
							inline: true,
						},
						{
							name: "Strzały w głowę",
							value: data['playerstats']['stats'][25].value,
							inline: true,
						},
						{
							name: "Procent strzałów w głowę",
							value: Math.floor(data['playerstats']['stats'][0].value/data['playerstats']['stats'][25].value) + "%",
							inline: true,
						},
						{
							name: "Rozbite okna",
							value: data['playerstats']['stats'][39].value,
							inline: true,
						},
						{
							name: "Oddane strzały",
							value: data['playerstats']['stats'][47].value,
							inline: true,
						},
						{
							name: "Rozegrane rundy",
							value: data['playerstats']['stats'][48].value,
							inline: true,
						},
						{
							name: "Czas w grze",
							value: "" + Math.floor(data['playerstats']['stats'][2].value/3600),
							inline: true,
						},
					]
				}
			});
	} catch (err) {
		return console.log(err);
	}
}

// Statystyki Fortnite
async function Fortnite(message, args) {
	if (args.length <= 1) return message.reply("", {embed: await Syntax.PrepareSyntax(args[0], "fortnite")});

	let platform = "pc";
	if (args[2]) {
		if (args[2].toLowerCase() == "pc") platform = "pc";
		else if (args[2].toLowerCase() == "x1") platform = "xb1";
		else if (args[2].toLowerCase() == "ps4") platform = "ps4";
	}

	let response = await axios({
		url: `https://api.fortnitetracker.com/v1/profile/${platform}/${args[1]}`,
		headers: {"TRN-Api-Key": Config.getKeyValue("trn-api-key")},
	});

	try {
		let data = response.data;

		if (data.error === "Player Not Found") return message.reply("nie znaleziono na wybranej platformie gracza o podanej nazwie.");
		message.reply("wysyłam Ci statystyki Fortnite Battle Royale dla konta " + data['epicUserHandle'] + " na platformie " + data['platformNameLong'] +" :wink:", {
			embed: {
				color: 7609759,
				author: {
					name: data['epicUserHandle'] + " [" + data['platformNameLong'] + "]",
					icon_url: "https://images.discordapp.net/avatars/372957548451725322/df8efed40e4a44ac40aa5ccbc33e6f05.png",
				},
				fields: [
					{
						name: "Nazwa konta",
						value: data['epicUserHandle'],
						inline: true
					},
					{
						name: "Platforma",
						value: data['platformNameLong'],
						inline: true
					},
					{
						name: "K/D Ratio",
						value: data['lifeTimeStats'][11].value,
						inline: true
					},
					{
						name: "Rozegrane mecze",
						value: data['lifeTimeStats'][7].value,
						inline: true
					},
					{
						name: "Zwycięstwa",
						value: data['lifeTimeStats'][8].value,
						inline: true
					},
					{
						name: "Procent zwyciestw",
						value: data['lifeTimeStats'][9].value,
						inline: true
					},
					{
						name: "Zabójstwa",
						value: data['lifeTimeStats'][10].value,
						inline: true
					},
				]
			}
		});
	} catch (error) {
		console.log(error);
		return message.reply("niestety, wystąpił problem podczas pobierania danych z serwera :sob:");
	}
}

// Statystyki Rocket League
async function RocketLeague(message, args) {
	if (args.length <= 1) return message.reply("", {embed: await Syntax.PrepareSyntax(args[0], "rocketleague")});

	message.reply("soon :wink");
}


module.exports = {
	FlipCoin: FlipCoin,
	Fortnite: Fortnite,
	CounterStrike: CounterStrike,
	RocketLeague: RocketLeague
};