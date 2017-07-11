const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth'),
			pageRoutes = require('./routes/pages'),
      apiRoutes = require('./routes/api');

const app = express();
require('dotenv').load();
require('./auth/passport')();

const dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/codeploy';
mongoose.Promise = Promise;
mongoose.connect(dbUri, {
  useMongoClient: true,
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(session({
  secret: 'secretSauce2017',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
pageRoutes(app);
apiRoutes(app);

app.use(function(req, res, next) {
    res.status(400);
   	res.render('error', { title: '404 Error' });
});

app.listen(process.env.PORT || 3000);
