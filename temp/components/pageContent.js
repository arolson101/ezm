/// <reference path="../project.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Radium = require("radium");
var PageContent = (function (_super) {
    __extends(PageContent, _super);
    function PageContent() {
        _super.apply(this, arguments);
    }
    PageContent.prototype.render = function () {
        /*var style = { minHeight: this.props.wrapperMinHeight };
        if(style.minHeight == 0) {
        delete style.minHeight;
        }*/
        return (React.createElement("div", {"style": PageContent.style}, this.props.children));
    };
    PageContent.style = {
        padding: "0 15px",
        minHeight: 568,
        backgroundColor: "#fff",
        "@media (min-width: 768px)": {
            position: "inherit",
            margin: "0 0 0 250px",
            padding: "0 30px",
            borderLeft: "1px solid #e7e7e7"
        }
    };
    PageContent = __decorate([
        Radium, 
        __metadata('design:paramtypes', [])
    ], PageContent);
    return PageContent;
})(React.Component);
exports.PageContent = PageContent;
