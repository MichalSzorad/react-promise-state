"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _index = require("./index");

var _enzyme = require("enzyme");

var _enzymeAdapterReact = require("enzyme-adapter-react-16");

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

describe("react-promise-state", function () {
  it("Should call render function", function () {
    var fn = jest.fn().mockReturnValue(1);
    var component = (0, _enzyme.mount)(_react2.default.createElement(_index.ReactPromiseState, { render: fn, run: _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", 1);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      })) }));
    expect(fn).toBeCalled();
  });

  it("Should return what render function returns", function () {
    var fn = jest.fn().mockReturnValue(123);
    var component = (0, _enzyme.mount)(_react2.default.createElement(_index.ReactPromiseState, { render: fn, run: _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", 1);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      })) }));
    expect(component.text()).toBe("123");
  });

  it("Should give state parameter to fn", function () {
    var fn = jest.fn().mockReturnValue(null);
    var runMock = jest.fn().mockReturnValue(Promise.resolve(1));
    var component = (0, _enzyme.mount)(_react2.default.createElement(_index.ReactPromiseState, { render: fn, run: runMock }));

    expect(fn.mock.calls[0][0]).toMatchObject({
      done: false,
      error: null,
      result: null,
      pending: false
    });

    expect(_typeof(fn.mock.calls[0][0].run)).toBe("function");
  });

  it("Should call render function when run called", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var fn, runMock, component;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fn = jest.fn().mockReturnValue(null);
            runMock = jest.fn().mockReturnValue(Promise.resolve(1));
            component = (0, _enzyme.mount)(_react2.default.createElement(_index.ReactPromiseState, { render: fn, run: runMock }));


            fn.mock.calls[0][0].run();

            _context3.next = 6;
            return sleep(500);

          case 6:

            expect(fn).toHaveBeenCalledTimes(3);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it("Should change it's state to pending when run called", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var fn, runMock, component;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            fn = jest.fn().mockReturnValue(null);
            runMock = jest.fn().mockReturnValue(Promise.resolve(1));
            component = (0, _enzyme.mount)(_react2.default.createElement(_index.ReactPromiseState, { render: fn, run: runMock }));


            fn.mock.calls[0][0].run();

            expect(fn.mock.calls[1][0]).toMatchObject({
              done: false,
              error: null,
              pending: true,
              result: null
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it("Should change it's state when run called and promise resolved", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var fn, runMock, component;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            fn = jest.fn().mockReturnValue(null);
            runMock = jest.fn().mockReturnValue(Promise.resolve(123));
            component = (0, _enzyme.mount)(_react2.default.createElement(_index.ReactPromiseState, { render: fn, run: runMock }));


            fn.mock.calls[0][0].run();

            _context5.next = 6;
            return sleep(500);

          case 6:

            expect(fn.mock.calls[2][0]).toMatchObject({
              done: true,
              error: null,
              pending: false,
              result: 123
            });

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it("Should change it's state when run called and promise rejected", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var fn, error, runMock, component;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            fn = jest.fn().mockReturnValue(null);
            error = new Error();
            runMock = jest.fn().mockImplementation(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      throw error;

                    case 1:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, undefined);
            })));
            component = (0, _enzyme.mount)(_react2.default.createElement(_index.ReactPromiseState, { render: fn, run: runMock }));


            fn.mock.calls[0][0].run();

            _context7.next = 7;
            return sleep(500);

          case 7:

            expect(fn.mock.calls[2][0]).toMatchObject({
              done: true,
              error: error,
              pending: false,
              result: null
            });

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  it("Should call runMock with arguments given to run from renderProp function", function () {
    var fn = jest.fn().mockReturnValue(null);
    var runMock = jest.fn().mockReturnValue(Promise.resolve(123));
    var component = (0, _enzyme.mount)(_react2.default.createElement(_index.ReactPromiseState, { render: fn, run: runMock }));

    var target = { hello: 1 };

    fn.mock.calls[0][0].run(target);

    expect(runMock).toHaveBeenCalledWith(target);
  });
});