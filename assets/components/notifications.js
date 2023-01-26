notQtd=document.getElementById('notQtd')
console.log(notQtd)


containerRelatorio=document.getElementById('relatorioFinanceiro')
deliveryRelatorio=document.getElementById('deliveryRelatorio')
relatorioFaturamentoAtual=document.getElementById('relatorioFaturamentoAtual')

appNotification=(todosPedidos,tipo)=>{ 
 

  if(tipo=="mesa"){
    MESASABERTASNOMOMENTO=todosPedidos.length  
    containerRelatorio.innerHTML=`Mesas Abertas no momento (`+MESASABERTASNOMOMENTO+`)`;
  }else if(tipo=='delivery'){ 
    // deliveryRelatorio.innerHTML=``; 
    DELIVERYABERTOSMOMENTO=todosPedidos.length 
    deliveryRelatorio.innerHTML=`<div>Delivery no Momento (`+DELIVERYABERTOSMOMENTO+`)</div>`;

  }


}

 