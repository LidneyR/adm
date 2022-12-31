// arquivo principal.js
// import { data} from './api'
var app=document.getElementById('app')
 


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

    <div id="login" style="display:none;"> 
        <div class="form">
            <form>
                <input type='text' id='nameuser' placeholder='Digite suas credênciais'>
                <input type="password" id="pass" placeholder='Senha' name="password"
                minlength="8" required>
                <button class="btn-circle-bottom" onclick='validationLogin(nameuser, pass)'>Entrar</button>
            </form>
        </div>
    </div>
    `; 

    validationLogin=(nameuser,pass)=>{
        var nameValue=nameuser.value
        var userPass=pass.value

     

        if(nameValue==='canoas'){
          
            document.getElementById('login').style.cssText="display:none;"
        }else{
            alert('Dados Incorretos')
            nameuser.value=""
        }
    }

}login()

function  fluxo(){
    
    var arrOrder=[] //array de vendas na mesa
    prodSelected=[] //Array de Produtos selecionados 
    mesaNumber=0
 
    tableValidation=()=>{
        inputMesa=document.getElementById('mesa')

        submitTable=()=>{ 
            valueMesa=inputMesa.value
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
                        // document.getElementById('includOrderbtn').disabled = true  
                        repeat=true
                        
                    }else{ 
                        document.getElementById('includOrderbtn').disabled = false
                    }
                })

            }else{ 
                document.getElementById('includOrderbtn').disabled = false
             }

             if(newOrder.length>0){ 
                const newOrder = {idPedido:"101010",itens:prodSelected}
                // newOrder.push(x)
                // console.log(newOrder)
                // console.log(mesaValue.orders)
                // console.log(mesaValue)
                // console.log(newOrder.idPedido!=mesaValue.orders)
                // console.log(mesaValue.orders)
                // repeatTable()
            }


             

        });  
      
        inputMesa.addEventListener('keyup', _.debounce(submitTable, 500)) 

    }

    searched=(event, searchInput)=>{
        event.preventDefault()
        searchIn=searchInput
        prodsArray=[]
       

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

                // console.log(allProd)
                // console.log(keyProd)
            
                if(keyProd.toString()===prods.id){

                    prodSelected.push(prods)
                    console.log(prodSelected)
                }
                

        })
    


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

        var mesaKey=event.target.getAttribute('key')
        var containerMesaDetails=document.getElementById('openTable')



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

                if(ordersMap.name===mesaKey){
                    containerMesaDetails.innerHTML=`  

                            <div class="controls">
                                 <button onclick="tabledetails(event)"><</button>
                                <button onclick="tabledetails(event)">x</button>    
                            </div>

 

                    `; 
                    ordersMap.orders.map((allOrdersMap)=>{
                    
                        containerMesaDetails.innerHTML+=`  
                            <div class="card" id="`+allOrdersMap.idPedido+`">
                                <span class="orderId">`+allOrdersMap.idPedido+`</span>
                                
                            </div> 
                        `;  
                        renderItensOrder(allOrdersMap.idPedido) 
 
                    })
                } 

                
              

             })



            //  if(mesaKey==)
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
     
        var containerMesas=document.getElementById("mesas");

        inputMesa.value=""
        searchInput.value=""
        searchResult.innerHTML=""
        alert('Mesa Adicionada')
        
        mesaValue={
            name:mesaNumber,
            orders:[{
                idPedido:"201030",
                itens:prodSelected,
            }]
        }

        // prodSelected=[]
        
        openTable=(key)=>{ 
              
            openTable=document.getElementById('openTable') 
            arrOrder.map((mesaMap)=>{
                if(mesaMap.name===key.toString()){

                    mesaMap.orders.map((mesaOrderMap)=>{   

                        openTable.classList.toggle('show') 
                        openTable.innerHTML+=` 
                            <div class="idPedido">
                                `+mesaOrderMap.idPedido+`
                            </div> 
                        `; 

                        mesaOrderMap.itens.map((orderItens)=>{ 
                            document.getElementById('openTable').innerHTML+=` 
                            <div class="produtoMesa">
                            `+orderItens.id+`
                             `+orderItens.name+`
                            `+orderItens.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</div>
                            `; 
                        })

                    }) 
                } 
            
            })

    
        
        }

        arrOrder.push(mesaValue) 
        containerMesas.innerHTML=` `; 

        if(arrOrder.length>0){
            arrOrder.map((mesaMap)=>{ 
                
                containerMesas.innerHTML+=`   
                    <button key='`+mesaMap.name+`' onclick="tabledetails(event)" class="mesabutton">`+mesaMap.name+`</button>
                `; 
            })

            tableOptions()

         }
        console.log(repeat)
         
        if(repeat==true){
         x={idProduto:'8888',itens:prodSelected}
         mesaValue.orders.push(x)
         console.log(mesaValue.orders)
         console.log(prodSelected)
        }
    }

    getModal=(id)=>{          
        id.classList.toggle("show");
    }

    var testOrder=[{
        name:'10',
        orders:[{
            idPedido:'',
            itensPedido:[{
                name:'Pastel'
            },]

        }]
    },{
        name:'20',
        orders:[{
            idPedido:'',
            itensPedido:[{
                name:'Pizza'
            },]

        }]
    }]

    app.innerHTML+=` 
            <h5>Adicione Pedidos</h5> 
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
                        <h5>Adicione Pedidos</h5> 
                    

                        <form>
                            <input id='mesa' onclick='tableValidation()' type='number' placeholder='Numero da Mesa'>
                            <input id='searchInput' onclick='searched(event, searchInput)' type='name' placeholder='Busque Produtos'>
                            
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
 