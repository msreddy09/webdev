var imgsArray = ["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg"];

function displayThumbNails(){
  
  for(var i = 0; i < imgsArray.length; i++){
    var img = new Image();
    img.src = imgsArray[i];
    img.id = "img"+i;
    img.height = "100";
    img.width  = "100";
    img.draggable = true;
    img.setAttribute("ondragstart","imageDarg(event)");
    var thumN = document.querySelector(".thumbnail");
    thumN.appendChild(img);
  }
  
  
}

displayThumbNails();


function imageDarg(ev){
   
  ev.dataTransfer.setData("imgData",ev.srcElement.id);
  
}

function onDragingOver(ev){
  ev.preventDefault();
  image_holder.style.background = "#ccc";
}

function dropImage(ev){
  ev.preventDefault();
  var elInfo = ev.dataTransfer.getData("imgData");
  var imgEl = document.getElementById(elInfo);
  image_holder.appendChild(imgEl);
 
}
function onEnd(ev){
  ev.preventDefault();
  image_holder.style.background = "#F8F8F8";
  
}

function onLeave(ev){
  
  ev.preventDefault();
  image_holder.style.background = "#F8F8F8";
}
