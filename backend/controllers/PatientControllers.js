async function getPatients(req,res){
    try{
        const [patients]=await db.excute("SELECT * FROM patients");
        res.json(patients);
    }
    catch(error){
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function createPatient(req,res    ){
    try{
        const {name, age, gender, address, phone} = req.body;
        const [result]=await db.execute("INSERT INTO patients (name, age, gender, address, phone) VALUES (?, ?, ?, ?, ?)", [name, age, gender, address, phone]);
        res.status(201).json({ id: result.insertId, ...req.body });
    }
    catch(error){
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function getPatientById(req,res){
    try{
        const id=req.params.id;
        const [patients]=await db.execute("SELECT * FROM patients WHERE id=?",[id]);
        if(patients.length===0){
            res.status(400).json({error:'Patient not found'});
        }
        else{
            res.json(patients[0]);
        }
    }
    catch(error){
        console.error('Error fetching patient by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function updatePatient(req,res){
    try{
        const id=req.params.id;
        const {name, age, gender, address, phone} = req.body;

        const [result]=await db.execute("UPDATE patients SET name=?, age=?, gender=?, address=?, phone=? WHERE id=?", [name, age, gender, address, phone, id]);
        if(result.affectedRows===0){
            res.status(404).json({error:'Patient not found'});
        }
        else{
            res.json({message:'Patient updated successfully'});
        }
    }
    catch(error){
        console.error('Error updating patient:', error);
        res.status(500).json({error: 'Internal server error' });
    }
}
async function deletePatient(req,res){
    try{
        const id=req.params.id;
        const [result]=db.execute("DELETE FROM patients WHERE id=?",[id]);
        if(result.affectedRows==0){
            res.status(400).json({error:'Patient not found'});
        }
        else{
            res.json({message:'Patient deleted successfully'});
        }
    }
    catch(error){
        console.error('Error deleting patient:', error);
        res.status(500).json({error: 'Internal server error' });
    }
}
module.exports={getPatients, createPatient, getPatientById, updatePatient, deletePatient};