const axios = require("axios");

const Config = require("./../Config.js");


async function getUserID(username, message) {
    try {
        let response = await axios(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${Config.getKeyValue("steam-api-key")}&vanityurl=${username}`);

        if (response.data.response.success === 42) return message.reply("nie odnalazłam konta o takiej nazwie unikalnej :disappointed_relieved:");
        return response.data.response.steamid;
    } catch (error) {
       return console.log(error);
    } 
}

async function getGameStats(message, appid, username) {
    try {
        let steamid = await getUserID(username, message);
        if (typeof steamid === "string") {
            let response = await axios(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${Config.getKeyValue("steam-api-key")}&steamid=${steamid}`);

            return response.data;
        }
    } catch (error) {
         return message.reply("nie mogę odczytać statystyk tego gracza, najpewniej statystyki jego profilu zostały ukryte lub wystąpił problem z serwerami Valve :disappointed_relieved:");
    }
}


module.exports = {
    getGameStats: getGameStats,
    getUserID: getUserID
};