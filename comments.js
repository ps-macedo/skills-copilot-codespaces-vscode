// Create web server
// Use http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function (req, res) {
  var parseUrl = url.parse(req.url, true);
  var pathname = parseUrl.pathname;
  if (pathname === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', function (err, data) {
      if (err) {
        throw err;
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    });
  } else if (pathname === '/post') {
    var comment = parseUrl.query;
    comments.push(comment);
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Success');
  } else if (pathname === '/get') {
    var data = JSON.stringify(comments);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end('Not Found');
  }
});
server.listen(3000, '