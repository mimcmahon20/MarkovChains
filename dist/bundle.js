/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   calculateReturn: () => (/* binding */ calculateReturn),\n/* harmony export */   nextState: () => (/* binding */ nextState),\n/* harmony export */   processInvestment: () => (/* binding */ processInvestment),\n/* harmony export */   resetGame: () => (/* binding */ resetGame),\n/* harmony export */   startGame: () => (/* binding */ startGame),\n/* harmony export */   updateDisplay: () => (/* binding */ updateDisplay)\n/* harmony export */ });\n function initializeGame() {\n  const game = {\n    playerBalance: 1000,\n    stockState: \"Low\",\n    turnCounter: 0,\n    maxTurns: 10,\n  };\n  return game;\n}\n\nfunction processInvestment(game, investment) {\n  if (investment <= 0) {\n    throw new Error(\"Investment must be a positive number\");\n  }\n  if (investment > game.playerBalance) {\n    throw new Error(\"Investment cannot exceed player balance\");\n  }\n  game.playerBalance -= investment;\n  game.investment = investment; // Store the investment amount for later use in calculating returns\n}\n\nconst transitionMatrix = {\n  Low: { Low: 0.7, Medium: 0.3, High: 0 },\n  Medium: { Low: 0.2, Medium: 0.6, High: 0.2 },\n  High: { Low: 0, Medium: 0.3, High: 0.7 },\n};\n\nfunction nextState(game) {\n  const probabilities = transitionMatrix[game.stockState];\n  const random = Math.random();\n  let cumulativeProbability = 0;\n\n  for (const state in probabilities) {\n    cumulativeProbability += probabilities[state];\n    if (random <= cumulativeProbability) {\n      return state;\n    }\n  }\n}\n\nconst returnMultipliers = {\n  Low: { Low: 1, Medium: 1.5, High: 2 },\n  Medium: { Low: 0.5, Medium: 1, High: 2 }, // Adjusted the multiplier for Medium to High to be 2x\n  High: { Low: 0.2, Medium: 0.5, High: 1 },\n};\n\nfunction calculateReturn(game, newState) {\n  const multiplier = returnMultipliers[game.stockState][newState];\n  const returns = game.investment * multiplier;\n  game.playerBalance += returns;\n  return returns;\n}\n\nfunction updateDisplay(game) {\n  document.getElementById(\n    \"playerBalance\"\n  ).textContent = `Player Balance: $${game.playerBalance}`;\n  document.getElementById(\n    \"stockState\"\n  ).textContent = `Current Stock State: ${game.stockState}`;\n  document.getElementById(\n    \"investmentDisplay\"\n  ).textContent = `Amount Invested: $${game.investment}`;\n  document.getElementById(\"returnDisplay\").textContent = `Amount Returned: $${\n    game.investment * returnMultipliers[game.stockState][game.newState]\n  }`;\n}\n\nlet currentInvestment = 0;\n\nfunction submitInvestment() {\n  const investmentInput = document.getElementById(\"investmentInput\");\n  const investment = parseFloat(investmentInput.value);\n  // Validate investment (you should improve this validation logic)\n  if (investment > 0 && investment <= game.playerBalance) {\n    currentInvestment = investment;\n  }\n}\n\nfunction gameLoop() {\n    console.log('gameLoop')\n    console.log(game)\n  // Process current investment\n  processInvestment(game, currentInvestment);\n\n  for (let i = 0; i < game.maxTurns; i++) {\n    // Here you would capture player's investment input, possibly through a form in the UI\n    const investment = prompt(\"Enter your investment amount:\"); // This is just an example; you'd likely have a better way to capture this input\n    processInvestment(game, investment);\n\n    const newState = nextState(game);\n    calculateReturn(game, newState);\n    updateDisplay(game);\n\n    // Increment turn counter\n    game.turnCounter++;\n\n    // Check end condition\n    if (game.turnCounter >= game.maxTurns) {\n      displayGameOver(game);\n    }\n    currentInvestment = 0;\n  }\n  // After processing the turn, you might reset currentInvestment\n}\n\nfunction startGame() {\n  // Initialize game and start the game loop\n  game = initializeGame();\n  gameInterval = setInterval(gameLoop, 10000); // Adjust interval as needed\n\n  // Optionally: Disable the Start button to prevent it from being clicked again during the game\n  document.getElementById(\"startButton\").disabled = true;\n}\n\nfunction resetGame() {\n  // Clear the game interval to stop the game loop\n  clearInterval(gameInterval);\n\n  // Re-initialize the game\n  game = initializeGame();\n\n  // Reset the UI to initial state\n  updateDisplay(game);\n\n  // Optionally: Re-enable the Start button\n  document.getElementById(\"startButton\").disabled = false;\n\n  // Reset other UI elements and game variables as needed\n  currentInvestment = 0;\n}\n\n// module.exports = {\n//   initializeGame,\n//   processInvestment,\n//   nextState,\n//   calculateReturn,\n//   submitInvestment,\n//   gameLoop,\n//   startGame,\n//   resetGame,\n// };\n\n\n\n//# sourceURL=webpack://markovchains/./js/game.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../js/game.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;