relatorioFinanceiro=document.getElementById('relatorioFinanceiro')

notificacao=document.getElementById('notificacao')
notQtd=document.getElementById('notQtd')
VENDASOPENOW=[];
mesasData=0
deliverysData=0

faturamentoatual=document.getElementById('faturamentoatual')
mesasRelatorio=document.getElementById('innerMesas')

pedidosDeliveryAtuais=document.getElementById('pedidosDeliveryAtuais')

relatorioFaturamentoAtual=document.getElementById('relatorioFaturamentoAtual')
vendasareceber=document.getElementById('vendasareceber')
// console.log(vendasareceber)
innerSequenceOrders=(notDataBase)=>{
 
  notificacoesData=notDataBase
  notificacao.innerHTML=` `;  
 
  notificacoesData.map((notMap)=>{
 


    notMap.orders.map((allOrdersMap)=>{  
 
          if(notMap.name!=undefined){
            notificacao.innerHTML+=` 
              <div> <div><span><i class="fa-regular fa-bell"></i></span>Olá novo Pedido DeliveryAPP `+notMap.name+` Hora do Pedido: `+notMap.hora+`</div>
                <button onclick="modalJs(`+allOrdersMap.idPedido+`)"> <i class="fa-solid fa-magnifying-glass"></i>  ver pedido   </button> 
              </div> 
            `;
          }else if(notMap.mesa!=undefined){
          notificacao.innerHTML+=`
          <div>

            <div>
              <span><i class="fa-regular fa-bell"></i> </span>
                Novo Pedido Mesa (`+notMap.mesa+`) Hora do Pedido: `+notMap.hora+`
            </div>
            <button onclick="modalJs(`+allOrdersMap.idPedido+`)"><i class="fa-solid fa-magnifying-glass"></i> ver pedido</button>
           
          </div>`;
          
          }  

    })
    
  })
}
appNotification=(todosPedidos,tipo)=>{  

 

if(todosPedidos.length>0){
 
      if(tipo=="mesa"){ 
 
        NUMEROMESASABERTASNOMOMENTO=todosPedidos.length  
        let MESASABERTASNOMOMENTO=todosPedidos
        
 
        if(todosPedidos.length>0){

          mesasData={
            "tipo":'Mesas',
            "data":todosPedidos, 
          }  
      }   
     
         
 
  }else if(todosPedidos.length >0){  
          
        NUMERODELIVERYABERTOSMOMENTO=todosPedidos.length 
        let DELIVERYABERTOSMOMENTO=todosPedidos
   

        if(todosPedidos.length>0){
          deliverysData={
            "tipo":'Deliverys',
            "data":todosPedidos, 
          }   
      
        }
    }
    
 

    if(mesasData!=0 || deliverysData!=0){
    VENDASOPENOW=[mesasData,deliverysData] 
    }
   setTimeout(allData(), 3000);

  }
}

 function allData(){
  deliveryRelatorio=document.getElementById('deliveryRelatorio')
  pedidosDeliveryAtuais=document.getElementById('pedidosDeliveryAtuais')
  somaProdTotalDelivery=0
  

  totalfaturamentodelivery=document.getElementById('totalfaturamentodelivery')

  innerpedidosatuaismesas=document.getElementById('innerpedidosatuaismesas')
  totalfaturamentomesas=document.getElementById('totalfaturamentomesas')
  tpedMesa=0
  somaProdTotalMesas=0
  totaldaCompra=0
        
  console.log("admLogin",admLogin)
  
  if(admLogin==true){
    relatorioFinanceiro.innerHTML=''  
    console.log(relatorioFinanceiro)
  }
 
  if(VENDASOPENOW.length>0){

    VENDASOPENOW.map((vatualMap)=>{
      if(vatualMap!==0){

        if(vatualMap.tipo=='Mesas'){
 
          mesasRelatorio.innerHTML=`Mesas Abertas no momento (`+vatualMap.data.length+`)`;

          vatualMap.data.map((dataMap)=>{ 
            tpedMesa+=dataMap.orders.length
        

            dataMap.orders.map((delOrdersMap)=>{

              delOrdersMap.itens.map((dimap)=>{
               // LISTA DE TODOS OS PEDIDOS NAS MESAS GERALconsole.log(dimap)
                // console.log(dimap)

                if(dimap.name){
                  somaProdTotalMesas+=dimap.quantidade*dimap.price 
                  if(totalfaturamentomesas){
                      totalfaturamentomesas.innerHTML=`Total Vendas Mesas<strong style="margin: 0 5px;">`+ somaProdTotalMesas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</strong> `;
                    }
                } 
              })
            
            })

            
            
            innerpedidosatuaismesas.innerHTML=`Pedidos Mesas em curso (`+tpedMesa+`)`;

          })

        }else if(vatualMap.tipo=='Deliverys'){
         
          deliveryRelatorio.innerHTML=`Delivery vendas atuais (`+vatualMap.data.length+`)`;
          nOrders=0
          vatualMap.data.map((dataMap)=>{ 

            nOrders+=dataMap.orders.length
 
           
           
            dataMap.orders.map((pedidoDelMap)=>{
                pedidoDelMap.itens.map((mapDelI)=>{
                  
                  if(mapDelI.price){
                    var custoporquantidade=mapDelI.price*mapDelI.quantidade
                    totaldaCompra+=custoporquantidade
                    
                    somaProdTotalDelivery=totaldaCompra

                    totalfaturamentodelivery.innerHTML=`Total Vendas Delivery<strong> `+totaldaCompra.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</strong>`;
                  }
               
                })

              }) 

          
            pedidosDeliveryAtuais.innerHTML=`Pedidos Delivery em curso (`+nOrders+`)`;
            // 
            // totalfaturamentodelivery.innerHTML=`Total Vendas Delivery total()`;
          })

        }

      }
    })
     

      var FATURAATUAL=somaProdTotalMesas+somaProdTotalDelivery

      // console.log(FATURAATUAL)

        faturamentoatual.innerHTML=`FATURAMENTO ATUAL  <strong style="margin: 0 5px;"> ` +FATURAATUAL.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) +`</strong>`;  

  }else{

    relatorioFinanceiro.innerHTML=`SEM DADOS PARA MOSTRAR`;  

  }
   
 }