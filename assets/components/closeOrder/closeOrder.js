contasClosedb=[]
unifechamentos=[] 
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
  "formadePagamento":"PIX"

}
  
  // OBTEM DADOS DE TODAS AS CATEGORIAS 
  // console.log(VENDASOPENOW)

  if(VENDASOPENOW){
    VENDASOPENOW.map((vendasMap)=>{
      // console.log(vendasMap.tipo)
      
     

        vendasMap.data.map((tipoMap)=>{
          //  console.log(tipoMap)

           if(tipoMap.mesa==idConta){
              tipoMap.orders.map((mOrders)=>{
                  //  console.log(mOrders)
                   todospedidos.push(mOrders)
              })
           }else if(tipoMap.name==idConta){
           
            tipoMap.orders.map((dOrders)=>{
              // console.log(dOrders)
           
            })

           }
        })
      
    })

    // console.log(contaFechada)
  }

}