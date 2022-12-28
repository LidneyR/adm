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

    <div id="login" style="display:nxone;"> 
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
        //  console.log(inputMesa.value)
        }

        inputMesa.addEventListener('blur', (event) => {
            mesaNumber=inputMesa.value
            if(arrOrder.length>0){
                arrOrder.map((allTabs)=>{
                    if(mesaNumber==allTabs.name){
                        document.getElementById('includOrderbtn').disabled = true

                    }else{
                        // document.getElementById('includOrderbtn').removeAttribute('disable')
                document.getElementById('includOrderbtn').disabled = false

                    }
 
                })

            }else{ 
                document.getElementById('includOrderbtn').disabled = false

                console.log("oi")


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
        
            if(keyProd.toString()===prods.id){
                prodSelected.push(prods)
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
 
    includOrder=(event, id)=>{ 
        event.preventDefault() 
        inputMesa.value=""
        searchInput.value=""
        searchResult.innerHTML=""
        alert('Mesa Adicionada')

        var containerMesas=document.getElementById("mesas");
        
        
           mesaValue={
            name:mesaNumber,
            orders:[{
                idPedido:"10101",
                itens:prodSelected,
            }]
        }

        
        
        openTable=(key)=>{ 
             
 
            openTable=document.getElementById('openTable')

            console.log(openTable)
            
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

        
        toggleTable=()=>{
            console.log('ola')
            openTable.classList.toggle('show')

        }
        arrOrder.push(mesaValue) 
        containerMesas.innerHTML=` `; 

        if(arrOrder.length>0){
            arrOrder.map((mesaMap)=>{ 
         
                containerMesas.innerHTML+=`   
                    <button key='`+mesaMap.name+`' class="mesabutton" onclick="openTable(`+mesaMap.name+`)">`+mesaMap.name+`</button>
                `; 
            })
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
                            <input id='mesa' onclick='tableValidation()' type='name' placeholder='Numero da Mesa'>
                            <input id='searchInput' onclick='searched(event, searchInput)' type='name' placeholder='Busque Produtos'>
                            
                            <button class="h-button" id="includOrderbtn" disabled onclick='includOrder(event, mesa)'>
                                Adicionar Pedido
                            </button>
                        </form>
                        <div id="searchResult"></div>

                </div> 
                
                <div class="openTable" id="openTable">
                <button onclick="toggleTable()"><</button>
                <button onclick="toggleTable()">x</button>
                </div>

        `;      

}
fluxo()

