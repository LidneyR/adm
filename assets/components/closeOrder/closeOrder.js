contasClosedb=[]
unifechamentos=[] 
platatorma=0

// Pay
function getPay(){ 
var paymentCheck=document.getElementById('paymentCheck') 
 valuepaymentCheck=paymentCheck.options[paymentCheck.selectedIndex].text  
 console.log(valuepaymentCheck)
}

 
closeOrder=(event)=>{
// console.log(event.target.getAttribute('key'))

closeForm=document.getElementById('closeForm')
closeForm.classList.toggle('show')
hfechamento=relogio()

if(event!=false){
idConta=event.target.getAttribute('key')
todospedidos=[]


// Pay

 
 
contaFechada={
  "idConta":idConta,
  "fechamento":hfechamento,
  "pedidosfeitos":todospedidos,
  "formadePagamento":valuepaymentCheck, 

}
 

  if(VENDASOPENOW){
    VENDASOPENOW.map((vendasMap)=>{
      console.log(vendasMap.data)
      
     

        if(vendasMap.data){

          vendasMap.data.map((tipoMap)=>{
          
  
             if(tipoMap.mesa==idConta){ 
                tipoMap.orders.map((mOrders)=>{
                    
                     todospedidos.push(mOrders)
                     plataforma='Mesas'
                })
             }else if(tipoMap.name==idConta){
             
              tipoMap.orders.map((dOrders)=>{ 
                
                  todospedidos.push(dOrders)
                  plataforma='Deliverys'
  
             
              })
  
             }
          })


        }
      
    })

    // console.log(contaFechada)
  }
}
}