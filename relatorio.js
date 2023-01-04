

function relatorio(){
  return console.log("Mesas",arrOrder)

}


function saved(){
 
    // Store
    localStorage.setItem("lastname", "Smith");

    
}


 
function orderFortable(){
    nMesa=document.getElementById('mesa').value 
    
    arrOrder.map((orMap)=>{ 

        if(orMap.name===nMesa){ 

            orMap.orders.map((allOrTab)=>{
                return allOrTab.idPedido
            })
        }

    })
                    
}
