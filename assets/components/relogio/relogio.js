relogio=()=>{

    const data=new Date()
    let hr=data.getHours()
    let mn=String(data.getMinutes()).padStart(2, '0');
    let ms=String(data.getSeconds()).padStart(2, '0')

    let horaatual=hr+":"+mn+":"+ms

    return horaatual
}

a=1
genarateID=()=>{ 
    return a+=1
}
dataHora=()=>{

    const data=new Date()
    let dia=String(data.getDate())
    let mes=String(data.getMonth()+1).padStart(2, '0') 

    // let dia=String(data.getDate()).padStart(2, '0')
    // let mes=String(data.getMonth()+1).padStart(2, '0')
    let ano=String(data.getFullYear())
   var dataAtual=dia+mes+ano
//    console.log(dataAtual )

   return dataAtual
}   
//  setInterval(relogio(),500)

//  setInterval(genarateID, 500);
 