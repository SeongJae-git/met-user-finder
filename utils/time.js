async function timeConvert_gameCreation(timestamp) {
    return new Promise((resolve, reject) => {
        let date = new Date(timestamp);
        let time = date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0') + "-" + 
                    date.getDate().toString().padStart(2, '0') + " # " + 
                    date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');

        resolve(time);
    });
}

async function timeConvert_gameDuration(timestamp) {
    return new Promise((resolve, reject) => {
        let date = new Date(timestamp);
        let time = date.getMinutes().toString().padStart(2, '0') + "분 " + date.getSeconds().toString().padStart(2, '0') + "초";

        /*
        if((date.getHours()-9) !== 0) {
            time = (date.getHours()-9) + time;
        }
        */

        resolve(time);
    });
}

exports.timeConvert_gameCreation = timeConvert_gameCreation;
exports.timeConvert_gameDuration = timeConvert_gameDuration;