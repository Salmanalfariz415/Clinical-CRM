const express=require('express');
const app=express();
const cors=quire('cors');
const verify=require('./middleware/authMiddlware');
const patientRoutes=require('./routes/patientRoutes')
const authRoutes=require('./routes/authRoutes');
const appointRoutes=require('./routes/appointRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/patient',verify,patientRoutes);
app.use('/api/appointements',verify,appointRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})