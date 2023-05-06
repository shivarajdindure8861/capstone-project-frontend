const form = document.querySelector('form');
const loginStatus = document.querySelector('#login-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

//   try {
//     const response = await axios.post('http://localhost:8080/users/login', {
//       email,
//       password
//     });
//     console.log(response.status)
//     if (response.status === "SUCCESS") {
//       loginStatus.innerHTML = 'Login successful';
//       window.location.href = 'D:/Capstone Project/Capstone-Project-Frontend/Dashboard/index.html';
//     }
//     else if((response.status === 'FAILURE')) {
//       alert("Wrong Credentials")
//     }
//   } catch (error) {
//     loginStatus.alert = 'Login failed';
//     alert("Login failed")
//   }
// });

axios.post('http://localhost:8080/users/login', { email,password })
    .then(response => {
      console.log(response.data);
      if (response.data === 'SUCCESS') {
        alert('login');
      window.location.href = ' file:///C:/Users/Shivakumar/capstone%20project/capstone-project-frontend/dashboard/index.html';

      } else if (response.data === 'FAILURE') {
        alert('Wrong Credentials :(');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error .');
    });})
   