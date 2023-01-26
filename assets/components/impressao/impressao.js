

getPrint=(data)=>{
    console.log(data)


    setor=document.querySelectorAll('.setor')
    dataOrder=document.getElementById('dataOrder')
    controlspage=document.querySelector('div#openTable .controls')
    Array.from(setor).map((setorMap)=>{
        console.log(setorMap)

        setorMap.style.cssText='display:none;'
    })
    data.style.cssText='display:block;'
    dataOrder.style.cssText='display:none;'
    controlspage.style.cssText='display:none'
    console.log(controlspage)

    setTimeout(function(){ 
        dataOrder.style.cssText='display:inherit;'
        controlspage.style.cssText='display:flex'

        

    }, 5000);

    window.print()
}