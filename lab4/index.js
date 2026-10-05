/*
Purpose:
Express framework with node.js
- Try, Get, Post, Delete methods
- use route instead of pure paths - like an API in your own software's backend
- Compare and contrast Get query vs params
*/

const express = require("express");
const app = express()

const SERVER_PORT = process.env.PORT || 3000;

// --------------- Middleware setup for each of our needs on the web server -----------------------
// serving static files
// the public folder is not usually accessible by default
// NOtice there is no real folder in our filesystem called static but this will be a path we can access in the URL
app.use("/static", express.static("public"))

// serving static JSON
app.use(express.json())

// serving traditional HTML body
// if we add the object parameter with property extended: True
// we can use the library qs instead of library querystring
app.use(express.urlencoded({extended: true}))

// -------------------------------------------------------------------

// http://localhost:3000/
app.get("/", (request, response) => {
    response.send("<h1>Welcome to the root path of the server</h1>")
})

// http://localhost:3000/hello
app.get("/hello", (request, response) => {
    response.status(200).send("<h2>Welcome to the path of /hello</h1>")
})

app.get("/college", (request, response) => {
    const college = {
        method: "GET",           // this is not built in, we created this property
        name: "Geroge Brown Polytechnic",
        location: "Toronto",
        established: 1967
    }
    response.json(college)           // we treat our backend as an API
})

app.get("/students/:name/:age/:city", (request, response) => {
    console.log(request.params)
    if(!request.params.name || !request.params.age || !request.params.city){
        return response.status(400).json({error: "Missing path parameter"})
    }
    const name = request.params.name;
    const age = request.params.age;
    const city = request.params.city

    response.json ({
        student_name: name,
        student_age: age,
        student_city: city
    })
})

app.post("/college", (request, response) => {
    const college = {
        method: "POST",           // this is not built in, we created this property
        name: "Geroge Brown Polytechnic",
        location: "Toronto",
        established: 1967
    }
    response.json(college)
})

app.put("/college", (request, response) => {
    const college = {
        method: "PUT",           // this is not built in, we created this property
        name: "Geroge Brown Polytechnic",
        location: "Toronto",
        established: 1967
    }
    response.json(college)
})

app.delete("/college", (request, response) => {
    const college = {
        method: "DELETE",           // this is not built in, we created this property
        name: "Geroge Brown Polytechnic",
        location: "Toronto",
        established: 1967
    }
    response.json(college)
})

app.listen(SERVER_PORT, () => {
    console.log("Server is running on http://localhost:"+ {SERVER_PORT})
})