
function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }


  }
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
	if (!reseted){
    fill(255, 100, 150, 220);
	rect(x+5, y+5, w-10, w-10);}
	else {
	fill(50, 180, 50, 100);
	rect(x, y, w, w);
	fill(250,215,0);
	rect(rows*w-w, cols*w-w, w, w);
	
	}
	 kordx=x;
	 kordy=y;
	return kordx,kordy;
  }

  this.show = function() {
	  var j= this.i;
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }

    if (this.visited) {
      noStroke();
      fill(10, 0, 10, 100);
      rect(x, y, w, w);
    }
	
  }
};