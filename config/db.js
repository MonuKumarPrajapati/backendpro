{/* Before connect to database we have install a package after that create a folder with the name of config and a file inside it with the name of db.js after that follwing steps is taken
   1st step -   require mongoose
   2nd step - make a function and inside it call mangoose.connect(')
   3rd step - we cannot pass the url directly to the mongoose.connect('') we create an env file for that
    */}
const mongoose = require('mongoose');

function connectToDB() {
    //this is used for connect the env file to db.js
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('connected to db');
        
    })
        
    }

// export the function 
module.exports = connectToDB;