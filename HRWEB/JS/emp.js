const Link = "https://turbo-umbrella-g46jx4pprv9q39gr-5005.app.github.dev/employee";
fetch(Link)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed To Fetch Data");
    }
    return response.json();
  }).then(data => {
    const tbody = document.querySelector("#countryTable tbody");
    data.forEach(emp => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${emp.employee_id}</td>
        <td>${emp.first_name}</td>
        <td>${emp.last_name}</td>
        <td>${emp.email}</td>
        <td>${emp.phone_number}</td>
        <td>${emp.hire_date}</td>
        <td>${emp.job_id}</td>
        <td>${emp.salary}</td>
        <td>${emp.commission_pct}</td>
        <td>${emp.manager_id}</td>
        <td>${emp.department_id}</td>
        
      `;
      tbody.appendChild(row);
    });
  }).catch(err => {
    console.log(err.message)
  });