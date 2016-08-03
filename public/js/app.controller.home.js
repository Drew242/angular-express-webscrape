viceCity.controller('homeController', [
  '$http',
  homeController
]);

function homeController($http) {
  var hCtrl = this;

  hCtrl.welcomeMessage = 'Your home for sweet, sweet news';

  hCtrl.getTheNews = function() {

      $http.get('/api/news')
        .then(function(response) {
          hCtrl.news = response.data;
          console.log(response.data);
        });

  };

}
