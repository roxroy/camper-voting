const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const pageRoutes = require('./controllers/page.route'),
      pollRoutes = require('./controllers/poll.route');


const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

pageRoutes(app);
pollRoutes(app);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  //response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(process.env.PORT || 3000);
