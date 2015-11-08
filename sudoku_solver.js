module.exports.parseBoard = function(board){
	// split board at each new line.
	// use map to split each row into an array
	return board.split('\n').map(function(row) {
		//convert char to int
		return row.split('').map(function(num) {
			return +num;
		});
	});
};

module.exports.saveEmptyPositions = function(board){
	// array for to positions
	var emptyPositions = [];

	// check for 0
	for(var i = 0; i < board.length; i++){
		for(var j = 0; j<board[i].length; j++){
			//if 0 save position
			if(board[i][j] === 0) {
				emptyPositions.push([i,j]);
			}
		}
	}

	// return array of positions
	return emptyPositions;
};

module.exports.checkRow = function(board, row, value) {
	// Iterate each value in row
	for(var i = 0; i <board[row].length; i++) {
		// Match return false
		if(board[row][i] === value) {
			return false;
		}
	}
	// No Match found, return True
	return true;
};

module.exports.checkColumn = function(board, column, value) {
	// Iterate each value in column
	for(var i = 0; i < board.length; i++) {
		//match return false
		if(board[i][column] === value) {
			return false;
		}
	}
	// No Match found, return True
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
	// Iterate through each row
	for(var i = rowCorner; i < rowCorner + squareSize; i ++) {
		// Iterate each Column
		for (var j = columnCorner; j < columnCorner + squareSize; j ++) {
			// return false for match
			if(board[i][j] === value) {
				return false;
			}
		}
	}
	// No Match found, return True
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
    // Try the next value
    value = board[row][column] + 1;
    // Was a valid number found?
    found = false;
    // Keep trying new values until either the limit
    // was reached or a valid value was found
    while(!found && value <= limit) {
      // If a valid value is found, mark found true,
      // set the position to the value, and move to the
      // next position
      if(this.checkValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
      } 
      // Otherwise, try the next value
      else {
        value++;
      }
    }
    // If no valid value was found and the limit was
    // reached, move back to the previous position
    if(!found) {
      board[row][column] = 0;
      i--;
    }
  }

  // A solution was found! Log it
  board.forEach(function(row) {
    console.log(row.join());
  });

  // return the solution
  return board;
};

module.exports.solveSudoku = function(board) {
  var parsedBoard = this.parseBoard(board);
  var emptyPositions = this.saveEmptyPositions(parsedBoard);

  return this.solvePuzzle(parsedBoard, emptyPositions);
};






