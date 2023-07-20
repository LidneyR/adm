function openCity(evt, cityName, parent) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    a=0

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
     
    }
 
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
       tablinks[i].className = tablinks[i].className.replace(" active", "");



      if(tablinks[i].getAttribute("key")){
        if (parent){
          if(tablinks[i].getAttribute("key")==parent){ 
            tablinks[i].setAttribute("class", "tablinks active")
          }
          

        }
      }
    }
    document.getElementById(cityName).style.display = "block";
    if (parent){
     
    document.getElementById(parent).style.display = "block";
   
    }

      evt.currentTarget.className +=" active";

   
  }
