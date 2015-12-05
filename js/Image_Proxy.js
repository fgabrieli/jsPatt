/**
 * Example of proxy pattern, load images on demand (lazy loading).
 */

app.Image = {
  url : '',
  
  $domEl : {},
  
  create : function(imageUrl) {
    var newImage = $.extend(true, {}, this, {
      url : imageUrl
    });
    
    newImage.draw();
    
    return newImage;
  },
  
  draw : function() {
    this.$domEl = $('<img>');
    this.$domEl.attr('src', this.url);
    this.$domEl.width(200);
    this.$domEl.css('height', 'auto');
    
    this.$domEl.appendTo('body');
  }    
}

app.ImageProxy = $.extend(true, {}, app.Image, {
  create : function(imageUrl) {
    var newProxy = $.extend(true, {}, this, {
      url : imageUrl
    });   
    
    // do not draw until required (proxy implements lazy loading)
    
    return newProxy;
  },

  draw : function() {
    app.Image.draw.apply(this);
  }
});