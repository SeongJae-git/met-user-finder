const request = require('request');
const api_key = require('../config/api-key.json');

async function getCurrentGameInfo(encryptedSummonerId) {
    let link = "https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + encryptedSummonerId + "?api_key=" + api_key.value;

    return new Promise((resolve, reject) => {
        request(link, (error, response, body) => {
            if(error) {
                console.log("에러 : spectator.js - getCurrentGameInfo");
                reject();
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

exports.getCurrentGameInfo = getCurrentGameInfo;