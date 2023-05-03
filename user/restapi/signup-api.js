const { default: axios } = require("axios")

const validateForm=({name,email,password})=>{
    if(name.length <=0) return {msg:'invalid username',sts:false}
    if(password.length <=0) return{msg:'invalid password',sts:false}

    return {sts:'success',msg:'all feilds are valid'}
}
function setupForm(){
    const err=document.getElementById('errMsg')
    err.style.display='none'

    const formSignup=document.getElementById('formSignup')

    formSignup.onsubmit=ev =>{
        //when form is submited this function would be called

        ev.preventDefault()//stops the default behaviour of refreshing the page

        const formData=new formData(ev.target) 
        //ev.target points to form tag in the html

        const user=Object.fromEntries() //you are converting from data to js object
        console.log(user)

        const {sts,msg} =validateForm(user)

        if(sts) apiSignUp(user,formSignup)
        else{
            err.style.display='block'
            err.innerHTML='<strong>${msg}</strong>'
        }
    }
}
setupForm()

function apiSignUp(user,form){
    const headers={
        'content-type':'aplication/json'
    }
    axios.post('http://localhost:8080/user/',user,{headers})
    .then(res =>{
        form.reset()
        showSuccessModal()
    }).catch(err => console.log(err))
}
function showSuccessModal(){
    const myModalE1=document.getElementById('successModal');
    const modal=new bootstrap.Modal(myModalE1)
    modal.show()
}