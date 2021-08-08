// Game Board Canvas
var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');

// Game Board background color
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Matrix to reference board locations
var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Create Game Board
function drawBoard() {
    var w = canvas.width/3;
    var h = canvas.height/3;

    for (i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(w*i, 0);
        ctx.lineTo(w*i, canvas.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
    for (j = 0; j < 4; j++) {
        ctx.beginPath();
        ctx.moveTo(0, h*j);
        ctx.lineTo(canvas.width, h*j);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}
drawBoard();

// Determine mouse location on the canvas
function getMouse(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, 
                "Coordinate y: " + y);
    var array = {
        x: x, 
        y: y
    };
    return array;
};

// Draw an X to symbolize Human's Turn in Game
function drawX(row, col) {
    var w = canvas.width/3;
    var h = canvas.height/3;

    ctx.beginPath()
    ctx.moveTo(col*w+25, row*h+25);
    ctx.lineTo(col*w+125, row*h+125);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(col*w+25, row*h+125);
    ctx.lineTo(col*w+125, row*h+25);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

// Draw an O to symbolize AI Turn in Game
function drawO (row, col) {
    var w = canvas.width/3;
    var h = canvas.height/3;

    ctx.beginPath();
    ctx.arc(col*w+75, row*h+75, 50, 0, 2*Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

// Function to check equality
function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

// Check for winner
function checkWinner() {
    var winner = null;
    
    // Vertical Check
    for (var i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Horizontal Check
    for (var i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal Check
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    var openSpots = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

// Draw Line to show winning path
function drawLine() {
    var w = canvas.width/3;
    var h = canvas.height/3;

    // Vertical Check
    for (var i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            ctx.beginPath();
            ctx.moveTo(0*w+75, i*h+75);
            ctx.lineTo(2*w+75, i*h+75);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#b7a3c7";
            ctx.stroke();
            ctx.closePath();
        }
    }
    
    // Horizontal Check
    for (var i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            ctx.beginPath();
            ctx.moveTo(i*w+75, 0*h+75);
            ctx.lineTo(i*w+75, 2*h+75);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#b7a3c7";
            ctx.stroke();
            ctx.closePath();
        }
    };

    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        ctx.beginPath();
        ctx.moveTo(0*w+75, 0*h+75);
        ctx.lineTo(2*w+75, 2*h+75);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#b7a3c7";
        ctx.stroke();
        ctx.closePath();
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        ctx.beginPath();
        ctx.moveTo(2*w+75, 0*h+75);
        ctx.lineTo(0*w+75, 2*h+75);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#b7a3c7";
        ctx.stroke();
        ctx.closePath();
    }
}

// Event listener for the mouse click
var canvasElem = document.querySelector("Canvas");
canvasElem.addEventListener("mousedown", function(e) {
    var array = getMouse(canvasElem, e);

    // Human Player is X
    var w = canvas.width/3;
    var h = canvas.height/3;

    var row = 0;
    var col = 0;

    // X Coordinate - Column 1
    if (array.x < w && array.x > 0) {
        col = 0;
    // Column 2
    } else if (array.x < 2*w && array.x > w) {
        col = 1;
    // Column 3
    } else if (array.x < 3*w && array.x > 2*w) {
        col = 2;
    };

    // Y Coordinate - Row 1
    if (array.y < h && array.y > 0) {
        row = 0;
    // Row 2
    } else if (array.y < 2*h && array.y > h) {
        row = 1;
    // Row 3
    } else if (array.y < 3*h && array.y > 2*h) {
        row = 2;
    };

    // Verify that move is valid
    if (board[row][col] == '') {
        board[row][col] = 'X'
        drawX(row, col);
        var result = checkWinner()

        if (result == 'X') {
            console.log('X is the winner');
        } else if (result == null) {
            bestMove()
            result = checkWinner()
            if (result == 'O') {
                console.log('O is the winner');
            } else if (result == 'tie') {
                console.log('Tie, no one wins')
            }
        } else if (result == 'tie') {
            console.log('Tie, no one wins')
        }

        if (result != null) {
            drawLine()
        }

    } else {
        console.log('Not Valid')
    };
});

document.getElementById('restart_button').addEventListener('click', function(e) {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBoard()
});

