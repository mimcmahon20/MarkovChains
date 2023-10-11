let maxTurns = 2000;
let game = {
  playerBalance: 1000,
  stockState: "Low",
  turnCounter: 0,
  maxTurns: maxTurns,
  stockPrice: 50,
  stocksHeld: 0,
  previousStocks: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
};
let gameInterval;
let myChart;

function initializeGame() {
  game = {
    playerBalance: 1000,
    stockState: "Low",
    turnCounter: 0,
    maxTurns: maxTurns,
    stockPrice: 50,
    stocksHeld: 0,
    previousStocks: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
  };
  return game;
}

const transitionMatrix = {
  Low: { Low: 0.5, Medium: 0.3, High: 0.2 },
  Medium: { Low: 0.1, Medium: 0.7, High: 0.2 },
  High: { Low: 0, Medium: 0.3, High: 0.7 },
};

function nextState(game) {
  const probabilities = transitionMatrix[game.stockState];
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const state in probabilities) {
    cumulativeProbability += probabilities[state];
    if (random <= cumulativeProbability) {
      return state;
    }
  }
}

const returnMultipliers = {
  Low: { Low: -0.02, Medium: 0.02, High: 0.035 },
  Medium: { Low: -0.01, Medium: 0.025, High: 0.04 }, // Adjusted the multiplier for Medium to High to be 2x
  High: { Low: 0, Medium: 0.05, High: 0.07 },
};

function updateStockPrice(game, newState) {
  const multiplier = returnMultipliers[game.stockState][newState];
  const newPrice = game.stockPrice * (1 + multiplier);
  game.stockPrice = newPrice;
  game.previousStocks.push(newPrice);
}

function updateDisplay(game) {
  document.getElementById(
    "playerBalance"
  ).textContent = `$${game.playerBalance}`;
  //   document.getElementById(
  //     "stockState"
  //   ).textContent = `State: ${game.stockState}`;
  document.getElementById(
    "stockPriceDisplay"
  ).textContent = `MKV $${game.stockPrice}`;
  document.getElementById(
    "stocksHeldDisplay"
  ).textContent = `Stocks Held: ${game.stocksHeld}`;
  renderChart(game.previousStocks);
}

// Create a function to render the chart
function renderChart(data) {
  const ctx = document.getElementById("stockChart").getContext("2d");

  // Slice the data array to only include the last 10 prices
  const recentData = data.slice(-25);
  let minPrice = 25;
  let maxPrice = 75;
  data.forEach((price) => {
    if (price < minPrice) {
      minPrice = price;
    }
    if (price > maxPrice) {
      maxPrice = price;
    }
    if(minPrice > 35) {
        minPrice = 25;
    }
    if(maxPrice < 65) {
        maxPrice = 75;
    }
  });
  const recentLabels = Array.from(
    { length: recentData.length },
    (_, i) => i + 1
  ); // x-axis labels

  // Destroy the previous chart object if it exists
  if (myChart) {
    myChart.destroy();
  }

  // Assign the new chart object to the myChart variable
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: recentLabels,
      datasets: [
        {
          label: "Stock Price",
          data: recentData,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      animation: {
        duration: 0, // disables animation
      },
      scales: {
        x: {
          min: 1, // start at 1
          max: 25, // end at 10
          ticks: {
            stepSize: 1, // increment by 1
            font: {
                size: 0,
            }
          },
        },
        y: {
          min: minPrice, // start at 0
          max: maxPrice, // end at 100
          ticks: {
            stepSize: 25, // increment by 10
            //increase font size
            font: {
              size: 20,
            },
          },
        },
      },
    },
  });
}

function buyStocks() {
  const cost = game.stockPrice;
  if (game.playerBalance >= cost) {
    game.playerBalance -= cost;
    game.stocksHeld += 1;
    updateDisplay(game);
  } else {
    console.log("Not enough balance to buy stocks");
  }
}

function sellStocks() {
  if (game.stocksHeld >= 1) {
    const revenue = game.stockPrice * game.stocksHeld;
    game.playerBalance += revenue;
    game.stocksHeld = 0;
    updateDisplay(game);
  } else {
    console.log("Not enough stocks to sell");
  }
}

function gameLoop() {
  console.log("gameLoop");
  console.log(game);

  if (game.turnCounter <= game.maxTurns) {
    const newState = nextState(game);
    updateStockPrice(game, newState);
    updateDisplay(game);

    // Increment turn counter
    game.turnCounter++;

    // Check end condition
    if (game.turnCounter >= game.maxTurns) {
      //displayGameOver(game);
    }
  }
}

function startGame() {
  gameInterval = setInterval(gameLoop, 150); // Adjust interval as needed

  // Optionally: Disable the Start button to prevent it from being clicked again during the game
  document.getElementById("startButton").disabled = true;
}

function resetGame() {
  // Clear the game interval to stop the game loop
  clearInterval(gameInterval);

  // Re-initialize the game
  game = initializeGame();

  // Reset the UI to initial state
  updateDisplay(game);

  // Optionally: Re-enable the Start button
  document.getElementById("startButton").disabled = false;

  // Reset other UI elements and game variables as needed
}

// module.exports = {
//   initializeGame,
//   nextState,
//   calculateReturn,
//   submitInvestment,
//   gameLoop,
//   startGame,
//   resetGame,
// };

document
  .getElementById("stockSellButton")
  .addEventListener("click", sellStocks);
document.getElementById("stockBuyButton").addEventListener("click", buyStocks);

document.getElementById("startButton").addEventListener("click", startGame);

document.getElementById("resetButton").addEventListener("click", resetGame);

updateDisplay(game);

export {
  nextState,
  updateDisplay,
  startGame,
  resetGame,
  buyStocks,
  sellStocks,
};
