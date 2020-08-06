"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _Nestable = require("../Nestable");

var _Nestable2 = _interopRequireDefault(_Nestable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  position: "relative",
  padding: "10px 15px",
  fontSize: "20px",
  border: "1px solid #f9fafa",
  background: "#f9fafa",
  cursor: "pointer"
};
var handlerStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "10px",
  height: "100%",
  background: "steelblue",
  cursor: "pointer"
};

var items = [{
  id: 0,
  text: "Andy"
}, {
  id: 1,
  text: "Harry",
  foo: {
    bar: [{
      id: 2,
      text: "David"
    }]
  }
}, {
  id: 3,
  text: "Lisa",
  foo: {
    bar: [{
      id: 4,
      text: "Richard"
    }]
  }
}];

var grocery = [{
  id: 0,
  text: "Apples",
  type: "fruits"
}, {
  id: 1,
  text: "Fruit box",
  accepts: ["fruits"],
  foo: {
    bar: [{
      id: 2,
      text: "Bananas",
      type: "fruits"
    }]
  }
}, {
  id: 3,
  text: "Box",
  accepts: ["fruits", "sweets"],
  foo: {
    bar: [{
      id: 4,
      text: "Candy",
      type: "sweets"
    }]
  }
}];

var Example = function (_Component) {
  _inherits(Example, _Component);

  function Example() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      example: 1,
      defaultCollapsed: false
    }, _this.collapse = function (collapseCase) {
      if (_this.refNestable) {
        switch (collapseCase) {
          case 0:
            _this.refNestable.collapse("NONE");
            break;
          case 1:
            _this.refNestable.collapse("ALL");
            break;
          case 2:
            _this.refNestable.collapse([1]);
            break;
        }
      }
    }, _this.isCollapsed = function () {
      var form = document.forms[0] || null;

      return form && form.elements["collapsed"].checked;
    }, _this.renderItem = function (_ref2) {
      var item = _ref2.item,
          collapseIcon = _ref2.collapseIcon,
          handler = _ref2.handler;

      return _react2.default.createElement(
        "div",
        { style: styles },
        handler,
        collapseIcon,
        item.text
      );
    }, _this.renderExampleOne = function () {
      var defaultCollapsed = _this.state.defaultCollapsed;

      var onDefaultCollapsed = function onDefaultCollapsed() {
        return _this.setState({
          defaultCollapsed: !defaultCollapsed
        });
      };

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h2",
          null,
          "Basic example"
        ),
        _react2.default.createElement(_Nestable2.default, {
          items: items,
          collapsed: defaultCollapsed,
          renderItem: _this.renderItem,
          ref: function ref(el) {
            return _this.refNestable = el;
          },
          childrenProp: "foo.bar",
          onChange: function onChange(items, item) {
            console.warn(items, item);
          }
        }),
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "button",
          { type: "button", onClick: function onClick() {
              return _this.collapse(0);
            } },
          "Expand all"
        ),
        _react2.default.createElement(
          "button",
          { type: "button", onClick: function onClick() {
              return _this.collapse(1);
            } },
          "Collapse all"
        ),
        _react2.default.createElement(
          "button",
          { type: "button", onClick: function onClick() {
              return _this.collapse(2);
            } },
          "Collapse Harry only"
        ),
        _react2.default.createElement(
          "form",
          { style: { display: "inline-block" } },
          _react2.default.createElement(
            "label",
            null,
            _react2.default.createElement("input", {
              type: "checkbox",
              name: "collapsed",
              onChange: onDefaultCollapsed
            }),
            "Collapsed by default"
          )
        )
      );
    }, _this.renderExampleTwo = function () {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h2",
          null,
          "Example with handlers"
        ),
        _react2.default.createElement(_Nestable2.default, {
          items: items,
          renderItem: _this.renderItem,
          handler: _react2.default.createElement("span", { style: handlerStyles }),
          childrenProp: "foo.bar"
        })
      );
    }, _this.confirmChange = function (dragItem, destinationParent) {
      // move to root level
      if (!destinationParent) return true;

      return (destinationParent.accepts || []).indexOf(dragItem.type) > -1;
    }, _this.renderExampleThree = function () {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h2",
          null,
          "Example with confirmChange"
        ),
        _react2.default.createElement(_Nestable2.default, {
          items: grocery,
          renderItem: _this.renderItem,
          confirmChange: _this.confirmChange
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var example = this.state.example;

      var onExampleChange = function onExampleChange(e) {
        return _this2.setState({ example: +e.target.value });
      };

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "select",
          { onChange: onExampleChange, value: example },
          _react2.default.createElement(
            "option",
            { value: 1 },
            "Basic example"
          ),
          _react2.default.createElement(
            "option",
            { value: 2 },
            "Example with handlers"
          ),
          _react2.default.createElement(
            "option",
            { value: 3 },
            "Example with confirmChange"
          )
        ),
        _react2.default.createElement("hr", null),
        example === 1 && this.renderExampleOne(),
        example === 2 && this.renderExampleTwo(),
        example === 3 && this.renderExampleThree()
      );
    }
  }]);

  return Example;
}(_react.Component);

(0, _reactDom.render)(_react2.default.createElement(Example, null), document.getElementById("app"));