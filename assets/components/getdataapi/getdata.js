// pedidosAll=[]   
pedidosContainer=document.getElementById("mesas")

function getData(bddata){
pedidosContainer.innerHTML="<h3>Controle de Mesas:</h3>"


    localStorage.setItem("mesasOpen", JSON.stringify(bddata));
    bddata.map((pedidosMap)=>{
        if(pedidosContainer){     
            pedidosContainer.innerHTML+=`<button key='`+pedidosMap.mesa+`' id='`+pedidosMap.mesa+`' onclick="tabledetails(event,'mesa')" class="mesabutton">`+pedidosMap.mesa+`</button>`
        }
    })
   
  
}



//
deliveryContainer=document.getElementById("deliveyPedidos")

function deliveryData(deliveryAll){
    deliveryContainer.innerHTML="<h3>Pedidos Delivery:</h3>"
    localStorage.setItem("pedidosDelivery", JSON.stringify(deliveryAll));
 
    deliveryAll.map((deliveryMap)=>{
        console.log(deliveryMap)
        // deliveryContainer.innerHTML+=`<button onclick="" class="deliveryButton" onclick="tabledetails(event)">`+deliveryMap.name+`</button>`
        deliveryContainer.innerHTML+=`<button key='`+deliveryMap.name+`'   onclick="tabledetails(event,'delivery')" class="deliveryButton">`+deliveryMap.name+`</button>`

    })
 
}

 

window.onload=function(){
}