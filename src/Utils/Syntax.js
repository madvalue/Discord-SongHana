const Config = require("./../Config.js");

let games = {
    // Statystyki gier
    fortnite: {
        name: "Fortnite Battle Royale",
        image: "https://images.discordapp.net/avatars/372957548451725322/df8efed40e4a44ac40aa5ccbc33e6f05.png",
        color: 7609759,
        syntax: "[Nazwa konta Epic] [Platforma]",
        limits: "Tej komendy można użyć raz na 5 sekund",
        platforms: "PC (domyślna), X1 (Xbox One), PS4 (PlayStation 4)",
        description: "Wyświetlanie statystyk Fortnite Battle Royale gracza o wpisanej nazwie konta Epic Games"
    },

    csgo: {
        name: "Counter-Strike: Global Offensive",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS462wIJOiThAt0XRfS6axfVyh6j0NIuQKdyo2nda36NOdynIz_",
        color: 14588725,
        syntax: "[Unikalna nazwa Steam]",
        limits: "Tej komendy można użyć raz na 5 sekund",
        description: "Wyświetlanie statystyk CS:GO gracza o wpisanej nazwie unikalnej użytkownika Steam"
    },

    rocketleague: {
        name: "Rocket League",
        image: "https://png2.kisspng.com/20180422/ojq/kisspng-rocket-league-logo-t-shirt-rocket-league-5adcde1071bce1.0196787915244242084659.png",
        color: 3632569,
        syntax: "[Unikalna nazwa Steam]",
        limits: "Tej komendy można użyć raz na 5 sekund",
        description: "Wyświetlanie statystyk Rocket League gracza o wpisanej nazwie unikalnej użytkownika Steam"
    },


    // Komendy administracyjne
    kick: {
        name: "Moderacja",
        image: "https://pre00.deviantart.net/867e/th/pre/f/2017/061/b/9/170221_love_for_you_by_umigraphics-db0wya3.jpg",
        color: 16738814,
        syntax: "[Oznaczenie użytkownika] [Powód]",
        limits: "Komenda przeznaczona tylko dla członków ekipy discordowej",
        description: "Wyrzucenie użytkownika z serwera Discord"
    },

    warn: {
        name: "Moderacja",
        image: "https://pre00.deviantart.net/867e/th/pre/f/2017/061/b/9/170221_love_for_you_by_umigraphics-db0wya3.jpg",
        color: 16738814,
        syntax: "[Oznaczenie użytkownika] [Powód]",
        limits: "Komenda przeznaczona tylko dla członków ekipy discordowej",
        description: "Nadanie ostrzeżenia oznaczonemu użytkownikowi"
    }
};

async function PrepareSyntax(command, game) {
    if (!games[game]) return {};
    else {
        let fields = [];

        // Przykład użycia
        fields[fields.length] = {
            name: "Użycie",
            value: `${Config.getKeyValue("prefix")}${command} ${games[game].syntax}`,
            inline: false
        };

        // Opis komendy
        fields[fields.length] = {
            name: "Opis",
            value: games[game].description,
            inline: false
        };

        // Dostępne platformy
        if (games[game].platforms)
            fields[fields.length] = {
                name: "Dostępne platformy",
                value: games[game].platforms,
                inline: false
            };

        // Limity
        if (games[game].limits)
            fields[fields.length] = {
                name: "Limity",
                value: games[game].limits,
                inline: false
            };


        return {
            color: games[game].color,
            author: {
                name: games[game].name,
                icon_url: games[game].image
            },
            fields: fields,
            timestamp: new Date(),
            footer: {
                text: "SongHana by madvalue"
            }
        };
    }
}

module.exports = {
    PrepareSyntax: PrepareSyntax
};
