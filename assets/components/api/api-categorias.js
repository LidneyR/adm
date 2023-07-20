
 
fullScreen=()=>{
    var element = document.documentElement;
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
} 

 
data=[]  
database=[]  
 
var apiContainer=document.getElementById('api') 
var categoriesContainer=document.getElementById('categories') 
STATUSMESA=false

// JSON.parse(localStorage.getItem("cardapio")).map((cardBdmap)=>{
//     cardBdmap.data.map((allDataBd)=>{
       
//         data.push(allDataBd)
//     })
// })


 getApi=(container, databd)=>{

    container.innerHTML =` <div class="tab"> </div>`;
    prods=""
    getdatabd=databd
  
    if(data.length==0){
        getdatabd.map((databdMap)=>{
       
            databdMap.dataProd.map((mapProd)=>{
              data.push(mapProd)
      
              
            })
          //   console.log(data)
      
          })
    }else{
        data=[]
        getdatabd.map((databdMap)=>{
       
            databdMap.dataProd.map((mapProd)=>{
              data.push(mapProd)
      
              
            })
          //   console.log(data)
      
          })

    }
 
   
     


 
    data.map((apiData)=>{ 
         
        container.childNodes[1].innerHTML += ` 

            <button key="`+apiData.id+`" class="tablinks" onclick="openCity(event, '`+apiData.id +`')">
                <img class="img1" src=" `+apiData.image +`" alt="">
                <img class="img2"  src=" `+apiData.image2 +`" alt="">
                `+apiData.name +`
            </button>
          
        `;
        container.innerHTML += ` 

            <div id="`+apiData.id +`" class="tabcontent">  
            </div>
      
        `; 
        document.getElementById(apiData.id.toString()).innerHTML+= `  
        <div class="tab sub"  >
            <div class="swiper mySwiperTabs">
            <div class="swiper-wrapper" id="`+apiData.key +`" >
                
           
            
            </div>
            
            </div>
        </div>
          `; 
          
        var subs=document.getElementById(apiData.key)
       
        apiData.itens.map((itensMap)=>{        
            subs.innerHTML+= ` 
                 <div class="swiper-slide"> 
                    <button class="tablinks" onclick="openCity(event, '`+itensMap.id +`', '`+apiData.id +`')">`+itensMap.name +`</button> 
                 </div>
            `;
           
          
        }) 
        apiData.itens.map((tabContentMap)=>{ 
           
           
            document.getElementById(apiData.id.toString()).innerHTML+= ` 
               
                <div id="`+tabContentMap.id +`" class="tabcontent">  
                </div>
            `; 
            var Contentsubs=document.getElementById(tabContentMap.id)
           
          innitProd=tabContentMap.products.map((productsMap)=>{  
            prods+=productsMap
                    // console.log(productsMap.id)
                    Contentsubs.innerHTML+= `  
                        <div class="produto">
                                <img src="`+productsMap.img +`" alt="" ></img>
                            <div class="prod-val">
                                <h3 class="title-prod">`+productsMap.name +`</h3> 
                                <span class="valor">`+parseFloat(productsMap.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</span>
                            </div>
                            <div class="quantidade">
                                <button key="`+productsMap.id +`" onclick="addProd(this,`+productsMap.id +`); ">+</button>
                                <input  id="`+productsMap.id +`" value="`+productsMap.quantidade +`" type="text" placeholder="0">
                                <button key="`+productsMap.id +`" onclick="removeProd(this,`+productsMap.id +`); ">-</button>
              
                            </div>
                        </div> 
                        </div>
                    `;


                if(productsMap.price==undefined){
                  

                }
   
                }) 
        }) 
     }) 
     openTable()
 }
  
//  categoriesContainer ? getApi(categoriesContainer) : console.log("..");


 var value = 0

 removeProd=(ProdThis, inputProd)=>{ 
 
    var key=ProdThis.getAttribute('key')
    input=document.getElementById(inputProd)
    
    data.map((apiData)=>{   
        apiData.itens.map((itensMap)=>{     
             itensMap.products.map((productsMap)=>{ 
              

              if(productsMap.id==key && productsMap.quantidade>0){

         
                productsMap.quantidade-- 
                value=productsMap.quantidade 
                input.setAttribute('value',value)   
                refrashCart(inputProd)

              }
             }) 
        }) 

     }) 

    

    
  }

 
 addProd=(ProdThis, inputProd)=>{ 
 
    var key=ProdThis.getAttribute('key')
     
      input=document.getElementById(inputProd)
      inputSearch=document.getElementById(inputProd+'search')
      
  
    data.map((apiData)=>{   
        apiData.itens.map((itensMap)=>{     
             itensMap.products.map((productsMap)=>{ 
            
           
        
              if(productsMap.id==key ){
                productsMap.quantidade++
                value=productsMap.quantidade 
                input.setAttribute('value',value)
                if(inputSearch){
                    inputSearch.setAttribute('value',value)

                }
              }
             }) 
        }) 

     }) 

     
     refrashCart(inputProd)

    
  }

     
 refrashCart=(inputProd)=>{ 
     

  var cartContainer = document.getElementById('cart')
  var cartPreview = document.getElementById('cartPreview')
  input =document.getElementById(inputProd)

  cartQtd=0
  totalCart=0
  itensTotal=0
  list=null

   cartPreview.innerHTML= `<div><button id="cartPreview" onclick="showCart()">
   <i class="fa-solid fa-cart-shopping"></i>
   </button>   
      </div>`;  
   cartContainer.innerHTML= `<div class="content"><h2>Pedido</h2><p ><span id="itensTotal"></span>  Itens na Cesta</p></div>`;  
   msg="Olá, Pedido via APP " + "%0a" + "Nome: "+inputUserName
   retirada="";

   
    //  url = "https://wa.me/5512982969703?text=" // Seu numero test
     url = "https://wa.me/5512996048083?text=" // Seu numero Produção
   + "*Pedido via APP* <3" + "%0a" // Mensagem personalizada
   + "%0a" // Quebra de linhas
   + "*Nome*: " + inputUserName + "%0a" // Dados do formulário
   + "%0a" // Quebra de linhas
   + "*Itens Pedidos*" + "%0a" // Mensagem personalizada
   + "%0a" // Quebra de linhas


  allordersBuy=[]
  prodsSelct=[]
 


        data.map((apiData)=>{   
            apiData.itens.map((itensMap)=>{     
                itensMap.products.map((productsMap)=>{ 
                
    
                if(productsMap.quantidade>0){
                    cartQtd+=productsMap.quantidade
                    itensTotal+=productsMap.quantidade
                    prodMultiply=productsMap.price*productsMap.quantidade
                    totalCart+=prodMultiply
                    list+=productsMap.name 
                    prodsSelct.push(productsMap)
                    //  console.log(prodsSelct)

                
            
                    cartPreview.innerHTML= `    <div >     <button id="cartPreview" onclick="showCart()">
                    <i class="fa-solid fa-cart-shopping"></i></button> <span class="qtdIcon">`+cartQtd +` </span>   </div>  `;  
                    cartContainer.innerHTML+= `  
                    
                    <div class="produto">
                                    <img src="`+productsMap.img +`" alt="">
                                <div class="prod-val">
                                    <h3 class="title-prod"> `+productsMap.name +` </h3> 
                                    <span class="valor">`+prodMultiply.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) +` </span>
                                </div>
                                <div class="quantidade">
                                        <button key="`+productsMap.id +`" onclick="addProd(this,`+productsMap.id +`); ">+</button>
                                    <input  id="`+productsMap.id +`Cart" value="`+productsMap.quantidade +`" type="text" placeholder="0">
                                    <button key="`+productsMap.id +`" onclick="removeProd(this,`+productsMap.id +`); ">-</button>
                
                                </div>
                                <button><img src="assets/images/trash.png" style="width: 20px; height: 21px;"></button>

                            </div>
                            
                    `;  
                    // msg+=``+productsMap.quantidade +`,`+productsMap.name +`,`+prodMultiply.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) +`` 
                
                    url+=""+productsMap.quantidade+"un. / *"+productsMap.name+"* / " + prodMultiply.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                    +"%0a" // Dados do formulário


                }
                
                
                }) 

                
            }) 

        }) 
     
         
 
       
        if(1==0){  
            // if(database.length>0){ 

            console.log('2 compra') 
            lastOrderDoc=JSON.parse(localStorage.getItem("last"))
            
    
            lastOrderDoc.map((dataMap)=>{
                laslastorder=dataMap
            
            })
            
            atualOrder=[laslastorder,{ 
                idPedido:Math.random() * 1000,
                itens:prodsSelct,
                observacao:'observacoes'
            }]


            allordersBuy=atualOrder
     
    
        }else{ 
            obs='Nenhuma obs'
            allordersBuy=[{ 
                idPedido:Math.floor(Math.random() * 1000).toString(),
                itens:prodsSelct,
                observacao:obs

            }]
        }

        document.getElementById("itensTotal").innerHTML+=  itensTotal
        cartContainer.innerHTML+= ` 

            <div class="controls"  > 
                <button onclick="showCart()"><i class="fa-solid fa-chevron-left"></i></button>
                <button onclick="showCart()"><i class="fa-solid fa-xmark"></i></button>  
            </div> 
             <div class="total"> 
                Total da compra
                `+totalCart.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) +` 
                <button onclick="getCheckout()">FINALIZAR PEDIDO <i class="fa-regular fa-rectangle-list"></i></button> 
            </div> 
        `; 

        totalfinesh.innerHTML+=`
        <div class="total" id="fineshPay" style=" z-index: 99;"> 
            Total da compra
            `+totalCart.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) +` 

            <span id="clickpague"   onclick="animatedCheckOut()">clique e pague</span>
            
            <div id="rrcode" style="
            background: white;
            padding: 0 7px 6px; display:none;
        ">
                <img  style="
                position: relative;
                width: 195px;
                left:0;
            " src="https://lidneyr.github.io/adm/assets/components/impressao/andd.png"> 

           <span > Pague com QR CODE </span>
        <span style="
        text-align: center;
        display: inline-flex;
        margin: 20px auto;
        font-weight: 300;
    ">CHAVE </br>  12996218661 </span>
           </div>
        
             <button type="submit" id="submitCheck">ENVIAR MEU PEDIDO 
             <i class="fa-solid fa-paper-plane"></i>
             </button>
        </div> 
        `;
  }


sendOrder=(event)=>{
    event.preventDefault() 

    mesaCheck=document.getElementById('selectMesaCheckout').value

    if(retiradavalue=='mesa'){
            
        retirada=retiradavalue+" N* "+mesaCheck
        send()
    }else if(retiradavalue=='balcao'){
        
        retirada=retiradavalue 
        send()
    }else{
        alert('Preencha os Campos')

    }

    function send(){
        comments=document.getElementById("areaObs").value
        url+=""
        + "*Forma de Retirada*: " + retirada+ "%0a" // Dados do formulário
        +"%0a" 
        + "*Observações do Pedido*"
        + "%0a" // Quebra de linhas 
        +comments

        location.href = url
    }
}

closeCheckout=()=>{ 
    containerCheckout.classList.toggle("hide");
}


    ///update
   
openTable=()=>{
    setTimeout(function(){

        tabcontent = document.getElementsByClassName("tabcontent");
        tablinks = document.getElementsByClassName("tablinks");
        tabcontent[0].style.cssText="display:block"
        tabcontent[1].style.cssText="display:block"
        tablinks[0].setAttribute("class", "tablinks active")
        var swiper = new Swiper(".mySwiperTabs", {
            slidesPerView: 2,
            cssMode: true,
             autoplay: {
            delay: 5500,
            disableOnInteraction: false,
            },
            
            });
    
        
    
    
    
    }, 2000);
}
