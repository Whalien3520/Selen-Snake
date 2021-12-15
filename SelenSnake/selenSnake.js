var canvas;
var ctx;

var headU;
var headD;
var headL;
var headR;
var bodyU;
var bodyD;
var bodyL;
var bodyR;
var cornerDL;
var cornerDLD;
var cornerDLL;
var cornerDR;
var cornerDRD;
var cornerDRR;
var cornerUL;
var cornerULU;
var cornerULL;
var cornerUR;
var cornerURU;
var cornerURR;
var horiz;
var horizL;
var horizR;
var vert;
var vertD;
var vertU;
var moni;

var dots;
var moni_x;
var moni_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;

const DOT_SIZE = 20;
const ALL_DOTS = 2025;
const MAX_RAND = 44;
const DELAY = 140;
const C_HEIGHT = 900;
const C_WIDTH = 900;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

var lock = false;

var badum1;
var badum2;

function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locatemoni();
    setTimeout("gameCycle()", DELAY);
}

function loadImages() {

    headU = new Image();
    headU.src = 'headU.png';

	headD = new Image();
	headD.src = 'headD.png';

	headL = new Image();
	headL.src = 'headL.png';

	headR = new Image();
	headR.src = 'headR.png';

	bodyU = new Image();
	bodyU.src = 'bodyU.png';

	bodyD = new Image();
	bodyD.src = 'bodyD.png';

	bodyL = new Image();
	bodyL.src = 'bodyL.png';

	bodyR = new Image();
	bodyR.src = 'bodyR.png';

	cornerDL = new Image();
	cornerDL.src = 'cornerDL.png';

	cornerDLD = new Image();
	cornerDLD.src = 'cornerDLD.png';

	cornerDLL = new Image();
	cornerDLL.src = 'cornerDLL.png';

	cornerDR = new Image();
	cornerDR.src = 'cornerDR.png';

	cornerDRD = new Image();
	cornerDRD.src = 'cornerDRD.png';

	cornerDRR = new Image();
	cornerDRR.src = 'cornerDRR.png';

	cornerUL = new Image();
	cornerUL.src = 'cornerUL.png';

	cornerULU = new Image();
	cornerULU.src = 'cornerULU.png';

	cornerULL = new Image();
	cornerULL.src = 'cornerULL.png';

	cornerUR = new Image();
	cornerUR.src = 'cornerUR.png';

	cornerURU = new Image();
	cornerURU.src = 'cornerURU.png';

	cornerURR = new Image();
	cornerURR.src = 'cornerURR.png';

	horiz = new Image();
	horiz.src = 'horiz.png';

	horizL = new Image();
	horizL.src = 'horizL.png';

	horizR = new Image();
	horizR.src = 'horizR.png';

    vert = new Image();
    vert.src = 'vert.png';

	vertD = new Image();
    vertD.src = 'vertD.png';

	vertU = new Image();
    vertU.src = 'vertU.png';

    moni = new Image();
    moni.src = 'dragoonMoni.png';

	badum1=new Audio('Selen Badum 1.mp3');
	badum2=new Audio('Selen Badum 2.mp3');
}

function createSnake() {

    dots = 3;

    for (var z = 0; z < dots; z++) {
        x[z] = 60 - z * 20;
        y[z] = 60;
    }
}

function checkmoni() {

    if ((x[0] == moni_x) && (y[0] == moni_y)) {

        dots++;
        locatemoni();
    }
}

function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {

        ctx.drawImage(moni, moni_x, moni_y);
		
		ctx.drawImage(headU,x[0],y[0]);

        for(var z = 2;z < dots-1;z++) {
			if(x[z]>x[z-1]) {//R
				if(x[z+1]>x[z])
                	ctx.drawImage(horiz,x[z],y[z]);
                else if(y[z+1]>y[z])
            		ctx.drawImage(cornerDL,x[z],y[z]);
               	else
                	ctx.drawImage(cornerUL,x[z],y[z]);
            }
            else if(x[z]<x[z-1]) {//L
				if(x[z+1]<x[z])
					ctx.drawImage(horiz,x[z],y[z]);
                else if(y[z+1]>y[z])
            		ctx.drawImage(cornerDR,x[z],y[z]);
                else
                	ctx.drawImage(cornerUR,x[z],y[z]);
            }
            else if(y[z]>y[z-1]) {//U
                if(y[z+1]>y[z])
                	ctx.drawImage(vert,x[z],y[z]);
                else if(x[z+1]>x[z])
                	ctx.drawImage(cornerUR,x[z],y[z]);
                else
                	ctx.drawImage(cornerUL,x[z],y[z]);
            }
            else {
                if(y[z+1]<y[z])
                	ctx.drawImage(vert,x[z],y[z]);
                else if(x[z+1]>x[z])
                	ctx.drawImage(cornerDR,x[z],y[z]);
                else
                	ctx.drawImage(cornerDL,x[z],y[z]);
            }
        }
		if(x[1]>x[0]) {
            ctx.drawImage(headL,x[0],y[0]);
            if(x[2]>x[1])
            	ctx.drawImage(horizL,x[1],y[1]);
            else if(y[2]>y[1])
            	ctx.drawImage(cornerDLL,x[1],y[1]);
            else
            	ctx.drawImage(cornerULL,x[1],y[1]);
        }
        else if(x[1]<x[0]) {
            ctx.drawImage(headR,x[0],y[0]);
            if(x[2]<x[1])
            	ctx.drawImage(horizR,x[1],y[1]);
            else if(y[2]>y[1])
            	ctx.drawImage(cornerDRR,x[1],y[1]);
            else
            	ctx.drawImage(cornerURR,x[1],y[1]);
        }
        else if(y[1]>y[0]) {
            ctx.drawImage(headU,x[0],y[0]);
            if(y[2]>y[1])
            	ctx.drawImage(vertU,x[1],y[1]);
            else if(x[2]>x[1])
            	ctx.drawImage(cornerURU,x[1],y[1]);
            else
            	ctx.drawImage(cornerULU,x[1],y[1]);
        }
        else {
        	ctx.drawImage(headD,x[0],y[0]);
			if(y[2]<y[1])
				ctx.drawImage(vertD,x[1],y[1]);
            else if(x[2]>x[1])
            	ctx.drawImage(cornerDRD,x[1],y[1]);
            else
            	ctx.drawImage(cornerDLD,x[1],y[1]);
        }
		if(x[dots-2]<x[dots-1])
            ctx.drawImage(bodyL,x[dots-1],y[dots-1]);
        else if(x[dots-2]>x[dots-1])
            ctx.drawImage(bodyR,x[dots-1],y[dots-1]);
        else if(y[dots-2]<y[dots-1])
            ctx.drawImage(bodyU,x[dots-1],y[dots-1]);
        else
			ctx.drawImage(bodyD,x[dots-1],y[dots-1]);
		
		lock=false;
    } else {

        gameOver();
    }
}

function checkmoni() {

    if ((x[0] == moni_x) && (y[0] == moni_y)) {

        dots++;
        locatemoni();

		var int=Math.floor(Math.random()*2);
		if(int==1)
			badum1.play();
		else
			badum2.play();
    }
}

function move() {

    for (var z = dots; z > 0; z--) {

        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {

        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {

        x[0] += DOT_SIZE;
    }

    if (upDirection) {

        y[0] -= DOT_SIZE;
    }

    if (downDirection) {

        y[0] += DOT_SIZE;
    }
}

function checkCollision() {

    for (var z = dots; z > 4; z--) {

        if ((x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {

        inGame = false;
    }

    if (y[0] < 0) {

       inGame = false;
    }

    if (x[0] >= C_WIDTH) {

      inGame = false;
    }

    if (x[0] < 0) {

      inGame = false;
    }
}

function locatemoni() {

    var r = Math.floor(Math.random() * MAX_RAND);
    moni_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    moni_y = r * DOT_SIZE;

}

function gameCycle() {

    if (inGame) {

        checkmoni();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

function gameOver() {

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

onkeydown = function(e) {

	if(lock)
		return;

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!rightDirection)) {

        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {

        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {

        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {

        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
	
	lock=true;
};