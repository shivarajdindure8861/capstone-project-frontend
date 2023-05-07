const financesTable = document.getElementById('finances').getElementsByTagName('tbody')[0];

//   .catch(error => console.error(error));


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
     
    }
  })
  .catch(error => console.error(error));





const form = document.querySelector('#finance-form');
const result = document.querySelector('#result');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const userId = document.querySelector('#userId').value;
	const financeType = document.querySelector('#financeType').value;
	const tag = document.querySelector('#tag').value;
	const invDt = document.querySelector('#invDt').value;
	const amt = document.querySelector('#amt').value;

	axios.post('http://localhost:8080/finance/user', {
		userId: userId,
		financeType: financeType,
		tag: tag,
		invDt: invDt,
		amt: amt
	})
	.then(res => {
		result.textContent = 'Finance Info Added!';
        alert('Finance added successfully!');
        document.getElementById('finance-form').reset();
	})
	.catch(err => {
		result.textContent = 'Error Occured!';
	})
});

function submitForm(event) {
    event.preventDefault();
    const userId = document.getElementById('userId').value;
    const financeType = document.getElementById('financeType').value;
    const tag = document.getElementById('tag').value;
    const invDt = document.getElementById('invDt').value;
    const amt = document.getElementById('amt').value;
    const finance = {
      userId,
      financeType,
      tag,
      invDt,
      amt
    };
    axios.post('http://localhost:8080/finance/user', finance)
      .then((response) => {
        console.log(response);
        alert('Finance added successfully!');
        document.getElementById('finance-form').reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

const expensesCategories = ['Food', 'Rent', 'Utilities', 'Transportation', 'Entertainment'];
const incomeCategories = ['Salary', 'Bonus', 'Gift', 'Investment', 'Other'];

function populateCategories() {
  const financeType = document.getElementById('financeType').value;
  const categories = financeType === 'EXPENSES' ? expensesCategories : incomeCategories;
  const categorySelect = document.getElementById('tag');
  categorySelect.innerHTML = '';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.text = category;
    option.value = category;
    categorySelect.add(option);
  });
}