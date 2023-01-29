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

appNotification=(todosPedidos,tipo)=>{  

      if(tipo=="mesa"){

        NUMEROMESASABERTASNOMOMENTO=todosPedidos.length  
        let MESASABERTASNOMOMENTO=todosPedidos
        
 
        if(todosPedidos.length>0){

          mesasData={
            "tipo":'Mesas',
            "data":todosPedidos, 
          }  
      }   
     
        
        // mesasRelatorio.innerHTML=`Mesas Abertas no momento (`+NUMEROMESASABERTASNOMOMENTO+`)`;
 
  }else if(tipo=='delivery'){ 
     
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

 function allData(){
  deliveryRelatorio=document.getElementById('deliveryRelatorio')
  pedidosDeliveryAtuais=document.getElementById('pedidosDeliveryAtuais')
  somaProdTotalDelivery=0
  

  totalfaturamentodelivery=document.getElementById('totalfaturamentodelivery')

  innerpedidosatuaismesas=document.getElementById('innerpedidosatuaismesas')
  totalfaturamentomesas=document.getElementById('totalfaturamentomesas')
  tpedMesa=0
  somaProdTotalMesas=0
       
 
  if(VENDASOPENOW.length>0){

    VENDASOPENOW.map((vatualMap)=>{
      if(vatualMap!==0){

        if(vatualMap.tipo=='Mesas'){
 
          mesasRelatorio.innerHTML=`Mesas Abertas no momento (`+vatualMap.data.length+`)`;

          vatualMap.data.map((dataMap)=>{ 
            tpedMesa+=dataMap.orders.length
            // console.log(dataMap.orders)

            dataMap.orders.map((delOrdersMap)=>{

              delOrdersMap.itens.map((dimap)=>{
               // LISTA DE TODOS OS PEDIDOS NAS MESAS GERALconsole.log(dimap)
                somaProdTotalMesas+=dimap.price
       
             
                totalfaturamentomesas.innerHTML=`Total Vendas Mesas<strong>`+ somaProdTotalMesas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</strong> `;

              })
            
            })

            
            
            innerpedidosatuaismesas.innerHTML=`Pedidos Mesas em curso (`+tpedMesa+`)`;

          })

        }else if(vatualMap.tipo=='Deliverys'){
         
          deliveryRelatorio.innerHTML=`Delivery vendas atuais (`+vatualMap.data.length+`)`;

          vatualMap.data.map((dataMap)=>{ 


           
            dataMap.orders.map((pedidoDelMap)=>{

                pedidoDelMap.itens.map((mapDelI)=>{
                  somaProdTotalDelivery+=mapDelI.price
                  console.log(somaProdTotalDelivery)
                  totalfaturamentodelivery.innerHTML=`Total Vendas Delivery<strong> `+somaProdTotalDelivery.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</strong>`;
                })

              }) 

          
            pedidosDeliveryAtuais.innerHTML=`Pedidos Mesas em curso (`+vatualMap.data.length+`)`;
            // totalfaturamentodelivery.innerHTML=`Total Vendas Delivery total()`;
          })

        }

      }
    })
     

      var FATURAATUAL=somaProdTotalMesas+somaProdTotalDelivery

      console.log(FATURAATUAL)

        faturamentoatual.innerHTML=`FATURAMENTO ATUAL <strong>`+FATURAATUAL.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) +`</strong>`;  

  }else{
    relatorioFinanceiro=document.getElementById('relatorioFinanceiro')

    relatorioFinanceiro.innerHTML=`SEM DADOS PARA MOSTRAR`;  

  }
   
 }