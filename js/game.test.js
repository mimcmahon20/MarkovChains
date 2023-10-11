const { initializeGame, processInvestment, nextState, calculateReturn } = require('./game');

test('should calculate correct return for Low to Medium transition', () => {
  const game = initializeGame();
  processInvestment(game, 200);
  game.stockState = 'Low';
  const newState = 'Medium';
  const returns = calculateReturn(game, newState);
  expect(returns).toBe(300); // Assuming a 1.5x multiplier for Low to Medium
});

test('should calculate correct return for Medium to High transition', () => {
  const game = initializeGame();
  processInvestment(game, 200);
  game.stockState = 'Medium';
  const newState = 'High';
  const returns = calculateReturn(game, newState);
  expect(returns).toBe(400); // Assuming a 2x multiplier for Medium to High
});

test("should transition to a valid state", () => {
  const game = initializeGame();
  const validStates = ["Low", "Medium", "High"];
  const newState = nextState(game);
  expect(validStates).toContain(newState);
});

test("should transition according to probabilities", () => {
  const game = initializeGame();
  game.stockState = "Medium";
  const transitions = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  // Simulate many transitions to approximate probabilities
  for (let i = 0; i < 1000; i++) {
    transitions[nextState(game)]++;
  }

  expect(transitions.Low).toBeGreaterThan(100);
  expect(transitions.Medium).toBeGreaterThan(500);
  expect(transitions.High).toBeGreaterThan(100);
});

test("should set initial player balance to 1000", () => {
  const game = initializeGame();
  expect(game.playerBalance).toBe(1000);
});

test("should set initial stock state to Low", () => {
  const game = initializeGame();
  expect(game.stockState).toBe("Low");
});

test("should set turn counter to 0", () => {
  const game = initializeGame();
  expect(game.turnCounter).toBe(0);
});

test("should set maximum number of turns to 10", () => {
  const game = initializeGame();
  expect(game.maxTurns).toBe(10);
});

test("should accept valid investment input", () => {
  const game = initializeGame();
  const investment = 200;
  expect(() => processInvestment(game)).not.toThrow();
});

test("should reject negative investment input", () => {
  const game = initializeGame();
  const investment = -200;
  expect(() => processInvestment(game, investment)).toThrow(
    "Investment must be a positive number"
  );
});

test("should reject investment input greater than player balance", () => {
  const game = initializeGame();
  const investment = 1200;
  expect(() => processInvestment(game)).toThrow(
    "Investment cannot exceed player balance"
  );
});

test("should reduce player balance by investment amount", () => {
  const game = initializeGame();
  const investment = 200;
  processInvestment(game, investment);
  expect(game.playerBalance).toBe(800);
});
