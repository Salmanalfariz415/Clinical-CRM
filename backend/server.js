const express=require('express');
const app=express();
const cors=quire('cors');
const verify=require('./middleware/authMiddlware');
const patientRoutes=require('./routes/patientRoutes')
const authRoutes=require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/patient',verify,patientRoutes);
app.use('/api/auth',authRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})