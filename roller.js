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

function getNumberOfDice(txt){
	var re1='(\\d+)';	// Integer Number 1

    var p = new RegExp(re1,["i"]);
    var m = p.exec(txt);
    if (m != null)
    {
        return parseInt(m[1]);
    }else{
    	return -1;
    }
}

function getSizeOfDice(txt){
	var re1='.*?';	// Non-greedy match on filler
    var re2='\\d+';	// Uninteresting: int
    var re3='.*?';	// Non-greedy match on filler
    var re4='(\\d+)';	// Integer Number 1

    var p = new RegExp(re1+re2+re3+re4,["i"]);
    var m = p.exec(txt);
    if (m != null)
    {
        return parseInt(m[1]);
    }else{
    	return -1;
    }
}

function getRollModifier(txt){
	var re1='.*?';	// Non-greedy match on filler
    var re2='\\d+';	// Uninteresting: int
    var re3='.*?';	// Non-greedy match on filler
    var re4='\\d+';	// Uninteresting: int
    var re5='.*?';	// Non-greedy match on filler
    var re6='(\\d+)';	// Integer Number 1

    var p = new RegExp(re1+re2+re3+re4+re5+re6,["i"]);
    var m = p.exec(txt);
    if (m != null)
    {
        return parseInt(m[1]);
    }else{
    	return null;
    }
}

function getSignedRollModifier(txt){
	var re1='.*?';	// Non-greedy match on filler
    var re2='([-+]\\d+)';	// Integer Number 1

    var p = new RegExp(re1+re2,["i"]);
    var m = p.exec(txt);
    if (m != null)
    {
        return parseInt(m[1]);
    }else{
    	return null;
    }
}

// Add a listener to the "message" event, which triggers upon receiving
// any message
myBot.on( "message", function( message ) {
	// The bot's name
	var botName = myBot.user.username;

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
				console.log("rolling");
				//Gets everything after "roll" in the message
				var str = message.content.substring(cmdIndex+"roll".length);
				var numberOfDice = getNumberOfDice(str);
				var sizeOfDice = getSizeOfDice(str);
				var rollModifier = getSignedRollModifier(str);
				var result = 0;
				var rollString = "";
				if(numberOfDice > 0 && sizeOfDice > 1){
					rollString += numberOfDice + "d" + sizeOfDice;
					for(i = 0; i < numberOfDice; i++){
						result += getRandomInt(1, sizeOfDice);
					}
				}
				if(rollModifier != null){
					if(rollModifier>=0){
						rollString += "+" + rollModifier;
					}
					else{
						rollString += "" + rollModifier;
					}
					result += rollModifier;
				}

				var authorName = "****" + message.author.username + "****";
				var output = authorName + " rolled *" + rollString + "*. Result: **" + result + "**.";
				this.sendMessage(message.channel, output);
			}
		}
	}
} );