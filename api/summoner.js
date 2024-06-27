const request = require('request');
const api_key = require('../config/api-key.json');

async function getSummonerInfo(name) {
    let link = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + encodeURI(name) + "?api_key=" + api_key.value;

    return new Promise((resolve, reject) => {
        request(link, (error, response, body) => {
            if(error) {
                console.log("에러 : summoner.js - getSummonerInfo");
                reject();
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

exports.getSummonerInfo = getSummonerInfo;