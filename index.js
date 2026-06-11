// and let the js coding begin, it's been a while
// this sure as hell will be messy
//track board state
(() => {
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
    const resetScore = () => (score = 0);

    return { playerID, marker, getScore, updateScore, resetScore };
  }

  const createGame = () => {
    // add players name
    const player1 = prompt("Player X name: ") || "X";
    const player2 = prompt("Player O name: ") || "O";

    //create players

    const playerX = createPlayer(player1);
    const playerO = createPlayer(player2);

    let youWin = false;
    const toggleYouWin = () => (youWin = !youWin);

    let turn = playerX.marker;
    const currentPlayer = () =>
      displayController.updateStatus(`Player ${turn} turn`);

    const resetBoard = gameBoard.reset;

    const makeMove = (index) => {
      if (!youWin) {
        // pick turn
        switch (turn) {
          case "X":
            gameBoard.updateCell(index, playerX.marker)
              ? (turn = playerO.marker)
              : alert("Cell is already filled");

            displayController.updateDom();
            currentPlayer();
            winConditions.checkWins();
            // displayController.updateStatus(`Player ${turn} turn`);

            break;
          case "O":
            gameBoard.updateCell(index, playerO.marker)
              ? (turn = playerX.marker)
              : alert("Cell is already filled");
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
        game.makeMove(target.id);
      } else if (target.id === "new_game") {
        gameBoard.reset();
        statusBar.innerHTML = "Player X turn";
        updateDom();
      } else if (target.id === "reset_Game") {
        game.playerX.resetScore();
        game.playerO.resetScore();
        updateDom();
      }
    });

    const updateDom = () => {
      playerOScore.innerHTML = game.playerO.getScore();
      playerXScore.innerHTML = game.playerX.getScore();

      gameBoard.getBoard().map((cell, index) => {
        let item = document.getElementById(index);
        item.textContent = cell;
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
      const updateWinner = (x) => (
        displayController.updateStatus(`Game over ${x} wins`),
        displayController.updateDom()
      );
      const board = gameBoard.getBoard();
      // check wins
      for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i];

        if (board[a] !== "" && board[b] === board[a] && board[c] === board[a]) {
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
        game.toggleYouWin();

        displayController.updateStatus(`It's a Draw`);
      }
    };
    return { checkWins };
  })();
})();
