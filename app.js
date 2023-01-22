const express = require('express')

const app = express()

const connectDb = require("./db/connect")
require("dotenv").config();

const notFound = require('./middleware/not-found')
const errorHandler = require("./middleware/error-handler")

const taskRoutes = require('./routes/task')

app.use(express.static("./public"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routes
app.use("/api/v1/tasks", taskRoutes)

//handles custom 404 response using middleware
app.use(notFound)
app.use(errorHandler)



const port = process.env.PORT || 3000;

//start db first before server
const startDb = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
          console.log("listening on port 3000");
        });
    } catch(error) {
        console.log(error)
    }
}

startDb()