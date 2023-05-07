function setupTable() {
  const table = document.getElementById('tableInvoice')

  const btnSearch = document.getElementById('btnSearch')
  
  btnSearch.onclick = () =>   {

      apiFetchAllCustomerInvoices(table, document.getElementById('txtClient').value )
  }

  apiFetchAllInvoices(table)
  // populateStaticData(table)
}

setupTable()

// function populateStaticData(table) {
//     for(let i = 0 ; i < 10; i++) {
//         const row = table.insertRow()
//         row.insertCell(0).innerHTML = i + 1
//         row.insertCell(1).innerHTML = 'abc'
//         row.insertCell(2).innerHTML = "salary"
//         row.insertCell(3).innerHTML = '2020-01-01'
//         row.insertCell(4).innerHTML = 23341
//         row.insertCell(5).innerHTML = `<a href='#'>View</a> <a class='ms-2' href='#'>Update</a> <a class='ms-2' href='#'>Delete</a> `
//     }
// }

function propulateActualData(table, invoices) {

  for(const invoice of invoices) {

      const { id, financeType, tag, invDt, amt } = invoice
      const updatePageUrl = `./update-invoice.html?id=${id}`
      const viewPageUrl = `./view-invoice.html?id=${id}`

      const row = table.insertRow()
      row.insertCell(0).innerHTML = id
      row.insertCell(1).innerHTML = financeType
      row.insertCell(2).innerHTML = tag
      row.insertCell(3).innerHTML = invDt
      row.insertCell(4).innerHTML = amt
      row.insertCell(5).innerHTML = `
           <a href='${viewPageUrl}'>View</a> 
           <a class='ms-2' href='${updatePageUrl}'>Update</a> 
          <a class='ms-2' onclick='showConfirmDeleteModal(${id})'>Delete</a>`
  }
}

function showConfirmDeleteModal(id) {
  console.log('clicked ' + id)
  const myModalEl = document.getElementById('deleteModal');
  const modal = new bootstrap.Modal(myModalEl)
  modal.show()

  const btDl = document.getElementById('btDl')
  btDl.onclick = () => {
      apiCallDeleteInvoice(id, modal)
  }
}

function apiFetchAllInvoices(table) {
  axios.get('http://localhost:8080/finance/user-finances')
      .then(res => {
          const { data } = res
          console.log(data)  
          const { sts, msg, bd } = data

          propulateActualData(table, bd)
      })
      .catch(err => console.log(err))
}

// function apiFetchAllCustomerInvoices(table, id) {
//     const url = `http://localhost:8080/invoice/customer/${id}`
//     axios.get(url)
//         .then(res => {
//             const { data } = res
//             console.log(data)  
//             const { sts, msg, bd } = data

//             propulateActualData(table, bd)
//         })
//         .catch(err => console.log(err))
// }


function apiCallDeleteInvoice(id, modal) {
  const url = `http://localhost:8080/finance/delete/${id}`

  axios.delete(url)
      .then(res => res.data) // you converted complete response in to our business reponse
      // .then( data => console.log(data.msg) ) // this line can be written in destructured form as below
      .then( ({ sts, msg, bd }) =>  modal.hide() )
      .catch(console.log)
}
axios.get('http://localhost:8080/finance/user-finances')
  .then(response => {
    const data = response.data;
    data.bd.sort((a, b) => new Date(a.invDt) - new Date(b.invDt)); // sort by invDt
    for (let finance of data.bd) {
      const financeRow = financesTable.insertRow();
      financeRow.insertCell().textContent = finance.financeType;
      financeRow.insertCell().textContent = finance.tag;
      financeRow.insertCell().textContent = finance.invDt;
      financeRow.insertCell().textContent = finance.amt;
    }
  })
  .catch(error => console.error(error));