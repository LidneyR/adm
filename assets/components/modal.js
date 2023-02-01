
modalJs=(idPed)=>{
  modalApp=document.getElementById('modalApp')
  modalBody=document.getElementById('modalBody')
  modalContent=document.getElementById('modalContent')
  modalApp.classList.toggle('show')
    
//   console.log(dataInner)


  if(idPed!=false){
 
  // modalContent+=`<div> `+idPed+` ID</div>`;
   notificacoesData.map((notMap)=>{
      notMap.orders.map((oMap)=>{
     
      if(oMap.idPedido==idPed){

        console.log('id',oMap.idPedido)
        modalContent.innerHTML+=` 
       
 
        <div class="card" id="`+oMap.idPedido+`">
          <div class="idpedido">
            #Pedido `+oMap.idPedido+`</div>
            </div>
        </div>

        
      
        
        
        
        `
        console.log('..')

        oMap.itens.map((imap)=>{
 
          document.getElementById(oMap.idPedido).innerHTML+=` 


          <div class="pedidoResumo">  
                <div class="quantd"> `+imap.quantidade+` un. </div> 
                <div class="nomeProd"> `+imap.name+`</div>
                <div class="priceresumo">`+imap.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</div>

            </div>
        
          
          `
        })
 
        
        modalContent.innerHTML+=`<div class="botoes">
    
        <button class="white"><i class="fa-solid fa-check"></i>Clique para saber que o pedido foi entregue!</button>
        </div>`; 
      }

      })
   })
 
  }else{

    console.log('ok')
 modalContent.innerHTML=''
 console.log(modalContent=innerHTML)

  modalContent=innerHTML=''
    
    modalBody=`<div onclick="modalJs(false)"class="overylay"> </div>
  <div id="modalBody" class="modalBody">
  <div class="controls">
      <button onclick="modalJs(false)">&lt;</button>
      <button onclick="modalJs(false)">x</button>    
  </div>                          
  </div>`;
  }
}