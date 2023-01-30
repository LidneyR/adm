relogio=()=>{

    const data=new Date()
    let hr=data.getHours()
    let mn=data.getMinutes()
    let ms=data.getSeconds()


    let horaatual=hr+":"+mn+":"+ms
    // console.log(horaatual)

    document.getElementById('relogio').innerHTML=`<h5>Horário de Brasilia `+horaatual+`</h5>`

    return horaatual
}   

//  setInterval(relogio(),500)

 setInterval(relogio, 500);