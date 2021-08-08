function bestMove() {
    // AI takes its turn
    var bestScore = -Infinity;
    var move;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            // Check is spot is available
            if (board[i][j] == '') {
                board[i][j] = 'O';
                var score = minimax(board, 0, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = {i, j};
                }
            }
        }
    }
    board[move.i][move.j] = "O";
    drawO(move.i, move.j);
}

var scores = {
    O: 10, 
    X: -10, 
    tie: 0
};

function minimax(board, depth, isMaximizing) {
    var result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        var bestScore = -Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                // Check if spot is available
                if (board[i][j] == '') {
                    board[i][j] = 'O';
                    var score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        var bestScore = Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                // Check if spot is available
                if (board[i][j] == '') {
                    board[i][j] = "X";
                    var score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}