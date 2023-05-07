function sendResetLink(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;

  axios.post('http://localhost:8080/users/forgot', { email })
    .then(response => {
      console.log(response.data);
      if (response.data === 'SUCCESS') {
        alert('Reset link sent successfully!');
      window.location.href = 'file:///C:/Users/Shivakumar/capstone%20project/capstone-project-frontend/login/login.html';

      } else if (response.data === 'FAILURE') {
        alert('Email not registered :(');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error sending reset link.');
    });
}