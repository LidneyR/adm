contasClosedb=[]
unifechamentos=[] 
platatorma=0
closeOrder=(event)=>{
// console.log(event.target.getAttribute('key'))

closeForm=document.getElementById('closeForm')
closeForm.classList.toggle('show')
hfechamento=relogio()
idConta=event.target.getAttribute('key')
todospedidos=[]
contaFechada={
  "idConta":idConta,
  "fechamento":hfechamento,
  "pedidosfeitos":todospedidos,
  "formadePagamento":"PIX", 

}
  
  // OBTEM DADOS DE TODAS AS CATEGORIAS 
  // console.log(VENDASOPENOW)
// console.log(VENDASOPENOW)
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