const game = {};
game.board = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];
game.turn = 1;
game.win = false;
game.wins = [0, 0];
game.filled = [0, 0, 0, 0, 0, 0, 0];
function Main() {
    for (x=0;x<7;x++) {
        if (game.filled[x] == 6) {
            document.getElementById("p"+x).disabled = true;
        } else {
            document.getElementById("p"+x).disabled = false;
        }
        if (game.win) {
            document.getElementById("p"+x).disabled = true;
        }
        for (y=0;y<6;y++) {
            slot = document.getElementById(x + "," + y);
            if (game.board[x][y] == 2) {
                slot.classList.add("red");
            } else {
                slot.classList.remove("red");
            }
            if (game.board[x][y] == 1) {
                slot.classList.add("blue");
            } else {
                slot.classList.remove("blue");
            }
            if (game.board[x][y] == 3) {
                slot.classList.add("winblue");
            } else {
                slot.classList.remove("winblue");
            }
            if (game.board[x][y] == 4) {
                slot.classList.add("winred");
            } else {
                slot.classList.remove("winred");
            }
        }
    }
    if (game.turn == 1) {
        document.getElementById("turn").innerHTML = "Current Turn: BLUE";
        document.getElementById("turn").classList.add("blue");
        document.getElementById("turn").classList.remove("red");
    } else {
        document.getElementById("turn").innerHTML = "Current Turn: RED";
        document.getElementById("turn").classList.add("red");
        document.getElementById("turn").classList.remove("blue");
        ComputerMove();
    }
    document.getElementById("bluewin").innerHTML = game.wins[0];
    document.getElementById("redwin").innerHTML = game.wins[1];
}
setInterval(Main, 50);
function ComputerMove() {
    mode = document.getElementById("ai").value;
    if (game.win) return;
    if (mode == '0') return;
    if (mode == '1') {
        while (true) {
            choice = Math.floor(Math.random() * 7);
            if (game.filled[choice] == 6) continue;
            else {
                Place(choice);
                break;
            };
        }
    }
    if (['2'].includes(mode)) {
        while (true) {
            board = [];
            for (const column of game.board) {
                for (const row of column) {
                    board.push(row);
                }
            }
            if (mode == 2) choice = run(board);
            
            max = [];
            for (i=0;i<7;i++) {
                max.push(choice[i]);
            }
            choice = max.indexOf(Math.max(...max));
            if (game.filled[choice] == 6) { console.log("bruh"); choice = Math.floor(Math.random() * 7); }
            if (game.filled[choice] == 6) { continue; }
            else {
                Place(choice);
                break;
            };
        }
    }
}
function Place(column) {
    if (game.filled[column] == 6) return;
    game.board[column][game.filled[column]] = game.turn;
    game.filled[column]++;
    if (game.turn == 1) {
        game.turn = 2;
    } else {
        game.turn = 1;
    }
    WinCheck();
}
function Reset() {
    game.board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    game.turn = 1;
    game.filled = [0, 0, 0, 0, 0, 0, 0];
    game.win = false;
}

function WinCheck() {
    //Blue: Vertical
    var win = false;
    for (cx=0;cx<7;cx++) for (cy=0;cy<3;cy++) {
        check = true;
        for (cz=0;cz<4;cz++) if (game.board[cx][cy+cz] !== 1) check = false;
        if (check) {
            win = true;
            for (cz=0;cz<4;cz++) game.board[cx][cy+cz] = 3;
        };
    }
    //Blue: Horizontal
    for (cx=0;cx<4;cx++) for (cy=0;cy<7;cy++) {
        check = true;
        for (cz=0;cz<4;cz++) if (game.board[cx+cz][cy] !== 1) check = false;
        if (check) {
            win = true;
            for (cz=0;cz<4;cz++) game.board[cx+cz][cy] = 3;
        };
    }
    //Blue: Diagonal Top Right
    for (cx=0;cx<4;cx++) for (cy=0;cy<2;cy++) {
        check = true;
        for (cz=0;cz<4;cz++) if (game.board[cx+cz][cy+cz] !== 1) check = false;
        if (check) {
            win = true;
            for (cz=0;cz<4;cz++) game.board[cx+cz][cy+cz] = 3;
        };
    }
    //Blue: Diagonal Top Left
    for (cx=3;cx<7;cx++) for (cy=0;cy<2;cy++) {
        check = true;
        for (cz=0;cz<4;cz++) if (game.board[cx-cz][cy+cz] !== 1) check = false;
        if (check) {
            win = true;
            for (cz=0;cz<4;cz++) game.board[cx-cz][cy+cz] = 3;
        };
    }
    if (win) {
        game.wins[0]++;
        game.win = true;
    }
    //Red: Vertical
    var win = false;
    for (cx=0;cx<7;cx++) for (cy=0;cy<3;cy++) {
        check = true;
        for (cz=0;cz<4;cz++) if (game.board[cx][cy+cz] !== 2) check = false;
        if (check) {
            win = true;
            for (cz=0;cz<4;cz++) game.board[cx][cy+cz] = 4;
        };
    }
    //Red: Horizontal
    for (cx=0;cx<4;cx++) for (cy=0;cy<7;cy++) {
        check = true;
        for (cz=0;cz<4;cz++) if (game.board[cx+cz][cy] !== 2) check = false;
        if (check) {
            win = true;
            for (cz=0;cz<4;cz++) game.board[cx+cz][cy] = 4;
        };
    }
    //Red: Diagonal Top Right
    for (cx=0;cx<4;cx++) for (cy=0;cy<2;cy++) {
        check = true;
        for (cz=0;cz<4;cz++) if (game.board[cx+cz][cy+cz] !== 2) check = false;
        if (check) {
            win = true;
            for (cz=0;cz<4;cz++) game.board[cx+cz][cy+cz] = 4;
        };
    }
    //Red: Diagonal Top Left
    for (cx=3;cx<7;cx++) for (cy=0;cy<2;cy++) {
        check = true;
        for (cz=0;cz<4;cz++) if (game.board[cx-cz][cy+cz] !== 2) check = false;
        if (check) {
            win = true;
            for (cz=0;cz<4;cz++) game.board[cx-cz][cy+cz] = 4;
        };
    }
    if (win) {
        game.wins[1]++;
        game.win = true;
    }
}