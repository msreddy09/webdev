var can = document.getElementById("myCanvas");
var ctx = can.getContext("2d");
/*ctx.strokeStyle="#FF0000";
ctx.strokeRect(20,20,150,100);
ctx.fillStyle = "green";*/
/*ctx.fillRect(20,20,150,100);
ctx.beginPath();
ctx.arc(250,250,70,0*Math.PI,1.8*Math.PI);
ctx.stroke();
*/
var startAng = 0;
var endAng = 1.8;
function animatedCircle(){
  ctx.clearRect(0,0,500,400);
  startAng = startAng + 0.1;
  endAng = endAng + 0.1;
  
  ctx.strokeStyle="#FF0000";
  ctx.beginPath();
  ctx.arc(200,200,70,-endAng*Math.PI,-startAng*Math.PI);
  ctx.stroke();
  
  ctx.strokeStyle="#00FF00";
  ctx.beginPath();
  ctx.arc(200,200,50,startAng*Math.PI,endAng*Math.PI);
  ctx.stroke();
}
animatedCircle();

copycan.onclick = function(){
  var imgsrc = can.toDataURL();
  var img = new Image();
  img.src = imgsrc;
  document.querySelector("body").appendChild(img);
  
}
