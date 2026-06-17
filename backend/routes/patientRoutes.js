const express = require('express');
const router=express.Router();
const patientController=require('../controllers/patientController');
const verify=require('../middleware/authMiddleware');

router.get('/',verify,patientController.getPatients);
router.post('/',verify,patientController.createPatient);
router.get('/:id',verify,patientController.getPatientById);
router.put('/:id',verify,patientController.updatePatient);
router.delete('/:id',verify,patientController.deletePatient);
// this is the patient route file which defines the routes for patient related operations and maps them to the corresponding controller functions.


module.exports=router;