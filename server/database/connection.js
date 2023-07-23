const mongoose = require("mongoose");

const DB = 'mongodb+srv://birla:birla149@cluster0.ji6vpf2.mongodb.net/moneytracker?retryWrites=true&w=majority'

const conectionParams ={
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }

mongoose.connect(DB, conectionParams).then(() => {
    console.log('connect successfuly')
}).catch((e) => {
    console.log(e)
})
