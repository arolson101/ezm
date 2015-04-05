"use strict";


var Editable = React.createClass({
  render: function() {
    return <a href="#" ref="a" success={this.onSuccess}>{this.props.children}</a>;
  },
  
  componentDidMount: function() {
    this.props.unsavedclass = null;
    $(this.refs.a.getDOMNode()).editable(this.props);
    $(this.refs.a.getDOMNode()).on('save', this.onSave);
  },
  
  onSave: function(/*e, params*/) {
    $(this.refs.a.getDOMNode()).removeClass('editable-unsaved');
    if(this.props.onSave) {
      this.props.onSave();
    }
  }
});

module.exports = Editable;
