const summonerService = require('../api/summoner.js');
const spectatorService = require('../api/spectator.js');
const matchService = require('../api/match.js');
const timeUtils = require('../utils/time.js');
const regExpUtils = require('../utils/regExp.js');

const maps = require('../config/maps.json');
const champions = require('../config/champions.json');

// 이전 게임 몇게임까지 보여줄지 카운트
const showOldMatchCount = 3;

async function getSearchResult(summoner) {
    let summonerInfo = await summonerService.getSummonerInfo(summoner);
    let currentGameInfo = await spectatorService.getCurrentGameInfo(summonerInfo.id);

    if (currentGameInfo.status != null) {
        return JSON.stringify({ status: currentGameInfo.status.status_code });
    } else {
        let currentGameParticipants = currentGameInfo.participants;
        let oldMatchIdList = await matchService.getMatchIds(summonerInfo.puuid, showOldMatchCount);

        let gameInfo = [];

        for (let i = 0; i < oldMatchIdList.length; i++) {
            let oldGameData = await matchService.getMatchInfo(oldMatchIdList[i]);
            let mapName = '';
            for (let j = 0; j < maps.length; j++) {
                if (maps[j].mapId === oldGameData.info.mapId) mapName = maps[j].mapName;
            }
            gameInfo[i] = {
                metaData: {
                    gameCreation: await timeUtils.timeConvert_gameCreation(oldGameData.info.gameCreation),
                    gameMode: oldGameData.info.gameMode,
                    map: mapName,
                },
                participants: [],
            };

            for (let currentGameIndex = 0; currentGameIndex < currentGameParticipants.length; currentGameIndex++) {
                if (currentGameParticipants[currentGameIndex].summonerName.replace(/(\s*)/g, '') === summoner.replace(/(\s*)/g, '')) {
                    continue;
                }
                for (let oldGameIndex = 0; oldGameIndex < oldGameData.info.participants.length; oldGameIndex++) {
                    if (oldGameData.info.participants[oldGameIndex].summonerName == currentGameParticipants[currentGameIndex].summonerName) {
                        gameInfo[i].participants.push({
                            summonerName: oldGameData.info.participants[oldGameIndex].summonerName,
                            summonerLevel: oldGameData.info.participants[oldGameIndex].summonerLevel,
                            teamPosition: oldGameData.info.participants[oldGameIndex].teamPosition,
                            currentGame_championName: await getChampName(currentGameParticipants[currentGameIndex].championId).then((promiseChampName) => {
                                return promiseChampName;
                            }),
                            oldGame_championName: oldGameData.info.participants[oldGameIndex].championName,
                            kills: oldGameData.info.participants[oldGameIndex].kills,
                            deaths: oldGameData.info.participants[oldGameIndex].deaths,
                            assists: oldGameData.info.participants[oldGameIndex].assists,
                            totalMinionsKilled: oldGameData.info.participants[oldGameIndex].totalMinionsKilled,
                            items: [
                                oldGameData.info.participants[oldGameIndex].item0,
                                oldGameData.info.participants[oldGameIndex].item1,
                                oldGameData.info.participants[oldGameIndex].item2,
                                oldGameData.info.participants[oldGameIndex].item3,
                                oldGameData.info.participants[oldGameIndex].item4,
                                oldGameData.info.participants[oldGameIndex].item5,
                                oldGameData.info.participants[oldGameIndex].item6,
                            ],
                            damageDealt: oldGameData.info.participants[oldGameIndex].totalDamageDealtToChampions,
                            damageTaken: oldGameData.info.participants[oldGameIndex].totalDamageTaken,
                            healed: oldGameData.info.participants[oldGameIndex].totalHealsOnTeammates,
                        });
                    }
                }
            }
        }
        return JSON.stringify(gameInfo);
    }
}

async function getChampName(id) {
    let championList = champions.data;
    let championName = 'Unknown';

    return new Promise((resolve, reject) => {
        for (let i in championList) {
            if (id == championList[i].key) {
                championName = regExpUtils.regExpProc(championList[i].name);
                break;
            }
        }
        resolve(championName);
    });
}

exports.getSearchResult = getSearchResult;
