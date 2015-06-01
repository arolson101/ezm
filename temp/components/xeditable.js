var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../project.d.ts"/>
var React = require("react");
var XEditableClass = (function (_super) {
    __extends(XEditableClass, _super);
    function XEditableClass() {
        _super.apply(this, arguments);
    }
    XEditableClass.prototype.render = function () {
        return React.DOM.a({
            href: "#",
            ref: "a"
        }, this.props.children);
    };
    XEditableClass.prototype.componentDidMount = function () {
        var $a = $(React.findDOMNode(this.refs["a"]));
        this.props.unsavedclass = null;
        $a.editable(this.props);
        $a.on('save', this.onSave);
    };
    XEditableClass.prototype.onSave = function () {
        var $a = $(React.findDOMNode(this.refs["a"]));
        $a.removeClass('editable-unsaved');
        if (this.props.onSave) {
            this.props.onSave();
        }
    };
    return XEditableClass;
})(React.Component);
var XSelectClass = (function (_super) {
    __extends(XSelectClass, _super);
    function XSelectClass(props) {
        props.type = "select";
        _super.call(this, props);
    }
    return XSelectClass;
})(XEditableClass);
exports.XSelectClass = XSelectClass;
var XTextClass = (function (_super) {
    __extends(XTextClass, _super);
    function XTextClass(props) {
        props.type = "text";
        _super.call(this, props);
    }
    return XTextClass;
})(XEditableClass);
exports.XTextClass = XTextClass;
exports.XSelect = React.createFactory(XSelectClass);
exports.XText = React.createFactory(XTextClass);
