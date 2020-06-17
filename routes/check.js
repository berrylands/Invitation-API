const debug = require('debug')('app:routes:check');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.end();

}); 

module.exports = router;