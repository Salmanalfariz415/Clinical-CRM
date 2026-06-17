async function add(req,res){
    try{
        const {p_name,p_ph,d_name,date,status,notes}=req.body;
        const [result] =await db.execute('INSERT INTO Appointment VALUES (?,?,?,?,?,?',[p_name,p_ph,d_name,date,status,notes]);
        if(result.affectedRows==0){
            res.status(400).json({message:"Error in creating appointment"});
        }
        const newId=result.insertId;//used in res
        res.staus(201).json({message:"Created appointment successfully",id:newId});//this id is used later for updating
    }
    catch(error){
        console.log("Error in creating appointment",error);
        res.status(500).json({message:"Error in creating appointment",error:error});
    }
}
async function get(req,res){
    try{
        const name=req.body;
        const [result]=await db.execute("SELECT * FROM Appointment WHERE patient_name=?",[name]);
        if(result.affectedRows==0){
            res.status(400).json({message:"Error in getting appointment"})
        }
        res.status(201).json({message:"Successfully retrieved appointment"});
    }

    catch(error){
        console.log("Error in retrieving appointment",error);
        res.staus(500).json({message:"Error in getting appointment",error:error});
    }
}
async function update(req,res){
    try{
        const id=req.params.id;
        const {p_name,p_ph,d_name,date,status,notes}=req.body;
        const [result]=await db.execute(`UPDATE Appointments 
            SET patient_name=?,patient_phone=?,doctor_name=?,appointment_date=?,status=?
            notes=? WHERE id=?`,[p_name,p_ph,d_name,date,status,notes,id]);
        if(result.affectedRows==0){
            res.status(400).json({message:"Error in updating appointment"});
        }
        res.status(201).json({message:"Success in updating appintments"});
    }
    catch(error){
        console.log("Error in updating appointment",error);
        res,staus(500).json({message:"Error in updating appontment",error:error});
    }
}
module.exports={add,get,update}