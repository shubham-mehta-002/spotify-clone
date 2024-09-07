const jwt = require('jsonwebtoken')


const getToken = async(newUser) =>{
    const token = jwt.sign({user:newUser},process.env.JWT_SECRET_KEY)
    console.log(token.data)
    return token
}

const cookieJWTAuth = (req, res, next) => {
    try {
        let {token} = req.body
        if(!token){ // means token is sent through GET request
           token = req.query.token
        }
        if(!token){
            return res.status(401).json({success:false , err: "Authentication failed , not JWT token found"})
        }
        const { user } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = { ...user };
        next();
    } catch (err) {
        console.log("Invalid token:", err.message);    
    }
};



module.exports= { getToken , cookieJWTAuth }