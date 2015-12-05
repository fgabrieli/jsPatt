app.DialogWidget = {
  type : '',

  $domEl : {},

  director : {},

  create : function(director, type, $domEl) {
    var newWidget = $.extend(true, {}, this[type], {
      director : director,
      type : type,
      $domEl : $domEl
    });

    newWidget.bindEvents();

    return newWidget;
  },

  onChange : function() {
    this.director.onChange(this);
  },

  get$DomEl : function() {
    return this.$domEl;
  },

  bindEvents : function() {
    // implemented by child classes
  }
}

app.DialogWidget.Input = $.extend(true, {}, app.DialogWidget, {
  bindEvents : function() {
    var t = this;
    t.$domEl.keyup(function() {
      t.onChange.apply(t);
    });
  },

  setText : function(text) {
    this.$domEl.val(text);
  }
});

app.DialogWidget.Select = $.extend(true, {}, app.DialogWidget, {
  bindEvents : function() {
    var t = this;
    t.$domEl.change(function() {
      t.onChange.apply(t);
    });
  },

  hasVal : function() {
    var $selectedOpt = this.$domEl.find('option:selected');
    var isValid = $selectedOpt.attr('data-is-valid');
    return (typeof isValid == 'undefined' || isValid == 'true');
  }, 

  getVal : function() {
    return this.$domEl.val();
  },
  
  reset : function() {
    this.$domEl.val(this.$domEl.find('option:first').text());
  }
});

app.DialogWidget.Button = $.extend(true, {}, app.DialogWidget, {
  show : function() {
    this.get$DomEl().show();
  },

  hide : function() {
    this.get$DomEl().hide();
  }
});
