/*
 * A basic bot that shows how to connect to a Discord account,
 * how to listen to messages and how to send messages.
 */

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

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add a listener to the "message" event, which triggers upon receiving
// any message
myBot.on( "message", function( message ) {
	// The bot's name
	var botName = myBot.user.username;

	var smashMouth = "/tts Hey now, you\'re an All Star, get your game on, go play. Hey now, you\'re a Rock Star, get the show on, get paid. And all that glitters is gold, Only shooting stars break the mold.";
	// message.content accesses the content of the message as a string.
	// If it is equal to "ping", then the bot should respond with "pong".
	if(message.mentions["contents"].length > 0){
		var isMentioned = false;
		message.mentions["contents"].forEach(function(entry){
			if(entry["username"] === botName){
				isMentioned = true;
			}
		});
		if(isMentioned){
			var cmdIndex = message.content.indexOf("roll");
			if(cmdIndex > 0){
				//Gets everything after "roll" in the message
				var str = message.content.substring(cmdIndex+"roll".length);
				var pattern = "[1-9]+[dD][2-9]+";
				var n = str.search(pattern);
				//The string that matches the regex pattern
				var rollCommandString = str.substring(n);
				var indexOfDie = rollCommandString.search("[dD]");
				var numberOfDice = parseInt(rollCommandString.substring(0, indexOfDie));
				var sizeOfDie = parseInt(rollCommandString.substring(indexOfDie+1));

				console.log("Number of dice: " + numberOfDice);
				console.log("Size of dice: " + sizeOfDie);
				var result = 0;
				for(i = 0; i < numberOfDice; i++){
					result += getRandomInt(1, sizeOfDie);
				}
				console.log("Result: "+result);
				var authorName = "****" + message.author.username + "****";
				var output = authorName + " rolled *" + rollCommandString + "*. Result: **" + result + "**.";
				this.sendMessage(message.channel, output);
			}
			if(message.content.indexOf("shrek") > 0){
				this.sendMessage(message.channel, smashMouth);
			}
		}
	}
} );