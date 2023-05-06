const form = document.getElementById('formSignup');
const nameInput = document.getElementById('user');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!name) {
        alert('Please enter your name.');
        nameInput.focus();
        return;
    }
    
    if (!email) {
        alert('Please enter your email.');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email.');
        emailInput.focus();
        return;
    }
    
    if (!password) {
        alert('Please enter your password.');
        passwordInput.focus();
        return;
    }
    
    if (password.length < 8) {
        passwordError.innerText = 'Password must be at least 8 characters long.';
        passwordInput.focus();
        return;
    }
    const user={name,email,password};
    axios.post('http://localhost:8080/users/register',user)
        .then(response =>{
            console.log(response.data);
            alert('User created successfully!');
            window.location.href='file:///C:/Users/Shivakumar/capstone%20project/capstone-project-frontend/login/login.html';
            form.reset();
            showSuccessModal()
        })
        .catch(error =>{
            console.log(error);
            alert('Error in creating the user')
        });
    
    signup(name, email, password);
});

function isValidEmail(email) {
    // regular expression for email validation
    const emailRegex = /^([a-zA-Z0-9_\-.])+@([a-zA-Z0-9_\-.])+\.([a-zA-Z])+$/;
    return emailRegex.test(email);
}
function showSuccessModal() {
  const myModalEl = document.getElementById('successModal');
  const modal = new bootstrap.Modal(myModalEl)
  modal.show()
}
