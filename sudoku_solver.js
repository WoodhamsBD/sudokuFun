module.exports.parseBoard = function(board){
	return board.split('\n').map(function(row) {
		return row.split('').map(function(num) {
			return +num;
		});
	});
};

module.exports.saveEmptyPositions = function(board){
	var emptyPositions = [];
	for(var i = 0; i < board.length; i++){
		for(var j = 0; j<board[i].length; j++){
			//if 0 save position
			if(board[i][j] === 0) {
				emptyPositions.push([i,j]);
			}
		}
	}
	return emptyPositions;
};

module.exports.checkRow = function(board, row, value) {
	for(var i = 0; i <board[row].length; i++) {
		if(board[row][i] === value) {
			return false;
		}
	}
	// No Match found
	return true;
};

module.exports.checkColumn = function(board, column, value) {
	for(var i = 0; i < board.length; i++) {
		if(board[i][column] === value) {
			return false;
		}
	}
	// No Match found
	return true;
};


module.exports.check3x3Square = function(board, column, row, value) {
	// Upper left corner of 3x3
	var columnCorner = 0,
			rowCorner = 0,
			squareSize = 3;
	// Left-most Column
	while(column >=columnCorner + squareSize) {
		columnCorner += squareSize;
	}
	// Upper-most Row
	while(row >= rowCorner + squareSize) {
		rowCorner += squareSize;
	}
	for(var i = rowCorner; i < rowCorner + squareSize; i ++) {
		for (var j = columnCorner; j < columnCorner + squareSize; j ++) {
			// return false for match
			if(board[i][j] === value) {
				return false;
			}
		}
	}
	// No Match found
	return true;
};

module.exports.checkValue = function(board, column, row, value) {
	if(this.checkRow(board, row, value) &&
			this.checkColumn(board, column, value) &&
			this.check3x3Square(board, column, row, value)) {
		return true;
	} else {
		return false;
	}
};

module.exports.solvePuzzle = function(board, emptyPositions) {
	var limit = 9,
			i, row, column, value, found;
  for(i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];
    value = board[row][column] + 1;
    found = false;

    while(!found && value <= limit) {
      // If a valid value is found, mark found true,
      // set the position to the value, and move to next position
      if(this.checkValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
      } else {
        value++;
      }
    }

    if(!found) {
      board[row][column] = 0;
      i--;
    }
  }

  board.forEach(function(row) {
    console.log(row.join());
  });

  return board;
};

module.exports.solveSudoku = function(board) {
  var parsedBoard = this.parseBoard(board);
  var emptyPositions = this.saveEmptyPositions(parsedBoard);

  return this.solvePuzzle(parsedBoard, emptyPositions);
};






