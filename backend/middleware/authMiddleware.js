const jwt=require('jsonwebtoken');
async function verify(req,res){
        const authHeader=req.headers.authorization;        
        if(!authHeader){
            return res.status(401).json({
                messsage:"No token"
            })
        };
        const token=authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;//req didnt have req.user...only now req.user is created
        next();
    }
    catch(error){
        console.log("Error with verifying jwt token",error);
        res.staus(500).json({"error": "Jwt verification error"})
    }
}
module.exports={verify};