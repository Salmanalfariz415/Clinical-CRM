const bcrypt =require("bcryptjs");
const jwt=require('jsonwebtoken');
async function createUser(req,res){ 
    try{
        const {username,email,password}=req.body;
        // first check if the user already exists

        const [r]=await db.execute("SELECT * FROM users WHERE name=? OR email=?",[username,email]);
        if(r.affectedRows>0){
            res.status(400).json({"message":"User already exists"});
        }

        const hashedpassword=await bcrypt.hash(password,10);//bcrypt hashing
        const [result]=await db.execute("INSERT INTO users (name,email,password_hash) VALUES (?,?,?)",[username,email,hashedpassword]);
        
        if(result.affectedRows==0){
            res.status(500).json({"message":"User was not created"});
        }
        res.status(201).json({"message":"User created successfully"});
    }
    catch(error){
        console.log("Error creating user",error);
        res.status(500).json({error:'Internal server error'});
    }
}
async function loginUser(req,res){
    try{
      const {username,password}=req.body;
      const [results]=await db.execute("SELECT * FROM users WHERE name=?",[username]);
      //* is used instead of (password_hash) so that every details including the id is gotten.Id is needed for jwt token.
      const isMatch=await bcrypt.compare(password,results[0].password_hash);
        //   if password doesnt match
      if(!isMatch){
        return res.status(401).json({
            message:"Invalid Credentials"
      })}
        //   signing a token
      const token=jwt.sign({id:results[0].id,email:results[0].email},process.env.JWT_SECRET);
      res.status(201).json({token:token,"message":"User logged in successfully"});
        
    }
    catch(error){
        console.log("Error logging in",error);
        res.status(500).json({error:'Internal server error'});
    }
}
module.exports={createUser,loginUser};