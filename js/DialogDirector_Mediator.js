/**
 * Example of the Mediator pattern using Js.
 */

app.DialogDirector = {
  inputWidget : {},

  selectWidget : {},

  buttonWidget : {},

  init : function() {
    this.inputWidget = app.DialogWidget.create(app.DialogDirector, 'Input', $('input'));

    this.selectWidget = app.DialogWidget.create(app.DialogDirector, 'Select', $('select'));
    
    this.buttonWidget = app.DialogWidget.create(app.DialogDirector, 'Button', $('button'));
  },

  onChange : function(widget) {
    this.handleChange[widget.type].apply(app.DialogDirector);
  },

  handleChange : {
    Input : function() {
      var hasVal = false;

      var searchFor = this.inputWidget.get$DomEl().val();
      if (searchFor.length > 0) {
        var $selectEl = this.selectWidget.get$DomEl();
        var $option = {};
        $selectEl.find('option').each(function(i, el) {
          $option = $(el);
          if (i > 0 && $option.text().indexOf(searchFor) != -1) {
            hasVal = true;
            return false;
          }
        });
      }
      
      if (hasVal) {
        $selectEl.val($option.text());

        this.buttonWidget.show();
      } else {
        this.selectWidget.reset();
        this.buttonWidget.hide();
      }
    },

    Select : function() {
      if (this.selectWidget.hasVal()) {
        this.inputWidget.setText(this.selectWidget.getVal());
        this.buttonWidget.show();
      } else {
        this.buttonWidget.hide();
      }
    },

    Button : function() {
      // no need to do anything here
    }
  }
}