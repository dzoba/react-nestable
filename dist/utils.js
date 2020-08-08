"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllNonEmptyNodesIds = exports.listWithChildren = exports.getTransformProps = exports.getTotalScroll = exports.getOffsetRect = exports.closest = exports.isArray = exports.isString = exports.isNumber = exports.isFunction = exports.isUndefined = exports.isDefined = exports.objectType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectType = exports.objectType = function objectType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};
var isDefined = exports.isDefined = function isDefined(param) {
  return typeof param != "undefined";
};
var isUndefined = exports.isUndefined = function isUndefined(param) {
  return typeof param == "undefined";
};
var isFunction = exports.isFunction = function isFunction(param) {
  return typeof param == "function";
};
var isNumber = exports.isNumber = function isNumber(param) {
  return typeof param == "number" && !isNaN(param);
};
var isString = exports.isString = function isString(str) {
  return objectType(str) === "String";
};
var isArray = exports.isArray = function isArray(arr) {
  return objectType(arr) === "Array";
};

var closest = exports.closest = function closest(target, selector) {
  // closest(e.target, '.field')
  while (target) {
    if (target.matches && target.matches(selector)) return target;
    target = target.parentNode;
  }
  return null;
};

var getOffsetRect = exports.getOffsetRect = function getOffsetRect(elem) {
  // (1)
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docElem = document.documentElement;

  // (2)
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

  // (3)
  var clientTop = docElem.clientTop || body.clientTop || 0;
  var clientLeft = docElem.clientLeft || body.clientLeft || 0;

  // (4)
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

var getTotalScroll = exports.getTotalScroll = function getTotalScroll(elem) {
  var top = 0;
  var left = 0;

  while (elem = elem.parentNode) {
    top += elem.scrollTop || 0;
    left += elem.scrollLeft || 0;
  }

  return { top: top, left: left };
};

var getTransformProps = exports.getTransformProps = function getTransformProps(x, y) {
  return {
    transform: "translate(" + x + "px, " + y + "px)"
  };
};

var listWithChildren = exports.listWithChildren = function listWithChildren(list, childrenProp) {
  return list.map(function (item) {
    var childObj = (0, _set2.default)({}, childrenProp, (0, _get2.default)(item, childrenProp) ? listWithChildren((0, _get2.default)(item, childrenProp), childrenProp) : []);
    return _extends({}, item, childObj);
  });
};

var getAllNonEmptyNodesIds = exports.getAllNonEmptyNodesIds = function getAllNonEmptyNodesIds(items, childrenProp) {
  var childrenIds = [];
  var ids = items.filter(function (item) {
    return (0, _get2.default)(item, childrenProp).length;
  }).map(function (item) {
    childrenIds = childrenIds.concat(getAllNonEmptyNodesIds((0, _get2.default)(item, childrenProp), childrenProp));
    return item._id;
  });

  return ids.concat(childrenIds);
};