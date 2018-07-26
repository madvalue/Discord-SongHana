const axios = require("axios");

const Config = require("./../Config.js");


// Zdjęcie kota
async function Cat(message, args) {
	try {
		let response = await axios("http://thecatapi.com/api/images/get?format=html");
		let url = response.data.match(`<img src="(.*)">`)[1];
		return message.reply("oto twoje losowe zdjęcie ~~algorytma~~ kota :wink:", {
			embed: {
				color: 16738814,
				timestamp: new Date(),
				footer: {
                	text: Config.getKeyValue("footer-string")
            	},
				image: {
					url: url
				}
			}
		});
	} catch (error) {
		console.log(error);
		return message.reply("niestety nie udało mi się wysłać Ci losowego zdjecia kota :sob:");
	}
}

// Zdjęcie psa
async function Dog(message, args) {
	try {
		let response = await axios("https://api.thedogapi.com/v1/images/search");
		return message.reply("oto twoje losowe zdjęcie psa :wink:", {
			embed: {
				color: 16738814,
				timestamp: new Date(),
				footer: {
                	text: Config.getKeyValue("footer-string")
            	},
				image: {
					url: response.data[0].url
				}
			}
		});
	} catch (error) {
		console.log(error);
		return message.reply("niestety nie udało mi się wysłać Ci losowego zdjęcia psa :sob:");
	}
}

// Losowy gif
async function Gif(message, args) {
	try {
		let response = await axios(`https://api.giphy.com/v1/gifs/random?api_key=${Config.getKeyValue("giphy-api-key")}`);
		return message.reply("oto twój losowy gif :wink:", {
			embed: {
				color: 16738814,
				timestamp: new Date(),
				footer: {
					text: Config.getKeyValue("footer-string")
				},
				image: {
					url: response.data.data.images.original.url
				}
			}
		});
	} catch (error) {
		console.log(error);
		return message.reply("niestety nie udało mi się wysłać Ci gifa :sob:");
	}
}


module.exports = {
	Cat: Cat,
	Dog: Dog,
	Gif: Gif
};