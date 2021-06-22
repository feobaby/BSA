"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _group = _interopRequireDefault(require("../controllers/group"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

var Authenticate = _middlewares["default"].Authenticate;
var verifyToken = Authenticate.verifyToken;
var createUser = _user["default"].createUser,
    signInUser = _user["default"].signInUser,
    getAnAccount = _user["default"].getAnAccount,
    updateAnAccount = _user["default"].updateAnAccount,
    addMoney = _user["default"].addMoney,
    getHistory = _user["default"].getHistory;
var createGroup = _group["default"].createGroup,
    getAllGroups = _group["default"].getAllGroups,
    getAGroup = _group["default"].getAGroup,
    deleteAGroup = _group["default"].deleteAGroup,
    updateAGroup = _group["default"].updateAGroup,
    depositMoneyToGroup = _group["default"].depositMoneyToGroup,
    getAGroupYouArePartOf = _group["default"].getAGroupYouArePartOf;

var router = _express["default"].Router(); // Welcome Page


router.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to the Bill Sharing App.'
  });
}); // Authentication

router.post('/api/v1/auth/user', createUser);
router.post('/api/v1/auth/signin', signInUser); // Accounts

router.get('/api/v1/account', verifyToken, getAnAccount);
router.patch('/api/v1/account', verifyToken, updateAnAccount); // Money

router.patch('/api/v1/add-money', verifyToken, addMoney);
router.patch('/api/v1/group/add-money/:id', verifyToken, depositMoneyToGroup); // History

router.get('/api/v1/history', verifyToken, getHistory); // Groups

router.post('/api/v1/create-group', verifyToken, createGroup);
router.get('/api/v1/groups', verifyToken, getAllGroups);
router.get('/api/v1/group/:id', verifyToken, getAGroup);
router["delete"]('/api/v1/group/:id', verifyToken, deleteAGroup);
router.patch('/api/v1/group/:id', verifyToken, updateAGroup);
router.get('/api/v1/group', verifyToken, getAGroupYouArePartOf);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map