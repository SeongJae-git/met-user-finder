const request = require('request');
const api_key = require('../config/api-key.json');

async function getMatchIds(puuid, count) {
    let link = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=" + count +  "&api_key=" + api_key.value;

    return new Promise((resolve, reject) => {
        request(link, (error, response, body) => {
            if(error) {
                console.log("에러 : match.js - getMatchIds");
                reject();
            } else {
                console.log(body);
                resolve(JSON.parse(body));
            }
        });
    });
}

async function getMatchInfo(matchId) {
    let link = "https://asia.api.riotgames.com/lol/match/v5/matches/" + matchId + "?api_key=" + api_key.value;

    return new Promise((resolve, reject) => {
        request(link, (error, response, body) => {
            if(error) {
                console.log("에러 : match.js - getMatchInfo");
                reject();
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

exports.getMatchIds = getMatchIds;
exports.getMatchInfo = getMatchInfo;