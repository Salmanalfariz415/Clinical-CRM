const express = require('express');
const router=express.Router();
const patientController=require('../controllers/patientController');

router.get('/api/patient',patientController.getPatients);
router.post('/api/patient',patientController.createPatient);
router.get('/api/patient/:id',patientController.getPatientById);
router.put('/api/patient/:id',patientController.updatePatient);
router.delete('/api/patient/:id',patientController.deletePatient);
module.exports=router;