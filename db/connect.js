/** @format */

const mongoose = require("mongoose");


  
const connectDB = (url) => {
        return mongoose.connect(url, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        });
    }

//   //since it returns a promise we have to .then and add a call back to do something with the result and catch any error
//a more succint way is provided above
//   mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('connected to db')).catch(err => console.log(err))

module.exports = connectDB