viceCity.controller('homeController', homeController);

function homeController() {
  var hCtrl = this;

  hCtrl.welcomeMessage = 'Your home for sweet, sweet news';
  hCtrl.getTheNews = function() {
      console.log("Wow! Much News!");
  };

}
