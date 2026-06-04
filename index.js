// and let the js coding begin, it's been a while
// this sure as hell will be messy
//track board state
const playGame = () => {
  const gameBoard = (() => {
    let board = ["O", "", "O", "X", "O", "X", "O", "X", "O"];
    // let board = ["", "", "", "", "", "", "", "", ""];

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

  const createGame = () => {
    //create players

    const playerX = createPlayer("X");
    const playerO = createPlayer("O");
    let turn = playerX.marker;
    const currentPlayer = () => console.log(`it's Player ${turn} turn`);
    const playerMove = (index) => {};

    const makeMove = (index) => {
      // pick turn
      switch (turn) {
        case "X":
          gameBoard.updateCell(index, playerX.marker)
            ? (turn = playerO.marker)
            : console.log("Cell is already filled");
          console.log(gameBoard.getBoard());
          currentPlayer();
          break;
        case "O":
          gameBoard.updateCell(index, playerO.marker)
            ? (turn = playerX.marker)
            : console.log("Cell is already filled");
          console.log(gameBoard.getBoard());
          currentPlayer();
          break;
      }
    };
    return { makeMove, turn };
  };
  const game = createGame();

  const winConditions = () => {
    const winsX = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    const winsY = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    const winsD = [
      [6, 4, 2],
      [0, 4, 8],
    ];

    const checkWins = () => {
      const wins = [...winsX, ...winsY, ...winsD];

      const board = gameBoard.getBoard();
      // check wins
      for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];
        console.log(a, b, c);
        if (board[a] != "" && board[b] == board[a] && board[c] == board[a]) {
          // return board[a];
        }
      }
      if (gameBoard.getBoard().filter((marker) => marker === "").length === 0) {
        console.log(gameBoard.getBoard());
        console.log("it's a draw");
      }
    };
    console.log(checkWins());

    //   bameboard = gameBoard.board
    //   if (gameBoard.board[0]
  };
  winConditions();
  const gameOver = () => {};

  gameBoard.updateCell(1, "X");
  console.log(
    "game start",
    gameBoard.getBoard(),
    "\n",
    "it's player ",
    game.turn,
    "turn",
  );
  return { game };
};

const game = playGame();
