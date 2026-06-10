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

  function createPlayer(name) {
    const playerID = `Player ${name}`;
    const marker = name;
    let score = 0;
    const getScore = () => score;
    const updateScore = () => (score += 1);

    return { playerID, marker, getScore, updateScore };
  }

  const createGame = () => {
    //create players

    const playerX = createPlayer("X");
    const playerO = createPlayer("O");

    let youWin = false;
    const toggleYouWin = () => (youWin = !youWin);

    let turn = playerX.marker;
    const currentPlayer = () =>
      displayController.updateStatus(`Player ${turn} turn`);
    // console.table(`it's Player ${turn} turn`, console.log(game.youWin));

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
            // displayController.updateStatus(`Player ${turn} turn`);

            break;
          case "O":
            gameBoard.updateCell(index, playerO.marker)
              ? (turn = playerX.marker)
              : console.info("Cell is already filled");
            displayController.updateDom();
            currentPlayer();
            winConditions.checkWins();

            // displayController.updateStatus(`Player ${turn} turn`);

            break;
        }
      }
    };
    return {
      makeMove,
      turn,
      resetBoard,
      toggleYouWin,
      playerX,
      playerO,
      youWin,
    };
  };
  const game = createGame();

  const displayController = (() => {
    const container = document.getElementById("container");
    const statusBar = document.getElementById("status-bar");
    const playerXScore = document.getElementById("X");
    const playerOScore = document.getElementById("O");

    container.addEventListener("click", (event) => {
      let target = event.target;
      if (!isNaN(target.id) && target.id >= 0 && target.id <= 8) {
        console.log(`cell ${target.id} clicked`);
        game.makeMove(target.id);
      } else if (target.id === "new_game") {
        gameBoard.reset();
        updateDom();
        console.log(game.youWin);
        console.log("new game button clicked");
      } else if (target.id === "reset_score") {
        console.log("reset button clicked");
      } else {
        console.log("you clicked anything");
      }
    });

    const updateDom = () => {
      playerOScore.innerHTML = game.playerO.getScore();
      playerXScore.innerHTML = game.playerX.getScore();

      gameBoard.getBoard().map((cell, index) => {
        console.table(cell);
        let item = document.getElementById(index);
        item.textContent = cell;
        console.log(item);
      });
    };
    const updateStatus = (value) => {
      statusBar.innerHTML = value;
    };

    return { updateDom, updateStatus };
  })();

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
      const updateWinner = (x) =>
        displayController.updateStatus(`Game over ${x} wins`);
      const board = gameBoard.getBoard();
      // check wins
      for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];

        if (board[a] !== "" && board[b] === board[a] && board[c] === board[a]) {
          console.table("player", board[a], "is the winner");
          console.log("hello", game.youWin);

          if (board[a] === "X") {
            game.playerX.updateScore();
            updateWinner("X");
          } else {
            game.playerO.updateScore();
            updateWinner("O");
          }
          game.toggleYouWin();
          return board[a];
        }
      }
      if (gameBoard.getBoard().filter((marker) => marker === "").length === 0) {
        console.table(gameBoard.getBoard());
        console.log(game.youWin);
        game.toggleYouWin();
        console.table("it's a draw");
        displayController.updateStatus(`It's a Draw`);
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
