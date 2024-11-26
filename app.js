const express = require('express')
const app = express();

//this is import method of the module
const userRouter = require('./routes/user.routes.js')

// this is used for connect the env file to our whole application
const dotenv = require('dotenv')
dotenv.config();

//using of cookies
const cookieParser = require('cookie-parser')

const connectToDB = require('./config/db.js')
connectToDB();

// requireed the index related routes after that we need to use it by app.use
 const indexRouter = require('./routes/index.routes.js')

// set the ejs- it is used to render the html,js and css files
app.set('view engine', 'ejs')
app.use(cookieParser())

// these two lines below used for getting data by post method
app.use(express.json());
app.use(express.urlencoded({extended: true}))


// way of using the our exported routes from the file
app.use('/user', userRouter)
app.use('/',indexRouter) 
{/* after that if we want to hit any coustume routes thats we creates in our file routes will become
    [/user/test]
    */}






app.listen(3000, () => {
    console.log('server is running on port 3000');
    
})