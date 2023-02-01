relogio=()=>{

    const data=new Date()
    let hr=data.getHours()
    let mn=data.getMinutes()
    let ms=data.getSeconds()


    let horaatual=hr+":"+mn+":"+ms
    // console.log(horaatual)

    document.getElementById('relogio').innerHTML=`<h5>Horário de Brasília `+horaatual+`</h5>`

    return horaatual
}   
dataHora=()=>{

    const data=new Date()
    let dia=String(data.getDate())
    let mes=String(data.getMonth()+1)

    // let dia=String(data.getDate()).padStart(2, '0')
    // let mes=String(data.getMonth()+1).padStart(2, '0')
    let ano=String(data.getFullYear())

   var dataAtual=dia+'.'+mes+'.'+ano
   return dataAtual
}   

dataHora()
//  setInterval(relogio(),500)

 setInterval(relogio, 500);