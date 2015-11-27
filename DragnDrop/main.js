
imgcontainer.ondragover = function(event){
  event.preventDefault();
  return false;
 
};
imgcontainer.ondrop = function(event){
  event.preventDefault();
  
  var files = event.dataTransfer.files;
  console.log(files);
  var flength = 0;
  modal.style.display = "block";
  for(var i = 0 ;i< files.length ;i++){
    var fr = new FileReader();
    //var imgName = files[i].name;
    //console.log(imgName);
    fr.onprogress  = function(event){
     
      console.log("loading....");
    }
    
    fr.onloadend  = function(event) {
      flength++;
      if(flength === files.length ){
        console.log("loaded!");
        modal.style.display = "none";
      }
    };
    
    fr.onload = (function(file){
       return function(event){
         var div = document.createElement('div');
         div.className = "thumbnail_img";
         var img = new Image();
         img.src = event.target.result;
         img.height ="150";
         //img.setAttribute('width','93%');
         img.title = file.name;
         div.appendChild(img);
         imgcontainer.appendChild(div);
      }
      
      fr.onprogress = function(obj){
        console.log("Loading ...." + obj);
      }
       
    })(files[i]);
    
    
    fr.readAsDataURL(files[i]);
    
  
    
  }
  
  //console.log("Loaded");
  
};


































