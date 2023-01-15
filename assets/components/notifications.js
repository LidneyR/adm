containerNotification=document.getElementById('notifications')
qtdNotification=document.getElementById('notQtd')
notificationView=document.getElementById('notificationView')

appNotification=()=>{ 

    console.log(containerNotification)
}

  // ABRE MODAL INPUTS
  getModalNotification=()=>{          
    containerNotification.classList.toggle("show");  

}