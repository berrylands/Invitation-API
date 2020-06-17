require('dotenv').config( { silent : process.env.NODE_ENV === "production" } );
const debug = require('debug')('app:index');
const w3id = require('w3id-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const keyProtect = require(`${__dirname}/middleware/checkAPIKey`);
const whitelist = require(`${__dirname}/middleware/whitelist`);

app.use(bodyParser.json());

app.get('/__gtg', (req, res) => {
    res.end();
});

// API Key Management Endpoints
app.use('/keys', [w3id, whitelist], require(`${__dirname}/keyManagement.js`));
app.all('/__auth', w3id);

app.use('*', keyProtect);
app.use('/check', require(`${__dirname}/routes/check`));
app.use('/create', require(`${__dirname}/routes/create`));

app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
    res.json({
        status : "error",
        message : "Could not process request"
    });
    
});

app.listen(PORT, () => {
    debug(`Server listening on ${PORT}`)
});