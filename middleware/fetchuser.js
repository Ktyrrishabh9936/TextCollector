const jwt = require('jsonwebtoken');
const keysecure = process.env.JWTSTRING;
const JWTSTRING = "this$mineString";

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send("please Enter a valid token");
    }
    try{
    // const data = jwt.verify(token,JWTSTRING);
    jwt.verify(token, JWTSTRING, function(err,decoded) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Token verifified successfully");
            console.log(decoded);
            req.user = decoded.user;
        }
    });
    next();
    }
    catch(errors){
    res.status(404).send({"message":"please authenticate a valid token", "type" : errors.message});
    }
}

module.exports = fetchuser;