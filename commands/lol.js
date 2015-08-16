var LolApi = require('leagueapi');
LolApi.init("c3326b34-dc13-4d5d-89b5-ba17b7a8a1b9", "na");

// var lolCommand = function (){
// 	var self = this;
// 	self.getSummonerInfo = function (bot, summonerName, callback){
// 		LolApi.Summoner.getByName(summonerName, function(err, summoner){
// 			if(!err){
// 				//callback(summoner);
// 				console.log(bot.user.username);
// 			}
// 			else {
// 				console.log("err:", err);
// 			}
// 		});
// 		return;
// 	};
// };



function getSummonerInfo(summonerName, callback){
	LolApi.Summoner.getByName(summonerName, callback);
}

// module.exports = lolCommand;

exports.getSummonerInfo = getSummonerInfo;