const express=require('express');
const app=express();
const cors=quire('cors');

app.use(cors());
app.use(express.json());

app.use('/patient',require('./routes/patientRoutes'));

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})