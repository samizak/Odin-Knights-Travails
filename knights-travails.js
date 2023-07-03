const squareRegistry = new Map();

const Board = (x, y) => {
  const xPos = x;
  const yPos = y;
  let predecessor;

  const getPredecessor = () => predecessor;
  const setPredecessor = (newPred) => {
    predecessor ||= newPred;
  };

  const knightMoves = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  const name = () => `${x},${y}`;

  const createKnightMoves = () => {
    return knightMoves.map(nextSquareMove).filter(Boolean);
  };

  const nextSquareMove = ([xOffset, yOffset]) => {
    const [newX, newY] = [xPos + xOffset, yPos + yOffset];
    if (0 <= newX && newX < 8 && 0 <= newY && y < 8) {
      return Board(newX, newY);
    }
  };

  if (squareRegistry.has(name())) return squareRegistry.get(name());

  const newSquare = { name, getPredecessor, setPredecessor, createKnightMoves };
  squareRegistry.set(name(), newSquare);
  return newSquare;
};

const knightMoves = (start, finish) => {
  squareRegistry.clear();

  const origin = Board(...start);
  const target = Board(...finish);
  const queue = [origin];

  while (!queue.includes(target)) {
    const currentSquare = queue.shift();
    const enqueueList = currentSquare.createKnightMoves();

    enqueueList.forEach((square) => square.setPredecessor(currentSquare));
    queue.push(...enqueueList);
  }

  const path = [target];
  while (!path.includes(origin)) {
    const prevSquare = path[0].getPredecessor();
    path.unshift(prevSquare);
  }

  console.log(`You made it in ${path.length - 1} moves!  Here's your path:`);

  path.forEach((square) => console.log(`[${square.name()}]`));
};

console.log(knightMoves([3, 3], [4, 3]));

module.exports = knightMoves;
