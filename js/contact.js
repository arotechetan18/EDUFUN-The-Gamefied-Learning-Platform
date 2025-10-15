info =[];

function submitform() {
    
    let ElementName =document.getElementById('input-box-1')
    let ElementEmail= document.getElementById('input-box-2')
    let ElementPhone =document.getElementById('input-box-3')
    let ElementMessage=document.getElementById('input-box-4')

    databasee={
      name:ElementName.value,
      email:ElementEmail.value,
      phone :ElementPhone.value,
      message:ElementMessage.value 
     
    }
    info.push(databasee)
 localStorage.setItem("key" , JSON.stringify(info));
 
 window.location.href="./../pages/contact_report.html"
   
}