# node-server
Create a JSON file that will have 10 employees in it, their employeeID, their name, their salary and department name.
    Then, create an express API so that when you hit the endpoint with a GET request we want the api to respond with all data on the employees.
    If you hit the endpoint with their employeeID, we want to hand up only the information on that one employee.
    If you hit the endpoint with an incorrect employeeID, send back the correct HTTP status code and an error message stating that the employee was not found.
    GET::myendpointname.com/employees = Json with information from all 10 employees.
    GET::myendpointname.com/employees/<employeeID> = Json with the information from that specific employee. 
    Add the remaining CRUD functionality to your medium problem.
    Make sure you return the proper HTTP status codes based on the outcome of the request. Be sure to implement error checking here.
    If an invalid request is made, we want to return some sort of error message and the correct HTTP status code for the situation.
    HTTP Status Codes: http://www.restapitutorial.com/httpstatuscodes.html
