const express=require('express');
const router=express.Router();
const appoint=require('../controllers/appointController');
const verify=require('../middleware/authMiddleware');

router.post('/',verify,appoint.add);
router.get('/',verify,appoint.get);
router.put('/:id',verify,appoint.update);

module.exports=router;