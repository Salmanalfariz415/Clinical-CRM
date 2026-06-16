const express=require('express');
const app=express();
const cors=quire('cors');

app.use(cors());
app.use(express.json());

app.use('/api/patient',require('./routes/patientRoutes'));
app.use('/api/auth',require('./routes/authRoutes'));

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})