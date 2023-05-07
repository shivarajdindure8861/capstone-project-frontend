const financesTable = document.getElementById('finances').getElementsByTagName('tbody')[0];



  axios.get('http://localhost:8080/finance/user-finances')
  .then(response => {
    const data = response.data;
    for (let finance of data.bd) {
      const financeRow = financesTable.insertRow();
      financeRow.insertCell().textContent = finance.id;
      financeRow.insertCell().textContent = finance.financeType;
      financeRow.insertCell().textContent = finance.tag;
      financeRow.insertCell().textContent = finance.invDt;
      financeRow.insertCell().textContent = finance.amt;
      // financeRow.insertCell().textContent = finance.userDto.id;
      // financeRow.insertCell().textContent = finance.userDto.name;
      // financeRow.insertCell().textContent = finance.userDto.email;
    }
  })
  .catch(error => console.error(error));


const incomeEndpoint = 'http://localhost:8080/finance/total-income';
const expensesEndpoint = 'http://localhost:8080/finance/total-expenses';

// Fetch data from endpoints using Axios
axios.all([
  axios.get(incomeEndpoint),
  axios.get(expensesEndpoint)
]).then(axios.spread((incomeResponse, expensesResponse) => {
  const income = incomeResponse.data;
  const expenses = expensesResponse.data;

  // // Calculate the total income and expenses
  // const totalIncome = income.reduce((acc, curr) => acc + curr, 0);
  // const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);

  const donutChart = new Chart('donut-chart', {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [{
        data: [income, expenses],
        backgroundColor: ['#E03424', '#0057B8'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
})).catch(error => {
  console.log('Error fetching data:', error);
});
