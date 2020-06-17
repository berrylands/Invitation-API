const debug = require('debug')('app:routes:check');
const express = require('express');
const router = express.Router();

const Nano = require('nano');

const nano = Nano(process.env.COUCH_URL);
const db = nano.db.use(process.env.COUCH_INVITATIONS_DATABASE);

router.post('/:INVITEID', async (req, res, next) => {

    let invite;

    try{
        invite = await db.get(req.params.INVITEID);
    } catch(err){
        debug(`Could not find invitation "${req.params.INVITEID}"`, err);
        invite = null;
    }

    if(!invite){
        res.status(404);
        res.json({
            status : "err",
            message : `Invitation "${req.params.INVITEID}" was not found`
        });
    } else {

        const now = Number(Date.now());

        if(now > invite.expires){
            res.status(498);
            res.json({
                status : "err",
                message : `Invitation "${req.params.INVITEID}" has expired`
            });
        } else {

            const allowableProperties = ["creator", "choirId", "invitee", "expires"];

            const sanitisedInvitation = {};

            allowableProperties.forEach(property => {
                sanitisedInvitation[property] = invite[property];
            });

            sanitisedInvitation.id = invite._id;

            res.json({
                "status" : "ok",
                "invitation" : sanitisedInvitation
            });
        }

    }

}); 

module.exports = router;