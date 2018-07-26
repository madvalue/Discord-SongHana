// Rzut monetą
async function FlipCoin(message, args) {
	let rand = Math.random()*100;
	if (rand > 50) return message.reply("rzucam monetą, ..., wypada reszka!");
	else return message.reply("rzucam monetą, ..., wypada orzeł!");
}

// Papier, kamien, nożyce
async function RockPaperScissors(message, args) {

}


module.exports = {
	FlipCoin: FlipCoin,
	RockPaperScissors: RockPaperScissors
};