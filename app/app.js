
let express = require('express');
const bodyParser = require('body-parser');
let app = express();
let userRoutes = require('./routes/user');
let jobRoutes = require('./routes/job');
let passport = require('passport');
let strategy = require('./middlewares/passportStratergy');
let { logRequests, logResponse } = require('./middlewares/logging');

app.set('view engine', 'ejs');

// Body parser 
app.use(bodyParser.json());

//Loggers
app.use(logRequests);
app.use(logResponse);

// Passport initialisation
passport.use(strategy);
app.use(passport.initialize());

// App base route 
app.get('/', function (req, res) {
   res.send('APIs');
});


// App routes
app.use('/user', userRoutes);
app.use('/job', jobRoutes);

module.exports = app;
