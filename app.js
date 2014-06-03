var _ = require('lodash')
var request = require('request')
var consolidate = require('consolidate')
var express = require('express')
var app = express()


var PORT = 8050;
var THIS = 'http://localhost:' + PORT + '/'

var AUTH_URL = 'http://localhost:8000/auth'
var LOGIN_URL = 'http://localhost:8000/login'


app.engine('html', consolidate.lodash)
app.set('view engine', 'html')
app.set('views', __dirname)


app.get('/', function (req, res) {
	req.pipe(
		request(
			{ uri: AUTH_URL, json: true},
			function (error, response, user) {
				if (!error && response.statusCode == 200) {
					res.render('index', {user: user})
				} else {
					res.redirect(LOGIN_URL + '?returnTo=' + encodeURIComponent(THIS))
				}
			}
		)
	)
})

var server = app.listen(PORT, function () {
	console.log('Listening on port %d', server.address().port)
})
