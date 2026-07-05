/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/cam-gcode-lathe.js"
/*!********************************!*\
  !*** ./lib/cam-gcode-lathe.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLatheGcodeFromOp: () => (/* binding */ getLatheGcodeFromOp)
/* harmony export */ });
// Copyright 2017 Todd Fleming
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GcodeGenerator = /*#__PURE__*/function () {
  function GcodeGenerator(_ref) {
    var decimal = _ref.decimal,
      toolFeedUnits = _ref.toolFeedUnits;
    _classCallCheck(this, GcodeGenerator);
    Object.assign(this, {
      decimal: decimal,
      toolFeedUnits: toolFeedUnits
    });
    if (toolFeedUnits === 'mm/s') this.feedScale = 60;else this.feedScale = 1;
    this.gcode = '';
  }
  return _createClass(GcodeGenerator, [{
    key: "getMotion",
    value: function getMotion(mode) {
      if (this.motionMode === mode) return '';
      this.motionMode = mode;
      return mode + ' ';
    }
  }, {
    key: "getFeed",
    value: function getFeed(f) {
      var strF = (f * this.feedScale).toFixed(this.decimal);
      var roundedF = Number(strF);
      if (this.f === roundedF) return '';
      this.f = roundedF;
      return 'F' + strF + ' ';
    }
  }, {
    key: "rapidZ",
    value: function rapidZ(z) {
      var strZ = z.toFixed(this.decimal);
      var roundedZ = Number(strZ);
      if (this.z === roundedZ) return;
      this.z = roundedZ;
      this.gcode += this.getMotion('G0') + 'Z' + strZ + '\n';
    }
  }, {
    key: "rapidXDia",
    value: function rapidXDia(xDia, backSide) {
      if (!backSide) xDia = -xDia;
      var strX = (xDia / 2).toFixed(this.decimal);
      var roundedX = Number(strX);
      if (this.x === roundedX) return;
      this.x = roundedX;
      this.gcode += this.getMotion('G0') + 'X' + strX + '\n';
    }
  }, {
    key: "moveZ",
    value: function moveZ(z, f) {
      var strZ = z.toFixed(this.decimal);
      var roundedZ = Number(strZ);
      if (this.z === roundedZ) return;
      this.z = roundedZ;
      this.gcode += this.getMotion('G1') + this.getFeed(f) + 'Z' + strZ + '\n';
    }
  }, {
    key: "moveXDia",
    value: function moveXDia(xDia, backSide, f) {
      if (!backSide) xDia = -xDia;
      var strX = (xDia / 2).toFixed(this.decimal);
      var roundedX = Number(strX);
      if (this.x === roundedX) return;
      this.x = roundedX;
      this.gcode += this.getMotion('G1') + this.getFeed(f) + 'X' + strX + '\n';
    }
  }]);
}();
; // GcodeGenerator

function latheConvFaceTurn(gen, showAlert, props) {
  var latheToolBackSide = props.latheToolBackSide,
    latheRapidToDiameter = props.latheRapidToDiameter,
    latheRapidToZ = props.latheRapidToZ,
    latheStartZ = props.latheStartZ,
    latheRoughingFeed = props.latheRoughingFeed,
    latheRoughingDepth = props.latheRoughingDepth,
    latheFinishFeed = props.latheFinishFeed,
    latheFinishDepth = props.latheFinishDepth,
    latheFinishExtraPasses = props.latheFinishExtraPasses,
    latheFace = props.latheFace,
    latheFaceEndDiameter = props.latheFaceEndDiameter,
    latheTurns = props.latheTurns,
    fluidOn = props.fluidOn,
    fluidOff = props.fluidOff;
  if (latheRapidToDiameter <= 0) return showAlert('latheRapidToDiameter <= 0', 'danger');
  if (latheStartZ > latheRapidToZ) return showAlert('latheStartZ > latheRapidToZ', 'danger');
  if (latheRoughingFeed <= 0) return showAlert('latheRoughingFeed <= 0', 'danger');
  if (latheRoughingDepth <= 0) return showAlert('latheRoughingDepth <= 0', 'danger');
  if (latheFinishFeed <= 0) return showAlert('latheFinishFeed <= 0', 'danger');
  if (latheFinishDepth < 0) return showAlert('latheFinishDepth < 0', 'danger');
  if (latheStartZ + latheFinishDepth > latheRapidToZ) return showAlert('latheStartZ + latheFinishDepth > latheRapidToZ', 'danger');
  if (latheFinishExtraPasses < 0) return showAlert('latheFinishExtraPasses < 0', 'danger');
  if (latheFace && latheFaceEndDiameter >= latheRapidToDiameter) return showAlert('latheFace && latheFaceEndDiameter >= latheRapidToDiameter', 'danger');
  if (!latheFace && !latheTurns.length) return showAlert('!latheFace && !latheTurns.length', 'danger');
  for (var i = 0; i < latheTurns.length; ++i) {
    if (latheTurns[i].startDiameter < 0) return showAlert('i=' + i + ': latheTurns[i].startDiameter < 0');
    if (i > 0 && latheTurns[i].startDiameter < latheTurns[i - 1].endDiameter) return showAlert('i=' + i + ': i > 0 && latheTurns[i].startDiameter < latheTurns[i - 1].endDiameter');
    if (latheTurns[i].startDiameter >= latheRapidToDiameter) return showAlert('i=' + i + ': latheTurns[i].startDiameter >= latheRapidToDiameter');
    if (latheTurns[i].endDiameter <= 0) return showAlert('i=' + i + ': latheTurns[i].endDiameter <= 0');
    if (latheTurns[i].endDiameter < latheTurns[i].startDiameter) return showAlert('i=' + i + ': latheTurns[i].endDiameter < latheTurns[i].startDiameter');
    if (latheTurns[i].endDiameter + latheFinishDepth >= latheRapidToDiameter) return showAlert('i=' + i + ': latheTurns[i].endDiameter + latheFinishDepth >= latheRapidToDiameter');
    if (latheTurns[i].endDiameter != latheTurns[i].startDiameter) return showAlert('i=' + i + ': latheTurns[i].endDiameter != latheTurns[i].startDiameter');
    if (latheTurns[i].length <= 0) return showAlert('i=' + i + ': latheTurns[i].length <= 0');
  }
  gen.gcode += '\r\n; latheToolBackSide:       ' + latheToolBackSide + '\r\n; latheRapidToDiameter:    ' + latheRapidToDiameter + ' mm' + '\r\n; latheRapidToZ:           ' + latheRapidToZ + ' mm' + '\r\n; latheStartZ:             ' + latheStartZ + ' mm' + '\r\n; latheRoughingFeed:       ' + latheRoughingFeed + gen.toolFeedUnits + '\r\n; latheRoughingDepth:      ' + latheRoughingDepth + ' mm' + '\r\n; latheFinishFeed:         ' + latheFinishFeed + gen.toolFeedUnits + '\r\n; latheFinishDepth:        ' + latheFinishDepth + ' mm' + '\r\n; latheFinishExtraPasses:  ' + latheFinishExtraPasses + '\r\n; latheFace:               ' + latheFace + '\r\n; latheFaceEndDiameter:    ' + latheFaceEndDiameter + ' mm' + '\r\n; Fluid:                   ';
  if (fluidOn || fluidOff) {
    gen.gcode += 'true';
  } else {
    gen.gcode += 'false';
  }
  ;
  gen.gcode += '';
  if (latheTurns.length) {
    gen.gcode += '\r\n; turns:';
    var _iterator = _createForOfIteratorHelper(latheTurns),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var turn = _step.value;
        gen.gcode += '\r\n;     startDiameter:       ' + turn.startDiameter + ' mm' + '\r\n;     endDiameter:         ' + turn.endDiameter + ' mm' + '\r\n;     length:              ' + turn.length + ' mm' + '';
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  gen.gcode += '\n\n; Rapid\n';
  gen.rapidXDia(latheRapidToDiameter, latheToolBackSide);
  gen.rapidZ(latheRapidToZ);
  if (latheFace) {
    gen.gcode += '\n; Face roughing\n';
    if (fluidOn) gen.gcode += "".concat(fluidOn, "; Enable Fluid assist\n");
    var z = latheRapidToZ;
    while (true) {
      var nextZ = Math.max(z - latheRoughingDepth, latheStartZ + latheFinishDepth);
      if (nextZ === z) break;
      z = nextZ;
      gen.moveZ(z, latheRoughingFeed);
      gen.moveXDia(latheFaceEndDiameter, latheToolBackSide, latheRoughingFeed);
      gen.moveZ(Math.min(z + latheRoughingDepth, latheRapidToZ), latheRoughingFeed);
      gen.rapidXDia(latheRapidToDiameter, latheToolBackSide);
    }
    gen.gcode += '\n; Face finishing\n';
    var n = latheFinishExtraPasses;
    if (z > latheStartZ) {
      ++n;
      z = latheStartZ;
    }
    for (var _i = 0; _i < n; ++_i) {
      gen.moveZ(z, latheFinishFeed);
      gen.moveXDia(latheFaceEndDiameter, latheToolBackSide, latheFinishFeed);
      gen.moveZ(Math.min(z + latheRoughingDepth, latheRapidToZ), latheFinishFeed);
      gen.rapidXDia(latheRapidToDiameter, latheToolBackSide);
    }
    latheRapidToZ = Math.min(z + latheRoughingDepth, latheRapidToZ);
    if (fluidOff) gen.gcode += "".concat(fluidOff, "; Disable Fluid assist\n");
    gen.rapidZ(latheRapidToZ);
  }
  if (latheTurns.length) {
    gen.gcode += '\n; Turn roughing\n';
    if (fluidOn) gen.gcode += "".concat(fluidOn, "; Enable Fluid assist\n");
    var turnRapidToDiameter = latheRapidToDiameter;
    var startX = turnRapidToDiameter - latheRoughingDepth;
    while (true) {
      var x = startX;
      var _z = latheRapidToZ;
      var turnStartZ = latheStartZ + latheFinishDepth;
      var done = false;
      var _iterator2 = _createForOfIteratorHelper(latheTurns),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _turn = _step2.value;
          if (x < _turn.startDiameter + latheFinishDepth && _turn.startDiameter + latheFinishDepth < startX + latheRoughingDepth) x = _turn.startDiameter + latheFinishDepth;
          if (x < _turn.startDiameter + latheFinishDepth) {
            if (_turn === latheTurns[0]) {
              done = true;
              break;
            }
            gen.moveXDia(x, latheToolBackSide, latheRoughingFeed);
            _z = turnStartZ;
            gen.moveZ(_z, latheRoughingFeed);
            gen.moveXDia(Math.min(x + latheRoughingDepth, turnRapidToDiameter), latheToolBackSide, latheRoughingFeed);
            break;
          } else {
            gen.moveXDia(x, latheToolBackSide, latheRoughingFeed);
            _z = turnStartZ - _turn.length;
            gen.moveZ(_z, latheRoughingFeed);
          }
          turnStartZ -= _turn.length;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (done) break;
      turnRapidToDiameter = Math.min(turnRapidToDiameter, x + latheRoughingDepth);
      startX -= latheRoughingDepth;
      gen.moveXDia(turnRapidToDiameter, latheToolBackSide, latheRoughingFeed);
      gen.rapidZ(latheRapidToZ);
    }
    gen.gcode += '\n; Turn finishing\n';
    gen.rapidXDia(latheTurns[0].startDiameter, latheToolBackSide);
    var _z2 = latheStartZ;
    var _iterator3 = _createForOfIteratorHelper(latheTurns),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _turn2 = _step3.value;
        gen.moveXDia(_turn2.startDiameter, latheToolBackSide, latheFinishFeed);
        _z2 -= _turn2.length;
        gen.moveZ(_z2, latheFinishFeed);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    gen.moveXDia(latheRapidToDiameter, latheToolBackSide, latheFinishFeed);
    if (fluidOff) gen.gcode += "".concat(fluidOff, "; Disable Fluid assist\n");
    gen.rapidZ(latheRapidToZ);
  } // if(latheTurns.length)

  gen.gcode += '\n';
} // latheConvFaceTurn

function getLatheGcodeFromOp(settings, opIndex, op, geometry, openGeometry, tabGeometry, showAlert, done, progress) {
  var gen = new GcodeGenerator(_objectSpread(_objectSpread({}, settings), {}, {
    decimal: 2
  }));
  gen.gcode = '\r\n;' + '\r\n; Operation:               ' + opIndex + '\r\n; Type:                    ' + op.type + '';
  if (op.hookOperationStart.length) gen.gcode += op.hookOperationStart;
  if (op.useFluid) {
    op.fluidOn = settings.machineFluidGcodeOn;
    op.fluidOff = settings.machineFluidGcodeOff;
  }
  if (op.type === 'Lathe Conv Face/Turn') latheConvFaceTurn(gen, showAlert, op);
  if (op.hookOperationEnd.length) gen.gcode += op.hookOperationEnd;
  done(gen.gcode);
} // getLatheGcodeFromOp

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./lib/workers/cam-lathe.worker.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cam_gcode_lathe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cam-gcode-lathe */ "./lib/cam-gcode-lathe.js");


onmessage = (event) => {
    const { settings, opIndex, op, geometry = [], openGeometry = [], tabGeometry = [] } = event.data
    const errors = [];

    const showAlert = (message, level) => {
        errors.push({ message, level })
    };
    const progress = () => {
        postMessage(JSON.stringify({ event: "onProgress", gcode, errors }))
    };
    const done = (gcode) => {
        if (gcode === false && errors.length) {
            postMessage(JSON.stringify({ event: "onError", errors }))
        } else {
            postMessage(JSON.stringify({ event: "onDone", gcode }))
        }
    };

    _cam_gcode_lathe__WEBPACK_IMPORTED_MODULE_0__.getLatheGcodeFromOp.apply(undefined, [settings, opIndex, op, geometry, openGeometry, tabGeometry, showAlert, done, progress])
}

})();

/******/ })()
;
//# sourceMappingURL=a10d617d6b50bbac7134.worker.js.map