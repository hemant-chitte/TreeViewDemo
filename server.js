const express =require('express');
const app  = express();
var cors = require('cors')

app.use(cors({
    origin: '*'
}));
// check API server is running 
app.get('/',(req,res)=>console.log('API running'));


app.use('/api/github', require('./routes/api/github'));
// if not deployed on environment then will take port 5000 by default
const PORT= process.env.PORT || 5000;

// server started to listen the port
app.listen(PORT,()=>console.log(`servet started on port ${PORT}`));