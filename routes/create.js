const debug = require('debug')('app:routes:create');
const express = require('express');
const router = express.Router();

const kuuid = require('kuuid');
const Nano = require('nano');

const nano = Nano(process.env.COUCH_URL);
const db = nano.db.use(process.env.COUCH_INVITATIONS_DATABASE);

router.post('/', async (req, res, next) => {

    const missingParameters = [];

    if(!req.body.creator){
        missingParameters.push('creator');
    }

    if(!req.body.invitee){
        missingParameters.push('invitee');
    }

    if(!req.body.choirId){
        missingParameters.push('choirId');
    }

    if(missingParameters.length > 0){

        res.json({
            status : "err",
            message : `Parameters missing from invitation creation "${missingParameters.join('", "')}"`
        });

    } else {

        const invitation = {
            _id: kuuid.id(),
            creator : req.body.creator,
            choirId : req.body.choirId,
            invitee : req.body.invitee,
            expires : Number(Date.now()) + (1000 * 60 * 60 * 24) // 24 hours until expiration
        };

        await db.insert(invitation);

        res.json({
            "status" : "ok",
            "id" : invitation._id
        });

    }

});

module.exports = router;