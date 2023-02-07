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
       
    // sadasdasdas/
        // deliveryContainer.innerHTML+=`<button onclick="" class="deliveryButton" onclick="tabledetails(event)">`+deliveryMap.name+`</button>`
        deliveryContainer.innerHTML+=`

                                <div class="deliveryOrder">
                                    <button key='`+deliveryMap.name+`'   onclick="tabledetails(event,'delivery')" >
                                        <img src="assets/img/user.png" style="width: 16px;">`+deliveryMap.name+`
                                    </button>
                                    <button class="avisePronto" key='`+deliveryMap.name+`'   onclick="sendMsgWhats('`+deliveryMap.whatsapp+`')" >
                                        <img src="assets/img/whatswhite.png" style="width: 16px;"> Solicitar pagamento!   </button>
                                </div>     
                            
                            
                            `;

    })
 
}

 

window.onload=function(){
    deliveryAll=false
}