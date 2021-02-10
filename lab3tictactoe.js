const blankimg = 'blank.png';
const Oimg = 'O.png';
const Ximg = 'X.png';
let target = undefined;
let rand = undefined;
let turn = 1;
let checkWin = false;

let state = ['N','N','N','N','N','N','N','N','N']
let winCond = [ [0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6] ]

let buttonlist = document.querySelectorAll('.button');

let resetbutton = document.querySelector('#reset');
resetbutton.addEventListener('click', event => {
    turn = 1;
    checkWin = false;
    state = ['N','N','N','N','N','N','N','N','N'];
    let text = document.querySelector('#result');
    text.innerHTML = "";

    buttonlist.forEach(item => {
        item.src = blankimg;
    })
    }
)

buttonlist.forEach(item => {
    var id = item.id;
    item.addEventListener('click', 
    event => {
        onClick(id);
    }
    );
})


function onClick(id) {

    if (state[id] == 'N' && checkWin == false ) {
        console.log(state[id]);
        target = document.getElementById(id);
        target.src = Ximg;
        state[id] = 'X';
        turn++;

        if (turn >= 4) checkConditions('X');
        
        if (turn <= 5 && checkWin == false) compSelect();
    }

}

function compSelect() {
    let flag = 0;
    while (flag == 0) {

        rand = Math.floor(Math.random() * 9); // from 0 to 8
    //    console.log('Roll on ' + rand);

        if (state[rand] == 'N') {
            target = document.getElementById(rand);
            target.src = Oimg;
            state[rand] = 'O';

            if (turn >= 4) checkConditions('O');
            flag = 1;
        }

    }
}

function checkConditions(player) {
    let i = undefined;
    for(i = 0 ; i < 8 ; i++) {
        let elem0 = winCond[i][0];
        let elem1 = winCond[i][1];
        let elem2 = winCond[i][2];
        if ( state[elem0] == state[elem1] && state[elem1] == state[elem2] && state[elem0] == player) {
            console.log(player + " wins");
            checkWin = true;

            if (player == 'X') {
                let text = document.querySelector('#result');
                text.innerHTML = "You win!";
            }
            else if (player == 'O') {
                let text = document.querySelector('#result');
                text.innerHTML = "Computer wins";
            }
           
        }
        if (turn >= 6 && checkWin == false) {
            let text = document.querySelector('#result');
            text.innerHTML = "Draw";
        }
    }
}