const express = require('express')
const cors= require('cors')
const dotenv = require('dotenv')
const connection = require('./databaseConnection')
const userRoute = require('./routes/userRoute')
const complain=require('./routes/ComplainRoutes')
const location = require('./routes/locationsRoutes')
var bodyParser = require('body-parser');
const servicetypes = require('./routes/serviceTypesRoutes')
const problemTypes = require('./routes/problemTypesRoutes')
const complaintLog = require('./routes/complaintLogs')



dotenv.config()
const app = express()


app.use(express.json())
 app.use(cors())
// app.use(bodyParser.json());

app.use('/api/user',userRoute)

app.use("/api/complain",complain)

app.use("/api/location",location)

app.use('/api/serviceType',servicetypes)

app.use("/api/problemType",problemTypes)

app.use('/api/complaintLogs',complaintLog)

connection()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORt}`);
})