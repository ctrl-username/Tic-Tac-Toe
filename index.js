// and let the js coding begin, it's been a while
// this sure as hell will be messy
//track board state
const playGame = () => {
  const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const updateCell = (index, marker) => {
      if (board[index != ""]) return false;
      board[index] = marker;
      return true;
    };
    const reset = () => board.fill("");
    return { getBoard, updateCell, reset };
  })();
  console.log("game start", gameBoard.getBoard());
};

playGame();
