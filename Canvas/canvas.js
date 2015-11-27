var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    myCanvas.onmousedown = function(e){
        mousePressed = true;
        Draw(e.pageX - this.offsetLeft, e.pageY -this.offsetTop, false);
    };

    myCanvas.onmousemove= function(e){
        if (mousePressed) {
            Draw(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        }
    };

    myCanvas.onmouseup= function(e){
        mousePressed = false;
    };
	   myCanvas.onmouseleave= function(e){
        mousePressed = false;
    };
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = selColor.value;
        ctx.lineWidth = selWidth.value;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}
	
function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}