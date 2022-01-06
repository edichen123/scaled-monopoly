let player1Move = 0; //p1 move how many position
let player2Move = 0; //p2 move how many position
let currentPlayer = 0; //current player 0 = Edi, 1 = Aii
// let start = true;
// let currentPosition1 = 0;
// let currentPosition2 = 0;
// let nextPosition1 = 0;
// let nextPosition2 =0;
const players = [
  { name: "Edi", wallet: 1000, property: [], score: 0 },
  { name: "Aii-i", wallet: 1000, property: [], score: 0 },
]; //declaring properties for arr.obj for player1&2

const die = () => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  return dice1 + dice2;
}; //roll 2 dice function 1-6 * 2 = 2-12

die(); //calling die to get number 2-12

const main = () => {}; //currently empty

const boardinfo1 = [
  { name: "Start", price: 0, pos: 0, owner: "" },
  { name: "Jurong East", price: 100, pos: 1, owner: "" },
  { name: "Clementi", price: 150, pos: 2, owner: "" },
  { name: "Dover", price: 300, pos: 3, owner: "" },
  { name: "Buona Vista", price: 200, pos: 4, owner: "" },
  { name: "CommonWealth", price: 50, pos: 5, owner: "" },
  { name: "Queenstown", price: 500, pos: 6, owner: "" },
  { name: "Redhill", price: 240, pos: 7, owner: "" },
  { name: "Tiong Bahru", price: 330, pos: 8, owner: "" },
  { name: "Outram Park", price: 200, pos: 9, owner: "" },
  { name: "Tanjong Pagar", price: 190, pos: 10, owner: "" },
  { name: "Raffles Place", price: 180, pos: 11, owner: "" },
  { name: "Dhoby Ghaut", price: 400, pos: 12, owner: "" },
  { name: "Somerset", price: 220, pos: 13, owner: "" },
  { name: "Orchard", price: 330, pos: 14, owner: "" },
  { name: "Marina Bay Sands", price: 400, pos: 15, owner: "" },
]; //global board items
const togglePlayer = () => {
  currentPlayer = currentPlayer === 0 ? 1 : 0; //if 0= true, return 1, if false, return 0
  return currentPlayer;
}; //toggle function to switch between p1&2

const restart = () => {
  const tileP1 = document.querySelector(".pOne0");
  tileP1.classList.add("black");
  const tileP2 = document.querySelector(".pTwo0");
  tileP2.classList.add("pink");
}; //restart function to set p1&2 at start line

const maxBox = (move, board) => {
  const withinBoard = -16;
  if (currentPlayer === 0) {
    if (move >= board.length) {
      player1Move += withinBoard;
    }
  }
  if (currentPlayer === 1) {
    if (move >= board.length) {
      player2Move += withinBoard;
    }
  }
}; //max steps of board = 16 (0-15), if p1 pos = 15, roll 3 = 18? on board should go to 2* hence -16 to get right pos

const add200 =()=>{
    if (currentPlayer===0 && player1Move){
        maxBox(player1Move, boardinfo1);
        players[currentPlayer].wallet += 200;
        alert(`Going pass Start line gives you: $200`);
        console.log(players[currentPlayer].wallet);


    } else if (currentPlayer===1){


        players[currentPlayer].wallet += 200;
        alert(`Going pass Start line gives you: $200`);
        console.log(players[currentPlayer].wallet);
    }
}
const buyProperty = (move, boardinfo1object) => {
  if (currentPlayer === 0) {
    players[currentPlayer].wallet -= boardinfo1object[move].price;
  } else if (currentPlayer === 1) {
    players[currentPlayer].wallet -= boardinfo1object[move].price;
  }
};

const didPlayerWin = () => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].wallet <= 0) {
      alert(`${players[i].name} lost the game`);
    }
  }
  return;
};

const clickRoll = () => {
  maxBox(player1Move, boardinfo1);
  let randomNum = die(); //store dice output in randomNum
  if (currentPlayer === 0) {
    let tileP1B = document.querySelector(`.pOne${player1Move}`);
    tileP1B.classList.toggle("black");
    player1Move += randomNum;
    maxBox(player1Move, boardinfo1);
    tileP1B = document.querySelector(`.pOne${player1Move}`);
    tileP1B.classList.toggle("black");
    buyProperty(player1Move, boardinfo1);
    togglePlayer();
    console.log("Player 1 Wallet", players[0].wallet);
    console.log("Player1 Pos", player1Move);
    console.log("Player1 Dice roll", randomNum);
    // tile.classList.remove("black");
  } else if (currentPlayer === 1) {
    let tileP2B = document.querySelector(`.pTwo${player2Move}`);
    tileP2B.classList.toggle("pink");
    player2Move += randomNum;
    maxBox(player2Move, boardinfo1);
    tileP2B = document.querySelector(`.pTwo${player2Move}`);
    tileP2B.classList.toggle("pink");
    buyProperty(player2Move, boardinfo1);
    togglePlayer();
    console.log("Player 2 Wallet", players[1].wallet);
    console.log("Player2 Pos", player2Move);
    console.log("Player2 Dice roll", randomNum);
  }
  didPlayerWin();
}; // Starting function, press roll to trigger dice roll
//winning condition
// clickRoll();
restart();

let ROLLBUTTON = document.getElementById("rollButton");
ROLLBUTTON.addEventListener("click", clickRoll);

const loadBoard = () => {
  for (let i = 0; i < boardinfo1.length; i++) {
    let card = document.querySelector(`.sq${i}`);
    card.innerText = boardinfo1[i].name + " " + "$" + boardinfo1[i].price;
  }
};
loadBoard(); //populate board
main();
