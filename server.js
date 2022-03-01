const express=require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const PORT = 5000
const api = require('./routers/api')

const app = express();

app.use(bodyparser.json())
app.use(cors())
app.use('/api',api)
app.listen(PORT,()=>{
    console.log('this is port' + PORT)
})