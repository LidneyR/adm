// arquivo principal.js
// import { data} from './api'
var app=document.getElementById('app')
    
inputMesa=document.getElementById('mesa')


function innnerOrderItens(mesaKey){

    ordersContainer=document.querySelectorAll('.card')
    lastOrder=Array.from(ordersContainer)[Array.from(ordersContainer).length-1]

    console.log(mesaKey)
    arrOrder.map((mapOrders)=>{
        if(mapOrders.name===mesaKey){
            mapOrders.orders.map((myOrdersMap)=>{
                // console.log(myOrdersMap.idPedido)
                Array.from(ordersContainer).map((containerOnlyOrder)=>{
               
                myOrdersMap.itens.map((myItens)=>{
                    
                    if(containerOnlyOrder.getAttribute("id")==myOrdersMap.idPedido){
                                 document.getElementById(containerOnlyOrder.getAttribute("id")).innerHTML+=` 
                                 <div class="pedidoResumo">
                                    <div class='quantd'> ` +myItens.quantidade+ `</div>
                                    <div class='nomeProd'> ` +myItens.name+ `</div>
                                    <div> ` +myItens.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+ `</div>


                                </div>
                                `; 



                    }                                    
                })
                

             
                    
                })
            })
        }
    })

   
   
}
function getProds(){

    var allProds=[] 
    data.map((apiData)=>{  
        apiData.itens.map((itensMap)=>{  
            itensMap.products.map((productsMap)=>{  
                allProds.push(productsMap)

            }) 
        }) 

    }) 
    
    return allProds
}
function login(){


    app.innerHTML+=` 

    <div id="login" style="display:none"> 
        <div class="form"   >
            <form>
                <input type='text' id='nameuser' placeholder='Digite suas credênciais'>
                <input type="password" id="pass" placeholder='Senha' name="password"
                minlength="4" required>
                <button class="btn-circle-bottom" onclick='validationLogin(nameuser, pass)'>Entrar</button>
            </form>
        </div>
    </div>
    `; 
    loginContainer=document.getElementById('login')
    credentials=localStorage.getItem("credentials");


    if(credentials){
        console.log(credentials)
        app.innerHTML=`  `; 
    }

    validationLogin=(nameuser,pass)=>{
        event.preventDefault()

        var nameValue=nameuser.value
        var userPass=pass.value


        localStorage.setItem("credentials",userPass);
        console.log(credentials)

        
        

        if(nameValue==='canoas' & userPass==='1234'){
          
            document.getElementById('login').style.cssText="display:none;"
        }else{
            alert('Dados Incorretos')
            nameuser.value=""
            userPass.value=""
        }

   
          
    }


    
 

}login()

function  fluxo(){
    
    arrOrder=[] //array de vendas na mesa
 
    prodSelected=[] //Array de Produtos selecionados 
    mesaNumber=0
 
    tableValidation=()=>{
        inputMesa=document.getElementById('mesa')

        submitTable=()=>{ 
            valueMesa=inputMesa.value

           
            document.getElementById('innerMesaNumber').style.cssText='display:flex'
            document.getElementById('innerMesaNumber').innerHTML=valueMesa
        }

        repeatTable=()=>{
             return alert("Esta mesa já existe, deseja adicionar um novo pedido?")
            
        }

        inputMesa.addEventListener('blur', (event) => {
            
            mesaNumber=inputMesa.value
            newOrder=[]
            repeat=false

            if(arrOrder.length>0){
                arrOrder.map((allTabs)=>{
                    if(mesaNumber==allTabs.name){ 
                        repeat=true
                   
                        
                    }else{ 
                        document.getElementById('includOrderbtn').disabled = false
                    }
                })

            }else{ 
                document.getElementById('includOrderbtn').disabled = false
             }
 


             

        });  
      
        inputMesa.addEventListener('keyup', _.debounce(submitTable, 500)) 

      
    }

    searched=(event, searchInput)=>{
        event.preventDefault()
        searchIn=searchInput
        prodsArray=[]

        inputMesa=document.getElementById('mesa')

       
        if(inputMesa){
            
            document.getElementById('titleAdd').style.cssText="display:none;"
            inputMesa.style.cssText='display:none'
        }
        submitSearch=(event)=>{
            searchedValue=event.target.value 
            searchResult = document.getElementById('searchResult')   
 
            const productFound=ProductsFilter(searchedValue)  
            searchedValue.length > 3 ?  render(productFound) :  searchResult.innerHTML="Produto não encontrado" 
        }   

        ProductsFilter=(searchedValue)=>{
            return prodsArray.filter(p=>{
                return p.name.toLowerCase().includes(searchedValue.toLowerCase())  
            })  
        }

        searchIn.addEventListener('keyup', _.debounce(submitSearch, 500)) 

        includProdInTable=(prodThis)=>{
            var keyProd=prodThis.getAttribute("key") 
            var allProd=getProds() 
            
            allProd.map((prods)=>{ 
            
                if(keyProd.toString()===prods.id){ 
              
                    prodSelected.push(prods) 
                    // orderFortable()
                    saved()
                }


 
        })
     

        // prodSelected=[]
    
        alert('Produto adicionado com sucesso')

    }
        
    function render(productFound){   
       
        searchResult.innerHTML=`   `;  

        productFound.map((prodFoundMap)=>{  

            searchResult.innerHTML+=` 
            <div class='prodresult'>
            <span>
            ` +prodFoundMap.id+ `
            </span>
            <div>
            ` +prodFoundMap.name+ `
            </div>
            <div>
            <button key="`+prodFoundMap.id+`" onclick="includProdInTable(this)">
                incluir
            </button>
            </div>
            </div>
          
            `;  
        }) 
     }


          
    data.map((apiData)=>{  
        apiData.itens.map((itensMap)=>{  
            itensMap.products.map((productsMap)=>{  
                prodsArray.push(productsMap)

            }) 
        }) 

    }) 
       
    }
    
    tabledetails=(event)=>{ 
        console.log('monta botao')

        var containerMesaDetails=document.getElementById('openTable')


        if(event){
            var mesaKey=event.target.getAttribute('key')
        }
   

        renderItensOrder=(idOrder)=>{
            idOrderThis=idOrder
            containerOrder=document.getElementById(idOrderThis) 
            arrOrder.map((ordersMapPrint)=>{


                if(ordersMapPrint.name===mesaKey){ 

                    ordersMapPrint.orders.map((itensMapPrint)=>{

                      
                        itensMapPrint.itens.map((itensMapPrintlist)=>{

                            containerOrder.innerHTML+=`

                            <div class="prodgroup">
                                <div class=" ">`+itensMapPrintlist.id+` </div>  
                                <div class="nameprodPrint">
                                `+itensMapPrintlist.name+`
                                </div>
                                <div class=" ">
                                `+itensMapPrintlist.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`
                                </div>  
                            </div>  
                            `;  

                        })
                    })
                }
            })

            
        }
        
        if(mesaKey){
             containerMesaDetails.setAttribute('class','openTable show') 


             arrOrder.map((ordersMap)=>{

                if(mesaKey===ordersMap.name){
                    containerMesaDetails.innerHTML=`  

                            <div class="controls">
                                 <button onclick="tabledetails(event)"><</button>
                                <button onclick="tabledetails(event)">x</button>    
                            </div>

 

                    `; 
                    ordersMap.orders.map((allOrdersMap)=>{
                        
                        
                        containerMesaDetails.innerHTML+=`  
                            <div class="card" id="`+allOrdersMap.idPedido+`">
                                <button onclick="window.print()">Imprimir</button>

                                <span class="orderId">#`+allOrdersMap.idPedido+`</span>
                                <div class='nomeProd'>Total Pedido</div>
                                
                            </div> 
                        `;  
                      
 
                        // renderItensOrder(allOrdersMap.idPedido) 
 
                    })

                    innnerOrderItens( mesaKey)
                } 
 

             }) 
          
        }else{
            containerMesaDetails.setAttribute('class','openTable') 
            containerMesaDetails.innerHTML=""; 

        }
      
 
    }

    tableOptions=()=>{
        tableButton=document.querySelectorAll('.mesabutton')
        var btnsArr = Array.prototype.slice.call(tableButton);

        btnsArr.forEach(element => {
       
            element.addEventListener('click',tabledetails)
            
        });
    } 
     
 
    includOrder=(event, id)=>{ 
        event.preventDefault() 
        containerMesas=document.getElementById("mesas");

        // LIMPA CAMPOS POS CADASTRO
        inputMesa.value=""
        searchInput.value=""
        searchResult.innerHTML=""
      
        
        // MESA NOVA
        if(repeat===false){    
          alert('Mesa Adicionada')
            mesaValue={
                name:mesaNumber,
                orders:[{
                    idPedido:parseInt(Math.random() * 1000),
                    itens:prodSelected,
                }]
            }

            arrOrder.push(mesaValue) 
            prodSelected=[]
    
            containerMesas.innerHTML=` `; 
    
            if(arrOrder.length>0){
                arrOrder.map((mesaMap)=>{ 
                    
                    containerMesas.innerHTML+=`   
                        <button key='`+mesaMap.name+`' onclick="tabledetails(event)" class="mesabutton">`+mesaMap.name+`</button>
                    `; 
                })
    
                tableOptions()
    
             } 
            
            
        }else{

           // MESA EXISTENTE
            console.log('Pedido Adicionado com sucesso')
            alert('Pedido Adicionado com sucesso')

            var newOrder={
                idPedido:parseInt(Math.random() * 1000),
                itens:prodSelected
            }
            mesaValue.orders.push(newOrder)            
            var lastOrder=mesaValue.orders[mesaValue.orders.length-1].idPedido.toString

            console.log(mesaValue)
            console.log(newOrder)
            // renderItensOrder(lastOrder)
            
        } 
        relatorio()
        saved()
         
    }


    // ABRE MODAL INPUTS
    getModal=(id)=>{          
        id.classList.toggle("show");
        inputMesa=document.getElementById('mesa')

        document.getElementById('innerMesaNumber').innerHTML=''

        inputMesa.style.cssText='display:flex;'
        prodSelected=[]



    }

    // HOME FRONT PAGE
    app.innerHTML+=` 
            <h5 >Adicione Pedidos</h5> 
            <button class="btn-circle-bottom" onclick='getModal(modalMesa)'> + </button>
            <div id="mesas"></div>

                
            <div class="modal" id="modalMesa">

                        <div class="controls">
                            <button onclick='getModal(modalMesa)'>
                                < 
                            </button>
                            <button onclick='getModal(modalMesa)'>
                                x
                            </button>
                        </div>
                       
                        <h5 id="titleAdd">Adicione Pedidos</h5> 
                        <div id="innerMesaNumber"></div>
                    

                        <form>
                            <input id='mesa' onclick='tableValidation()' type='number' placeholder='Numero da Mesa'>
                            <input id='searchInput' onfocus="searched(event, searchInput)" onclick='searched(event, searchInput)' type='name' placeholder='Busque Produtos'>
                            
                            <button class="h-button" id="includOrderbtn" disabled onclick='includOrder(event, mesa)'>
                                Adicionar Pedido
                            </button>
                        </form>
                        <div id="searchResult"></div>

                </div> 
                
                <div class="openTable" id="openTable"> </div>

        `;      

}
fluxo()
 