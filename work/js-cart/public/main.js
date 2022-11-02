/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PAGES": () => (/* binding */ PAGES),
/* harmony export */   "appEl": () => (/* binding */ appEl),
/* harmony export */   "cart": () => (/* binding */ cart),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var PAGES = {
  PRODUCT: 'product'
};
var appEl = document.querySelector('#app');
var state = {
  products: [{
    name: 'Fluffball',
    item: 'http://placekitten.com/150/150?image=1',
    price: 0.99
  }, {
    name: 'General Meyhem',
    item: 'http://placekitten.com/150/150?image=2',
    price: 3.14
  }, {
    name: 'Aegean',
    item: 'http://placekitten.com/150/150?image=3',
    price: 2.73
  }],
  page: PAGES.PRODUCT,
  viewCart: false
};
var cart = {
  items: {
    'Fluffball': {
      name: 'Fluffball',
      image: ' http://placekitten.com/50/50?image=1',
      price: 0,
      quantity: 0
    },
    'General Meyhem': {
      name: 'General Meyhem',
      image: ' http://placekitten.com/50/50?image=2',
      price: 0,
      quantity: 0
    },
    'Aegean': {
      name: 'Aegean',
      image: ' http://placekitten.com/50/50?image=3',
      price: 0,
      quantity: 0
    }
  },
  totalQuantity: 0,
  subtotal: 0
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
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
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var renderFor = _defineProperty({}, _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCT, renderProduct);

render();
addEventListener();

function render() {
  renderFor[_constants__WEBPACK_IMPORTED_MODULE_0__["default"].page]();
}

function renderProduct() {
  var productHtml = generateProductHtml(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].products);
  var viewCartHtml = generateViewCartHtml();
  var navigateHtml = generateNavigateHtml();
  _constants__WEBPACK_IMPORTED_MODULE_0__.appEl.innerHTML = "\n    <div class = \"shopping-products\">\n    <div class =\"products-page\">\n        <ul class=\"products\">\n        ".concat(productHtml, "\n        </ul>\n    </div>\n        ").concat(viewCartHtml, "\n    </div>\n        ").concat(navigateHtml, "\n        ");
}

function generateProductHtml(productList) {
  return productList.map(function (product, index) {
    return "\n        <li class=\"product\" >\n        <img\n        src=".concat(product.item, "\n        alt=\"a random cat\"\n        >\n        <div class=\"product-name\">").concat(product.name, "</div>\n        <div class=\"product-price\">$ ").concat(product.price, "</div>\n        <form action=\"\" class=\"add-cart\" data-index =").concat(index, ">\n       <button type=\"submit\"  class=\"product-cart--button\">Add to cart</button> \n       </form></li>\n            ");
  }).join('');
}

function generateNavigateHtml() {
  var viewButton = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart ? "Hide" : "View";
  var showQuantity = _constants__WEBPACK_IMPORTED_MODULE_0__.cart.totalQuantity ? "(" + _constants__WEBPACK_IMPORTED_MODULE_0__.cart.totalQuantity + ")" : "";
  return " <button type=\"button\" class=\"show-cart--button\" data-target=\"viewcart\">\n       ".concat(viewButton, " Cart ").concat(showQuantity, "\n   </button>");
}

function generateViewCartHtml() {
  var keys = Object.keys(_constants__WEBPACK_IMPORTED_MODULE_0__.cart.items);
  console.log({
    keys: keys
  });
  var checkSubtotal = _constants__WEBPACK_IMPORTED_MODULE_0__.cart.subtotal == 0 ? "empty-cart" : "view-cart";
  var showCart = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart ? "show" : "hide";
  var cartHtml = generateCart(keys);
  var emptyCart = generateEmptyCart(checkSubtotal);
  return "<div class=\"cart-page ".concat(showCart, "\">\n    <h3> Cart </h3>\n    <div class=\"cart-table ").concat(checkSubtotal, "\">\n        <table class='view-cart-table'>\n        <thead>\n          <tr>\n            <th>Product</th>\n            <th>Item</th>\n            <th>Quantity</th>\n            <th>Price</th>\n          </tr>\n        </thead>\n        <tbody class='cart-line-items'>\n        ").concat(cartHtml, "\n        </tbody>\n        <tfoot>\n          <tr>\n            <td colspan='3'><b>Subtotal</b></td>\n            <td class='cart-subtotal'>$ ").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.cart.subtotal.toFixed(2), "</td>\n          </tr>\n        </tfoot>\n      </table>\n      <form action=\"\" class=\"checkout\">\n      <button type=\"submit\"  class=\"checkout--button\">Checkout</button> \n      </form>\n      </div>\n      ").concat(emptyCart, "\n      </div>");
}

function generateCart(keys) {
  return keys.map(function (item, index) {
    var showItem = _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[item].quantity ? "show" : "hide";
    return "\n        <tr class=\"cart-items ".concat(showItem, "\">\n        <td class=\"item\" >\n        <img\n        src=").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[item].image, "\n        alt=\"a random cat\"\n        >\n        </td>\n        <td class=\"item-name\">").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[item].name, "</td>\n        <td class=\"item-quantity\">\n        <button\n        data-index=\"").concat(index, "\" class=\"decrement\" type=\"button\"> -\n        </button>\n            ").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[item].quantity, "\n        <button\n        data-index=\"").concat(index, "\" class=\"increment\" type=\"button\">\n        +\n        </button>\n        </td>\n        <td class=\"item-price\">$ ").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[item].price.toFixed(2), "</td>\n        </tr>\n        ");
  }).join('');
}

function generateEmptyCart(checkSubtotal) {
  return "<p class='msg ".concat(checkSubtotal, "'>Nothing in the cart.</p>");
}

function addEventListener() {
  _constants__WEBPACK_IMPORTED_MODULE_0__.appEl.addEventListener('submit', function (e) {
    if (e.target.classList.contains('add-cart')) {
      e.preventDefault();
      var index = e.target.dataset.index;
      console.log("click on <li> index ".concat(index));
      var prod = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].products.at(index);
      console.log({
        prod: prod
      });
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[prod.name].price += prod.price;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[prod.name].quantity += 1;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.subtotal += prod.price;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.totalQuantity += 1;
      console.log({
        cart: _constants__WEBPACK_IMPORTED_MODULE_0__.cart
      });
      render();
      return;
    }

    if (e.target.classList.contains('checkout')) {
      e.preventDefault();
      var keys = Object.keys(_constants__WEBPACK_IMPORTED_MODULE_0__.cart.items);
      keys.forEach(function (element, index) {
        _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[element].price = 0;
        _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[element].quantity = 0;
      });
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.subtotal = 0;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.totalQuantity = 0;
      console.log({
        cart: _constants__WEBPACK_IMPORTED_MODULE_0__.cart
      });
      render();
      return;
    }
  });
  _constants__WEBPACK_IMPORTED_MODULE_0__.appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('show-cart--button')) {
      // const target = e.target.dataset.target;
      _constants__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart = !_constants__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart;
      render();
      return;
    }

    if (e.target.classList.contains('decrement')) {
      var index = e.target.dataset.index;
      var prod = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].products.at(index);
      console.log({
        prod: prod
      });
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[prod.name].price -= prod.price;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[prod.name].quantity -= 1;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.subtotal -= prod.price;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.totalQuantity -= 1;

      if (_constants__WEBPACK_IMPORTED_MODULE_0__.cart.subtotal == 0) {
        render();
        return;
      }

      render();
      return;
    }

    if (e.target.classList.contains('increment')) {
      var _index = e.target.dataset.index;

      var _prod = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].products.at(_index);

      console.log({
        prod: _prod
      });
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[_prod.name].price += _prod.price;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.items[_prod.name].quantity += 1;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.subtotal += _prod.price;
      _constants__WEBPACK_IMPORTED_MODULE_0__.cart.totalQuantity += 1;
      render();
      return;
    }
  });
}
})();

/******/ })()
;
//# sourceMappingURL=main.js.map