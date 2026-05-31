// and let the js coding begin, it's been a while
// this sure as hell will be messy
//track board state
const playGame = () => {
  const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateCell = (index, marker) => {
      if (board[index] !== "") return false;
      board[index] = marker;
      return true;
    };

    const reset = () => board.fill("");

    return { getBoard, updateCell, reset };
  })();

  const displayController = () => {};
  function createPlayer(name) {
    const playerID = `Player ${name}`;
    const marker = name;
    let score = 0;
    const getScore = () => score;
    const updateScore = (newscore) => (score = newscore);

    return { playerID, marker, getScore, updateScore };
  }

  const playerX = createPlayer("X");
  const playerY = createPlayer("Y");
  playerX.updateScore(20);
  console.log(playerX.getScore(), playerX.marker);

  const winConditions = () => {
    [0, 1, 2][(3, 4, 5)][(6, 7, 8)];
    bameboard= gameBoard.board
    if (gameBoard.board[0]
  };
  gameBoard.updateCell(1, "X");
  console.log("game start", gameBoard.getBoard());
};

playGame();
