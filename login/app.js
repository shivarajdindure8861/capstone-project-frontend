const form = document.querySelector('form');
const loginStatus = document.querySelector('#login-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;


axios.post('http://localhost:8080/users/login', { email,password })
    .then(response => {
      console.log(response.data);
      if (response.data === 'SUCCESS') {
        alert('Welcome to Finance tracker aplication !');
      window.location.href = ' file:///C:/Users/Shivakumar/capstone%20project/capstone-project-frontend/dashboard/index.html';

      } else if (response.data === 'FAILURE') {
        alert('Wrong Credentials !');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error .');
    });})
   