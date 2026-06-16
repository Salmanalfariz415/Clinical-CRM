const express = require('express');
const router=express.Router();
const patientController=require('../controllers/patientController');

router.get('/',patientController.getPatients);
router.post('/',patientController.createPatient);
router.get('/:id',patientController.getPatientById);
router.put('/:id',patientController.updatePatient);
router.delete('/:id',patientController.deletePatient);
// this is the patient route file which defines the routes for patient related operations and maps them to the corresponding controller functions.


module.exports=router;