
pedidosContainer=document.getElementById("mesas")
function getData(bddata){
pedidosContainer.innerHTML=""
 
    bddata.map((pedidosMap)=>{
        if(pedidosContainer){
   
                        
                        pedidosContainer.innerHTML+=`<button key='`+pedidosMap.mesa+`' id='`+pedidosMap.mesa+`' onclick="tabledetails(event)" class="mesabutton">`+pedidosMap.mesa+`</button>`
                         
        }
    })

    console.log(bddata)
    let pedidosAll=[]   
    console.log(pedidosAll)

  
}

 