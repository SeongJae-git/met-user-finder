var express = require('express');
var router = express.Router();

let mainController = require('../services/service.js');

router.get('/', function (req, res, next) {
    res.render('index', { searchKeyword: '' });
});

router.get('/search', async function (req, res, next) {
    let data = await mainController.getSearchResult(req.query.summoner);
    data = JSON.parse(data);

    if (data.status) {
        res.render('index', {
            data: { status: data.status },
            searchKeyword: req.query.summoner,
        });
    } else {
        res.render('index', {
            data: data,
            searchKeyword: req.query.summoner,
        });
    }
});

module.exports = router;
