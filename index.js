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
    const reset = () => {
      board.fill("");
      game.toggleYouWin();
    };

    return { getBoard, updateCell, reset };
  })();

  const displayController = (() => {
    const container = document.getElementById("container");
    const playerXScore = document.getElementById("X");
    const playerOScore = document.getElementById("O");
    container.addEventListener("click", (event) => {
      let target = event.target;
      switch (target.id) {
        case "0":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;
        case "1":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;

        case "2":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;
        case "3":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;
        case "4":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;
        case "5":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;
        case "6":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;
        case "7":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;
        case "8":
          console.log(`cell ${target.id} clicked`);
          game.makeMove(target.id);
          break;
        case "new_game":
          gameBoard.reset();
          console.log("new game button clicked");

          break;
        case "reset_score":
          console.log("reset button clicked");
          break;
        default:
          console.log("you clicked anything");
      }
    });

    const updateDom = () => {
      gameBoard.getBoard().map((cell, index) => {
        console.table(cell);
        let item = document.getElementById(index);
        item.textContent = cell;
        console.log(item);
      });
    };
    // console.log(container);
    // console.log(gameBoard.getBoard().slice(0, 3));
    // console.log(gameBoard.getBoard().slice(3, 6));
    // console.log(gameBoard.getBoard().slice(6, 9));
    updateDom();
    return { updateDom };
  })();

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
    let youWin = false;
    const toggleYouWin = () => (youWin = !youWin);
    let turn = playerX.marker;
    const currentPlayer = () => console.table(`it's Player ${turn} turn`);
    const playerMove = (index) => {};
    const resetBoard = gameBoard.reset;

    const makeMove = (index) => {
      if (!youWin) {
        // pick turn
        switch (turn) {
          case "X":
            gameBoard.updateCell(index, playerX.marker)
              ? (turn = playerO.marker)
              : console.info("Cell is already filled");
            displayController.updateDom();
            currentPlayer();
            winConditions.checkWins();

            break;
          case "O":
            gameBoard.updateCell(index, playerO.marker)
              ? (turn = playerX.marker)
              : console.info("Cell is already filled");
            displayController.updateDom();
            currentPlayer();
            winConditions.checkWins();
            break;
        }
      }
    };
    return { makeMove, turn, resetBoard, toggleYouWin };
  };
  const game = createGame();

  const winConditions = (() => {
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

        if (board[a] != "" && board[b] == board[a] && board[c] == board[a]) {
          console.table("player", board[a], "is the winner");
          game.toggleYouWin();
          return board[a];
        }
      }
      if (gameBoard.getBoard().filter((marker) => marker === "").length === 0) {
        console.table(gameBoard.getBoard());
        game.toggleYouWin();
        console.table("it's a draw");
      }
    };

    //   bameboard = gameBoard.board
    //   if (gameBoard.board[0]
    return { checkWins };
  })();

  const gameOver = () => {};

  console.table(
    "game start",

    "\n",
    "it's player ",
    game.turn,
    "turn",
  );

  return { game };
};

const game = playGame();
