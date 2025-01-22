/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/content.js":
/*!***************************!*\
  !*** ./src/js/content.js ***!
  \***************************/
/***/ (() => {

eval("// Debug: Log saat content script dijalankan\nconsole.log(\"Content script loaded\");\nchrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\n  // Debug: Log pesan yang diterima\n  console.log(\"Message received in content script:\", request);\n  if (request.action === \"scrape\") {\n    try {\n      var productData = scrapeProductData();\n\n      // Debug: Log data yang di-scrape\n      console.log(\"Scraped product data:\", productData);\n\n      // Pastikan ada data yang di-scrape\n      if (productData && Object.keys(productData).length > 0) {\n        sendResponse(productData);\n      } else {\n        throw new Error(\"Tidak dapat menemukan data produk\");\n      }\n    } catch (error) {\n      console.error(\"Scraping error:\", error);\n      sendResponse(null);\n    }\n    return true; // Penting untuk async sendResponse\n  }\n});\nfunction scrapeProductData() {\n  var _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4, _document$querySelect5, _document$querySelect6, _document$querySelect7;\n  // Debug: Log proses scraping\n  console.log(\"Scraping product data...\");\n\n  // Selector yang lebih spesifik untuk Shopee\n  var productInfo = {\n    title: ((_document$querySelect = document.querySelector(\".XD5xU\")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.textContent.trim()) || \"Tidak ada judul\",\n    productLink: window.location.href,\n    price: ((_document$querySelect2 = document.querySelector(\"._3-rad\")) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent.trim()) || \"Tidak ada harga\",\n    rating: ((_document$querySelect3 = document.querySelector(\".UMhmYh\")) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent.trim()) || \"Tidak ada rating\",\n    soldCount: ((_document$querySelect4 = document.querySelector(\".WTIuefa\")) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.textContent.trim()) || \"Tidak ada data penjualan\",\n    image1: ((_document$querySelect5 = document.querySelector(\".product-photo img\")) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.src) || \"Tidak ada gambar\",\n    description: ((_document$querySelect6 = document.querySelector(\".product-description\")) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.textContent.trim()) || \"Tidak ada deskripsi\",\n    shopName: ((_document$querySelect7 = document.querySelector(\".page-store-name\")) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.textContent.trim()) || \"Tidak ada nama toko\"\n  };\n\n  // Debug: Log hasil scraping\n  console.log(\"Product info:\", productInfo);\n  return productInfo;\n}\n\n//# sourceURL=webpack://shopee-scrap-ext/./src/js/content.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/content.js"]();
/******/ 	
/******/ })()
;