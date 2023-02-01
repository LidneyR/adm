closeOrder=(id)=>{

    dadosConta=id
    // console.log('closeOrder',dadosConta)
    
    VENDASOPENOW.map((atualVendaMap)=>{
        atualVendaMap.data.map((dataAtualMap)=>{
          if(dataAtualMap.mesa){ 

              if(dataAtualMap.mesa==dadosConta){
            //   console.log(dataAtualMap)

              }

          }else if(dataAtualMap.name){ 
            console.log(dataAtualMap.name)
            console.log(dadosConta)

            if(dataAtualMap.name==dadosConta){
                console.log(dataAtualMap)

            }
          }
        })
    })
}