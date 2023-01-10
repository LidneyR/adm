

function relatorio(){
  return console.log("Mesas",arrOrder)

}

 
function saved(){
 
    // Storexx  
    allM=JSON.stringify(arrOrder)

    console.log("entrou")
 
    localStorage.setItem("oders",allM);
  
    if(arrOrder.length>0){
    
        prodsSaved=JSON.parse(localStorage.getItem("oders"))
        
       
    }   
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


function statusApp(){
 
  prodSaved=JSON.parse(localStorage.getItem("oders"))
  containerMesas=document.getElementById("mesas");

  if(prodSaved.length>0){ 

    arrOrder=prodSaved    
   console.log(arrOrder)
        arrOrder.map((mesaMap)=>{ 
            
            containerMesas.innerHTML+=`   
                <button key='`+mesaMap.name+`' onclick="tabledetails(event)" class="mesabutton">`+mesaMap.name+`</button>
            `; 
        })

        tableOptions()
 
  }
}

statusApp()