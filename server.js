const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const request = require('request');
const app = express();
const Router = require('react-router');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use((req, res, next) => {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/users/:id?', (req, res) => {
  let userUrl = 'http://spa.tglrw.com:4000/users/';
  if (req.params.id) {
    // Add id to user query
    userUrl += req.params.id;
  }
  request(userUrl, (err, response, body) => {
    if (err) {
      console.error(userUrl, ': Returned statusCode:', err.statusCode, err);
    } else {
      console.info('GET USERS SUCCESSFUL:');
      res.json(JSON.parse(body));
    }
  });
});

app.get('/api/widgets/:id?', (req, res) => {
  let widgetUrl = 'http://spa.tglrw.com:4000/widgets/';
  if (req.params.id) {
    // Add id to user query
    widgetUrl += req.params.id;
  }
  request(widgetUrl, (err, response, body) => {
    if (err) {
      console.error(widgetUrl, ': Returned statusCode:', err.statusCode, err);
    } else {
      console.info('GET WIDGETS SUCCESSFUL:');
      res.json(JSON.parse(body));
    }
  });
});

app.post('/api/widgets/', (req, res) => {
  const postWidgetUrl = 'http://spa.tglrw.com:4000/widgets';
  const options = {
    json: req.body,
  };

  request.post(postWidgetUrl, options, (err, response, body) => {
    if (err) {
      console.error(postWidgetUrl, ': Returned statusCode:', err.statusCode, err);
    } else {
      console.log('POST SUCCESSFUL');
      console.log('POST response:', body);
      res.json(body);
    }
  });
});

app.put('/api/widgets/:id', (req, res) => {
  const putWidgetUrl = `http://spa.tglrw.com:4000/widgets/${req.params.id}`;
  const options = {
    json: req.body,
  };

  request.put(putWidgetUrl, options, (err, response, body) => {
    if (err) {
      console.error(putWidgetUrl, ': Returned statusCode:', err.statusCode, err);
    } else {
      console.log('PUT SUCCESSFUL');
      console.log('PUT response:', body);
      res.send('Updated!');
    }
  });
});

// app.get('*', function (req, res) { // This wildcard method handles all requests
//
//   Router.run(routes, req.path, function (Handler, state) {
//     var element = React.createElement(Handler);
//     var html = React.renderToString(element);
//     res.render('main', { content: html });
//   });
// });


app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
