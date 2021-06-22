"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./routes/index"));

(0, _dotenv.config)();
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use(_index["default"]);
var port = process.env.PORT || 3000; // eslint-disable-next-line no-console

app.listen(port, function () {
  return console.log("Server started on localhost:".concat(port));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map