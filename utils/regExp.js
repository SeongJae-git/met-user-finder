async function regExpProc(str) {
    return new Promise((resolve, reject) => {
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

        // 공백 제거
        str = str.replace(/ /g, '');
        // 특수문자 제거
        str = str.replace(reg,'')

        resolve(str);
    });
}


exports.regExpProc = regExpProc;