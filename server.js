const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth'),
			pageRoutes = require('./routes/pages'),
      apiRoutes = require('./routes/api');

const app = express();
require('dotenv').load();
require('./auth/passport')(passport);

const dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/voting';
mongoose.Promise = Promise;
mongoose.connect(dbUri, {
  useMongoClient: true,
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(cookieParser('secretSauce2017')); // cookie parser must use the same secret as express-session.

const cookieExpirationDate = new Date();
const cookieExpirationDays = 5;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);

app.use(session({
  secret: 'secretSauce2017',
  resave: true,
  saveUninitialized: true,
	cookie: {
	    expires: cookieExpirationDate // use expires instead of maxAge
	}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  next();
});

authRoutes(app, passport);
pageRoutes(app);
apiRoutes(app);

app.use((req, res, next) => {
    res.status(400);
   	res.render('error', { title: '404 Error' });
});

app.listen(process.env.PORT || 3000);
