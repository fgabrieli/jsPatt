var app = {
  imageUrls : [ 'http://www.planwallpaper.com/static/images/Winter-Tiger-Wild-Cat-Images.jpg',
      'http://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg',
      'http://www.gettyimages.com/gi-resources/images/CreativeImages/Hero-527920799.jpg' ],

  imageProxies : [],

  imageIndex : 0,

  init : function() {
    for (var i = 0; i < this.imageUrls.length; i++) {
      var t = this;
      this.imageProxies.push(app.ImageProxy.create(this.imageUrls[i]));
    }
    
    this.showNext();
  },

  showNext : function() {
    this.imageProxies[this.imageIndex++].draw();
  }
};

{
  $(window).load(function() {
    app.init();
  });
}