var rollCommand = function (){  
	var self = this;
	self.rollDice = function (diceStr){
		var numberOfDice = getNumberOfDice(diceStr);
		var sizeOfDice = getSizeOfDice(diceStr);
		var rollModifier = getSignedRollModifier(diceStr);

		if(!areParametersValid(numberOfDice, sizeOfDice, rollModifier)){
			var errorMessage = "";
			errorMessage += "Dice command: " + diceStr;
			errorMessage += " -- "
			errorMessage += "Number of Dice: " + numberOfDice;
			errorMessage += " -- "
			errorMessage += "Size of Dice: " + sizeOfDice;
			errorMessage += " -- "
			errorMessage += "Roll Modifier: " + rollModifier;
			return errorMessage;
		}

		//Rolls dice and adds to result
		var result = 0;
		for(i = 0; i < numberOfDice; i++){
			result += getRandomInt(1, sizeOfDice);
		}

		//Adds modifier if it exists
		if(rollModifier != null){
			result += rollModifier;
		}

		return "rolled *" + diceStr + "* -- Result: **" + result + "**";
	};
};

module.exports = rollCommand;

function areParametersValid(num, size, mod){
	if(num < 1 || num > 100){
		return false;
	}else if(size < 2 || size > 100){
		return false;
	}else if(mod < -100 || mod > 100){
		return false;
	}else{
		return true;
	}
}

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