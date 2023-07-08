const connection = require('./db');
var cors = require('cors');
const express= require('express');
const PORT = process.env.PORT || 5000;
connection();

const app = express();
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send(" i am Rishabh");
})

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/Noteroute'));
// if(process.env.NODE_ENV == "production")
// {
//     app.use(express.static())
// }
app.listen(PORT,(req,res)=>{
    console.log("listening in port :",PORT);
})