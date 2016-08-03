var express    = require('express');
var bodyParser = require('body-parser');
var logger     = require('morgan');
var request    = require('request');
var cheerio    = require('cheerio');

// Create the express App object //
var app = express();

// Mount middleware //
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

// Routes //
app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root : './public/html'
  });
})

app.get('/api/news', function(req, res) {
  var articleData = [];

  request('https://news.vice.com/', function(err, res, body) {
    var $ = cheerio.load(body);
    var $articles = $('.widget-list > .in-the-news-list-item');

    $articles.each(function(index, element) {
      var $article = $(element);
      var articleInfo = {};
      articleInfo.topic = $article.find('.article-topic > a').text();
      articleInfo.img   = $article.find('img').attr('data-sources');
      articleInfo.title = $article.find('h2 > a').text();
      articleInfo.desc  = $article.find('.article-one-liner').text();
      articleData.push(articleInfo);
    });
  });
  res.send(articleData);

});

// Listen //
var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log(`Server Running at ${port}`);
})
