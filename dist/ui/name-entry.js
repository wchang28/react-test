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
var NameEntry = /** @class */ (function (_super) {
    __extends(NameEntry, _super);
    function NameEntry(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            name: {
                firstName: "",
                lastName: ""
            }
        };
        return _this;
    }
    NameEntry.getDerivedStateFromProps = function (props, state) {
        return {
            name: {
                firstName: (props.value && props.value.firstName ? props.value.firstName : ""),
                lastName: (props.value && props.value.lastName ? props.value.lastName : "")
            }
        };
    };
    NameEntry.prototype.onFirstNameChanged = function (event) {
        if (this.props.onChange) {
            var firstName = event.target.value;
            var value = Object.assign({}, this.state.name, { firstName: firstName });
            this.props.onChange(value);
        }
    };
    NameEntry.prototype.onLastNameChanged = function (event) {
        if (this.props.onChange) {
            var lastName = event.target.value;
            var value = Object.assign({}, this.state.name, { lastName: lastName });
            this.props.onChange(value);
        }
    };
    NameEntry.prototype.render = function () {
        return (React.createElement("div", { className: "w3-container w3-border w3-card-4" },
            React.createElement("p", null,
                React.createElement("label", null, "First Name"),
                React.createElement("input", { className: "w3-input", type: "text", value: this.state.name.firstName, onChange: this.onFirstNameChanged.bind(this) })),
            React.createElement("p", null,
                React.createElement("label", null, "Last Name"),
                React.createElement("input", { className: "w3-input", type: "text", value: this.state.name.lastName, onChange: this.onLastNameChanged.bind(this) }))));
    };
    return NameEntry;
}(React.Component));
exports.NameEntry = NameEntry;
//# sourceMappingURL=name-entry.js.map