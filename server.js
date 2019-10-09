// MEDIUM: Create a JSON file that will have 10 employees in it, their employeeID, their name, their salary and department name.
// Then, create an express API so that when you hit the endpoint with a GET request we want the api to respond with all data on the employees.
// If you hit the endpoint with their employeeID, we want to hand up only the information on that one employee.
// If you hit the endpoint with an incorrect employeeID, send back the correct HTTP status code and an error message stating that the employee was not found.

const express = require('express');
//creating express module
// const express = require("../mchallenge/employee.JSON");
//linking our express variable to our .JSON folder so we can get our employee information 
const app = express();
const data = require('./employees.json');
app.use(express.json());
const Joi = require("joi");

app.get("/employees", (req, res) => {
    res.send(data);
});
//
app.get("/employees/:id", (req, res) => {
    const id = req.params.id
    const Employee = employees.filter(
        employee => employee.employeeID === id
    );
    //making sure we only get the employee ID
    if (Employee.length > 0) {
        return res.send(Employee);
    }
    //created an if statment to return the employees info
    res.status(404).send('Employee Not Found');
});

//data brings in the file and employees passes through the data






//   HARD: Add the remaining CRUD functionality to your medium problem.
// Make sure you return the proper HTTP status codes based on the outcome of the request. Be sure to implement error checking here.
// If an invalid request is made, we want to return some sort of error message and the correct HTTP status code for the situation.

// POST PUT AND DELETE  is what is left to add from CRUD 
app.post("/employees/", (req, res) => {
    const { error } = validateEmployees(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const e = {
        employeeID: data.employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    };
    data.employees.push(e);
    res.send(e);
});

app.put("/employees/:id", (req, res) => {
    const employee = data.employees.find(
        e => e.employeeID === parseInt(req.params.id)
    );
    if (!employee) return res.status(404).send("the employee was not found")
    //   ​
    const { error } = validateEmployees(req.body); // same as doing result.error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    employee.name = req.body.name;
    employee.salary = req.body.salary;
    employee.Department = req.body.Department;

    res.send(employee);
});




// DELETE Removing the employee with specific ID from the data pool 
app.delete("/employees/:id", (req, res) => {
    const employee = data.employees.find(
        e => e.employeeID === parseInt(req.params.id)
    );   // splice deletes it from the array
    if (!employee) return res.status(404).send("the employee was not found");

    const index = data.employees.indexOf(employee);
    data.employees.splice(index, 1);

    employee.name = req.body.name;
    employee.salary = req.body.salary;
    employee.Department = req.body.Department;
    res.send(employee);
});

// here i made it so that it has a 3 charecter minimum aka setting a perameter
validateEmployees = e => {
    const schema = {
        name: Joi.string()
            .min(3)
            .required(),
        salary: Joi.string()
            .min(3)
            .required(),
        Department: Joi.string()
            .min(3)
            .required(),
    };
    return Joi.validate(e, schema);
};



// we must include this at the end to make sure it goes live and we tell it where too.
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})