const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const pageRoutes = require('./routes/pages'),
      apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

pageRoutes(app);
apiRoutes(app);

app.use(function(req, res, next) {
    res.status(400);
   	res.render('error', { title: '404 Error' });
});

app.listen(process.env.PORT || 3000);
