var r = require("./commands/roll.js");
var roll = new r();
// var l = require("./commands/lol.js");
// var lol = new l();
var lol = require('./commands/lol');
var Discord = require( "discord.js" );

// Create the bot
var myBot = new Discord.Client();

// Login with an example email and password
myBot.login( "ianjsikes+bot@gmail.com", "Error404" );

// The "ready" event is triggered after the bot successfully connected to
// Discord and is ready to send messages.
myBot.on( "ready", function() {
	console.log( "Bot connected successfully." );
} );

function runCommand(message, command, args){
	var self = this;

	var send = function(result) {
		self.sendMessage(message.channel, result);
	}
		

	var author = message.author;
	switch(command.toLowerCase()){
		case "help": 
		 	send("no way");
		 	break; 
		case "roll":
			var result = roll.rollDice(args[0]);
			send(author.mention() + " " + result);
			break;
		case "lol":
			var summonerName = args.join('');
			var b = lol.getSummonerInfo(summonerName, function(err, summoner){
				// self.sendMessage(message.channel, "Hello");
				send('summonerName: ' + summonerName);
				send(JSON.stringify(summoner));
			});
			break;
			// b(args.join(''), x = function(summoner){
			// 	console.log(myBot === this);
			// 	this.sendMessage(message.channel, "Hello");
			// }.bind(this));
			// return null;
			
		default:
			// return "Command **\"" + command + "\"** not found.";
			send("Command **\"" + command + "\"** not found.");
			break;
	}
}

// Add a listener to the "message" event, which triggers upon receiving
// any message
myBot.on( "message", function( message ) {
	// The bot's name
	var botName = myBot.user.username;

	if(message.isMentioned(myBot.user)){

		//Splits the message and deletes everything except what's after the bot's mention
		var input = message.content.split(" ");
		var mentionNum = 0;
		for(i = 0; i < input.length; i++){
			if(input[i] === "<@"+myBot.user.id+">"){
				mentionNum = i+1;
				break;
			}
		}
		input.splice(0, mentionNum);

		//The first word after the mention is the command to be executed
		var command = input[0];
		if(command == null){return;}
		var args = input.slice(1);
		var bound = runCommand.bind(this);
		var result = bound(message, command, args);
		// if(result != null){
		// 	myBot.sendMessage(message.channel, result);
		// }
	}
} );