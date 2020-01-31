"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var name_entry_1 = require("./name-entry");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            name: {
                firstName: "Wen",
                lastName: "Chang"
            }
        };
        return _this;
    }
    App.prototype.onNameEntryChange = function (value) {
        this.setState({ name: value });
    };
    App.prototype.render = function () {
        return (React.createElement("div", null,
            "Hello Sir",
            React.createElement(name_entry_1.NameEntry, { value: this.state.name, onChange: this.onNameEntryChange.bind(this) })));
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=app.js.map