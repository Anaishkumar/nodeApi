const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    try{
        res.json('WELCOME TO HR API')
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO HR API')
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/region',async(req,res)=>{
    try{
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/country',async(req,res)=>{
    try{
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});
app.get('/count_emp',async(req,res)=>{
    try{
        const result = await pool.query('select count(First_name) as count from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/employee',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/job',async(req,res)=>{
    try{
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
}
);  

app.get('/job_id',async(req,res)=>{
    try{
        const result = await pool.query('select job_id from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
}
);  

app.get('/job_title',async(req,res)=>{
    try{
        const result = await pool.query('select job_title from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
}
);


app.get('/location',async(req,res)=>{
    try{
        const result = await pool.query('select * from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
}
);  

app.get('/department',async(req,res)=>{
    try{
        const result = await pool.query('select * from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
}
);

app.get('/job_history',async(req,res)=>{
    try{
        const result = await pool.query('select * from job_history');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/total_emp',async(req,res)=>{  
    try{
        const result = await pool.query('select count(*) as total_emp from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
}
);











































// 2. Locations with postal code <= 50000
app.get('/locations/low-postal', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM locations WHERE postal_code <= '50000' LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Jobs with minimum salary > 50000
app.get('/jobs/high-salary', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jobs WHERE min_salary > 50000');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Departments with managers assigned
app.get('/departments/with-managers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM departments WHERE manager_id IS NOT NULL LIMIT 3');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 6: Regions where region_name like '%America%'
app.get('/regions/america', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM regions WHERE region_name LIKE '%America%'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 7: Employees where commission_pct = 0.1, limit 4
app.get('/employees/commission', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees WHERE commission_pct = 0.1 LIMIT 4");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 8: Countries where region_id between 3 and 6, limit 3
app.get('/countries/region-id', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM countries WHERE region_id BETWEEN 3 AND 6 LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 9: Locations where city like 'New%'
app.get('/locations/new-city', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM locations WHERE city LIKE 'New%'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 10: Jobs where job_title not like '%Manager%', limit 3
app.get('/jobs/no-manager', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM jobs WHERE job_title NOT LIKE '%Manager%' LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 11: Departments where manager_id in (101, 102)
app.get('/departments/with-managers', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM departments WHERE manager_id IN (101, 102)");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 12: Employees join departments where department_id not between 100 and 190, limit 3
app.get('/employees/not-in-department', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.* FROM employees e JOIN departments d ON e.department_id = d.department_id WHERE e.department_id NOT BETWEEN 100 AND 190 LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 13: Employees where hire_date between '2022-01-01' and '2022-06-30'
app.get('/employees/hire-date', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees WHERE hire_date BETWEEN '2022-01-01' AND '2022-06-30'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 14: Job history where employee_id in (101, 109, 113)
app.get('/job-history/employees', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM job_history WHERE employee_id IN (101, 109, 113)");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 15: Employees where first_name like 'J%' and last_name like 'D%'
app.get('/employees/name-pattern', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees WHERE first_name LIKE 'J%' AND last_name LIKE 'D%'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 16: Employees where salary > 5000 and commission_pct < 0.15
app.get('/employees/salary-commission', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees WHERE salary > 5000 AND commission_pct < 0.15");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 17: Countries where country_name like '%nd'
app.get('/countries/nd', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM countries WHERE country_name LIKE '%nd'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 18: Locations where street_address like '%street%'
app.get('/locations/street', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM locations WHERE street_address LIKE '%street%'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 19: Jobs where job_title like '%Senior%'
app.get('/jobs/senior', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM jobs WHERE job_title LIKE '%Senior%'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 20: Departments where department_name like '%HR%'
app.get('/departments/hr', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM departments WHERE department_name LIKE '%HR%'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 21: Countries where region_id in (1, 2, 3), limit 3
app.get('/countries/region', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM countries WHERE region_id IN (1, 2, 3) LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 22: Countries where country_id in ('US', 'UK', 'CA')
app.get('/countries/ids', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM countries WHERE country_id IN ('US', 'UK', 'CA')");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 23: Jobs where job_id in ('IT_PROG', 'SA_REP', 'HR_REP')
app.get('/jobs/job-id', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM jobs WHERE job_id IN ('IT_PROG', 'SA_REP', 'HR_REP')");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 24: Departments where department_id in (100, 200, 300)
app.get('/departments/ids', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM departments WHERE department_id IN (100, 200, 300)");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 25: Employees join departments where department_name in ('IT', 'Finance')
app.get('/employees/departments', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.* FROM employees e JOIN departments d ON e.department_id = d.department_id WHERE d.department_name IN ('IT', 'Finance')");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 26: Regions where region_id between 3 and 6
app.get('/regions/range', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM regions WHERE region_id BETWEEN 3 AND 6");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 27: Countries where region_id between 1 and 3, limit 3
app.get('/countries/region-range', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM countries WHERE region_id BETWEEN 1 AND 3 LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 28: Locations where postal_code between '1000' and '2000'
app.get('/locations/postal-code', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM locations WHERE postal_code BETWEEN '1000' AND '2000'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 29: Jobs where min_salary between 4000 and 6000 or max_salary between 4000 and 6000, limit 3
app.get('/jobs/salary-range', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM jobs WHERE min_salary BETWEEN 4000 AND 6000 OR max_salary BETWEEN 4000 AND 6000 LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 30: Departments where department_id between 100 and 200
app.get('/departments/range', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM departments WHERE department_id BETWEEN 100 AND 200");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 31: Employees and department_name, limit 3
app.get('/employees/department-name', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, d.department_name FROM employees e JOIN departments d ON e.department_id = d.department_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Query 32: Countries with region_name, left outer join with regions, limit 3
app.get('/countries/region-name', async (req, res) => {
    try {
        const result = await pool.query("SELECT c.*, r.region_name FROM countries c LEFT OUTER JOIN regions r ON c.region_id = r.region_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 33: Country name and locations, left outer join with countries, limit 3
app.get('/locations/countries', async (req, res) => {
    try {
        const result = await pool.query("SELECT c.country_name, l.* FROM locations l LEFT OUTER JOIN countries c ON l.country_id = c.country_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 34: Jobs, employees, and department name, joins between jobs, employees, and departments, limit 3
app.get('/jobs/employees-departments', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, d.department_name FROM jobs j JOIN employees e ON j.job_id = e.job_id JOIN departments d ON d.department_id = e.department_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 35: Employees and job titles, join between jobs and employees, limit 3
app.get('/employees/job-titles', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, j.job_title FROM jobs j JOIN employees e ON j.job_id = e.job_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 36: Employees and manager_id from departments, join between employees and departments, limit 3
app.get('/employees/managers', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, d.manager_id FROM employees e JOIN departments d ON d.department_id = e.department_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 37: Employees, department_name, street_address from departments and locations, limit 3
app.get('/employees/departments-locations', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, d.department_name, l.street_address FROM employees e LEFT OUTER JOIN departments d ON e.department_id = d.department_id JOIN locations l ON l.location_id = d.location_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 38: Employees with country_name and region_name, multiple joins, limit 3
app.get('/employees/country-region', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, c.country_name, r.region_name FROM employees e LEFT OUTER JOIN departments d ON e.department_id = d.department_id JOIN locations l ON l.location_id = d.location_id JOIN countries c ON c.country_id = l.country_id JOIN regions r ON r.region_id = c.region_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 39: Employees, department_name, job_title from employees, departments, and jobs, limit 3
app.get('/employees/department-job', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, d.department_name, j.job_title FROM employees e LEFT OUTER JOIN departments d ON e.department_id = d.department_id JOIN jobs j ON e.job_id = j.job_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 40: Employees with country_name and street_address, join between departments, locations, and countries, limit 3
app.get('/employees/country-street', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, c.country_name, l.street_address FROM employees e LEFT OUTER JOIN departments d ON e.department_id = d.department_id JOIN locations l ON l.location_id = d.location_id JOIN countries c ON c.country_id = l.country_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 41: Employees with job history, left outer join between employees and job history, limit 3
app.get('/employees/job-history', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.* FROM employees e LEFT OUTER JOIN job_history j ON j.employee_id = e.employee_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 42: Employees with job history, full outer join between employees and job history, limit 3
app.get('/employees/full-job-history', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, j.* FROM employees e FULL OUTER JOIN job_history j ON e.employee_id = j.employee_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 43: Job history, employees, and department_name, inner join between job history, employees, and departments, limit 3
app.get('/job-history/employee-department', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.first_name, d.department_name FROM employees e INNER JOIN job_history j ON j.employee_id = e.employee_id JOIN departments d ON e.department_id = d.department_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 44: Job history, employees, department_name, and street_address, inner join between job history, employees, departments, and locations, limit 3
app.get('/job-history/employee-department-location', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.first_name, d.department_name, l.street_address FROM employees e INNER JOIN job_history j ON j.employee_id = e.employee_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 45: Job history, employees, department_name, and country_name, inner join between job history, employees, departments, locations, and countries, limit 3
app.get('/job-history/employee-department-country', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.first_name, d.department_name, c.country_name FROM employees e INNER JOIN job_history j ON j.employee_id = e.employee_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON c.country_id = l.country_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 46: Job history, employees, and department_name, inner join between job history, employees, and departments, limit 3
app.get('/job-history/employee-department-limit', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.first_name, d.department_name FROM employees e INNER JOIN job_history j ON j.employee_id = e.employee_id JOIN departments d ON e.department_id = d.department_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Query 47: Employees, job history, and job title, inner join with jobs, limit 3
app.get('/employees/job-history-job-title', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.first_name, jj.job_title FROM employees e INNER JOIN job_history j ON j.employee_id = e.employee_id JOIN jobs jj ON jj.job_id = j.job_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 48: Employees, job history, job title, and department name, limit 3
app.get('/employees/job-history-department', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.first_name, jj.job_title, d.department_name FROM employees e INNER JOIN job_history j ON j.employee_id = e.employee_id JOIN jobs jj ON jj.job_id = j.job_id JOIN departments d ON d.department_id = e.employee_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 49: Employees, job history, job title, department name, and location, limit 3
app.get('/employees/job-history-department-location', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.first_name, jj.job_title, d.department_name FROM employees e INNER JOIN job_history j ON j.employee_id = e.employee_id JOIN jobs jj ON jj.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON l.location_id = d.location_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 50: Employees, job history, job title, and country name, limit 3
app.get('/employees/job-history-country', async (req, res) => {
    try {
        const result = await pool.query("SELECT j.*, e.first_name, jj.job_title, c.country_name FROM employees e INNER JOIN job_history j ON j.employee_id = e.employee_id JOIN jobs jj ON jj.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON l.location_id = d.location_id JOIN countries c ON c.country_id = l.country_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 51: Regions, country name, and street address, join between regions, countries, and locations, limit 3
app.get('/regions/country-street', async (req, res) => {
    try {
        const result = await pool.query("SELECT r.*, c.country_name, l.street_address FROM regions r JOIN countries c ON c.region_id = r.region_id JOIN locations l ON l.country_id = c.country_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 52: Regions, country name, and street address, left outer join between regions, countries, and locations, limit 3
app.get('/regions/country-street-left', async (req, res) => {
    try {
        const result = await pool.query("SELECT r.*, c.country_name, l.street_address FROM regions r LEFT OUTER JOIN countries c ON c.region_id = r.region_id JOIN locations l ON l.country_id = c.country_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 53: Locations, country name, and region name, left outer join between locations, countries, and regions, limit 3
app.get('/locations/country-region', async (req, res) => {
    try {
        const result = await pool.query("SELECT r.*, c.country_name, l.street_address FROM locations l LEFT OUTER JOIN countries c ON l.country_id = c.country_id JOIN regions r ON c.region_id = r.region_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 54: Departments, employees, and street address, left outer join with departments, employees, and locations, limit 3
app.get('/departments/employees-location', async (req, res) => {
    try {
        const result = await pool.query("SELECT d.*, e.first_name, l.street_address FROM departments d LEFT OUTER JOIN employees e ON d.department_id = e.department_id LEFT OUTER JOIN locations l ON d.location_id = l.location_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 55: Departments, employees, street address, and country name, left outer join with departments, employees, locations, and countries, limit 3
app.get('/departments/employees-location-country', async (req, res) => {
    try {
        const result = await pool.query("SELECT d.*, e.first_name, l.street_address, c.country_name FROM departments d LEFT OUTER JOIN employees e ON d.department_id = e.department_id LEFT OUTER JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 56: Employees with manager name, department name, and location, left outer join between employees and managers, limit 3
app.get('/employees/manager-department-location', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.employee_id, CONCAT(m.first_name, ' ', m.last_name) AS MANAGER_NAME, d.department_name FROM employees e LEFT OUTER JOIN employees m ON e.employee_id = m.employee_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 57: Employees, job title, department name, and location city, limit 3
app.get('/employees/job-department-location', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.*, j.job_title, d.department_name, l.city FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 58: Employees with manager name, department name, and job title, limit 3
app.get('/employees/manager-department-job', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.employee_id, CONCAT(m.first_name, ' ', m.last_name) AS MANAGER_NAME, d.department_name, j.job_title FROM employees e LEFT OUTER JOIN employees m ON e.employee_id = m.employee_id JOIN departments d ON e.department_id = d.department_id JOIN jobs j ON j.job_id = e.job_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 59: Employees with manager name, department name, job title, and street address, limit 3
app.get('/employees/manager-department-job-location', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.employee_id, CONCAT(m.first_name, ' ', m.last_name) AS MANAGER_NAME, d.department_name, l.street_address, j.job_title FROM employees e LEFT OUTER JOIN employees m ON e.employee_id = m.employee_id JOIN departments d ON e.department_id = d.department_id JOIN jobs j ON j.job_id = e.job_id JOIN locations l ON d.location_id = l.location_id LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 60: Countries where region_id = 1
app.get('/countries/region-1', async (req, res) => {
    try {
        const result = await pool.query("SELECT country_name FROM countries WHERE region_id = 1");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 61: Departments with city starting with 'N', join between departments and locations
app.get('/departments/city-n', async (req, res) => {
    try {
        const result = await pool.query("SELECT d.department_name FROM departments d JOIN locations l ON d.location_id = l.location_id WHERE l.city LIKE 'N%'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Query 62: Employees with department manager commission greater than 0.15, limit 3
app.get('/employees/manager-commission', async (req, res) => {
    try {
        const result = await pool.query("SELECT e.* FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN employees m ON d.manager_id = m.employee_id WHERE m.commission_pct > 0.15 LIMIT 3");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});









const PORT = process.env.PORT || 6005;
app.listen(PORT,()=>{
      console.log(`Connected Successfully...on PORT ${PORT}`)
});